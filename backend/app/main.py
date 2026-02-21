"""
FastAPI Main Application
Entry point with routes for transaction analysis and results.
"""
import os
import uuid
import json
import time
from datetime import datetime
from io import StringIO
import csv
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import networkx as nx

# Load environment variables from .env file
load_dotenv(Path(__file__).parent.parent / '.env')

from app.schemas.transaction import Transaction, TransactionRequest
from app.schemas.results import (
    AnalysisResults, Ring, SmurfingAlert, ShellAccountAlert, 
    AccountSuspicionScore, RiskLevel, ErrorResponse,
    DownloadableReport, DownloadableSuspiciousAccount, 
    DownloadableFraudRing, DownloadableSummary
)
from app.engine.graph_builder import GraphBuilder
from app.engine.cycle_detector_v2 import CycleDetectorV2 as CycleDetectorV2
from app.engine.cycle_detector_tarjan import CycleDetectorTarjan
from app.engine.cycle_detector_johnson import CycleDetectorJohnson
from app.engine.cycle_detector_hybrid import CycleDetectorHybrid
from app.engine.cycle_detector_hybrid_optimized import CycleDetectorHybridOptimized
from app.engine.smurf_detector_v2 import SmurfingDetectorV2 as SmurfingDetector
from app.engine.shell_detector_v2 import ShellAccountDetectorV2 as ShellAccountDetector
from app.utils.scoring import SuspicionScorer
from app.services.llm_service import get_llm_service

# Import authentication routes and database functions
from app.routes.auth import router as auth_router
from app.database import get_mongodb_client, close_mongodb_connection

# Choose cycle detection algorithm: 'hybrid_optimized' (BEST), 'hybrid', 'tarjan', 'johnson', or 'v2'
CYCLE_DETECTION_ALGO = 'hybrid_optimized'  # INDUSTRIAL-GRADE: Pruning + Giant Component + Tarjan + Johnson
EDGE_WEIGHT_THRESHOLD = 1.0  # Minimum transaction amount (prunes "dust")
CycleDetectorMap = {
    'hybrid_optimized': CycleDetectorHybridOptimized,
    'hybrid': CycleDetectorHybrid,
    'tarjan': CycleDetectorTarjan,
    'johnson': CycleDetectorJohnson,
    'v2': CycleDetectorV2
}

# Special handling for optimized version (needs threshold parameter)
if CYCLE_DETECTION_ALGO == 'hybrid_optimized':
    def CycleDetector(graph):
        return CycleDetectorHybridOptimized(graph, edge_weight_threshold=EDGE_WEIGHT_THRESHOLD)
else:
    CycleDetector = CycleDetectorMap[CYCLE_DETECTION_ALGO]

app = FastAPI(
    title="RIFT 2026 - Money Muling Detection Engine",
    version="1.0.0",
    description="Graph-based financial forensics for detecting money laundering patterns"
)

# CORS Configuration
# Read allowed origins from env (comma-separated); fall back to localhost defaults
_raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5174,http://localhost:5175,https://money-muling-six.vercel.app"
)
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,
)

# Include routers
app.include_router(auth_router)

# Global analysis cache
analysis_cache = {}


@app.on_event("startup")
async def startup_event():
    """Initialize database connection on startup"""
    print("[INFO] Starting RIFT 2026 Backend...")
    # Initialize MongoDB connection
    client = get_mongodb_client()
    if client:
        print("[OK] MongoDB connection established")
    else:
        print("[WARN] MongoDB connection failed - running in limited mode")


@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    print("[INFO] Shutting down RIFT 2026 Backend...")
    close_mongodb_connection()


@app.get("/", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "RIFT Money Muling Detection Engine"}


@app.get("/api/", tags=["Health"])
async def health_check_api():
    """Health check endpoint (API alias for proxy/baseURL=/api setups)"""
    return {"status": "healthy", "service": "RIFT Money Muling Detection Engine"}


@app.get("/api/detector-config", tags=["Configuration"])
async def detector_config():
    """Get current cycle detection algorithm configuration"""
    return {
        "algorithm": CYCLE_DETECTION_ALGO,
        "strategy": "🚀 INDUSTRIAL-GRADE" if CYCLE_DETECTION_ALGO == 'hybrid_optimized' else CYCLE_DETECTION_ALGO.upper(),
        "configuration": {
            "edge_weight_threshold": EDGE_WEIGHT_THRESHOLD
        },
        "details": {
            "hybrid_optimized": {
                "name": "🚀 INDUSTRIAL-GRADE: Optimized Hybrid (Edge Pruning + Giant Component + Tarjan + Johnson)",
                "complexity": "O(V² + E) with intelligent graph decomposition",
                "mode": "Five-stage fraud detection pipeline",
                "optimizations": [
                    "Edge weight pruning - removes 'dust' transactions below threshold",
                    "Giant component detection - separates legitimate networks from fraud islands",
                    "Isolation scoring - fraud rings identified and prioritized",
                    "Multi-stage filtering - accurate fraud vs legitimate classification",
                    "Automated fraud risk assessment"
                ],
                "steps": [
                    "Step 1: Prune edges below $" + str(EDGE_WEIGHT_THRESHOLD) + " (removes noise)",
                    "Step 2: Detect giant component (legitimate core network)",
                    "Step 3: Identify isolated components (potential fraud rings)",
                    "Step 4: Tarjan decomposes each component into SCCs",
                    "Step 5: Johnson exhaustively finds all cycles",
                    "Step 6: Isolation scoring prioritizes fraud rings",
                    "Step 7: Score and rank by strength + isolation"
                ],
                "advantages": [
                    "🏆 BEST for real-world fraud detection",
                    "Distinguishes FRAUD rings (isolated) from LEGITIMATE rings (connected)",
                    "Removes noise/dust transactions (industrial-grade data cleaning)",
                    "Guaranteed to find ALL cycles within length constraints",
                    "Scales efficiently for large networks (10,000+ transactions)",
                    "Fraud rings get priority scoring (1.5x multiplier)",
                    "Automatic fraud risk level assessment",
                    "Shows network isolation ratio and component stats"
                ],
                "fraud_indicators": [
                    "Cycles in isolated components = HIGH FRAUD RISK",
                    "Cycles connected to giant component = LOWER FRAUD RISK",
                    "Multiple small disconnected rings = FRAUD PATTERN",
                    "Uniform transaction amounts = STRUCTURING (red flag)"
                ],
                "best_for": "🏆 Production fraud detection - identifies actual criminals vs legitimate businesses"
            },
            "hybrid": {
                "name": "🏆 Hybrid: Tarjan + Johnson (WINNER'S STRATEGY)",
                "complexity": "O(V² + E) with SCC decomposition",
                "mode": "Two-stage: SCC decomposition + exhaustive cycle finding",
                "advantages": [
                    "Guaranteed to find ALL cycles",
                    "Scales for large graphs",
                    "No fraud/legitimate distinction"
                ],
                "best_for": "General cycle detection (without fraud classification)"
            },
            "tarjan": {
                "name": "Tarjan's SCC Algorithm",
                "complexity": "O(V + E)",
                "best_for": "Fast component analysis"
            },
            "johnson": {
                "name": "Johnson's Algorithm",
                "complexity": "O(V² * E) worst case",
                "best_for": "Exhaustive small-graph analysis"
            },
            "v2": {
                "name": "DFS with Memoization",
                "complexity": "O(V^2 * E) worst case",
                "best_for": "Quick analysis of small datasets"
            }
        },
        "message": f"Currently using '{CYCLE_DETECTION_ALGO.upper()}' algorithm with edge threshold ${EDGE_WEIGHT_THRESHOLD}",
        "recommendation": "🚀 Using INDUSTRIAL-GRADE optimized detector (currently active)" if CYCLE_DETECTION_ALGO == 'hybrid_optimized' else "⚠️ Consider upgrading to 'hybrid_optimized' for better fraud detection"
    }


@app.post("/api/analyze", response_model=AnalysisResults, tags=["Analysis"])
async def analyze_transactions(request: TransactionRequest) -> AnalysisResults:
    """
    Analyze transactions for money muling patterns.
    
    Returns detailed report with:
    - Detected cycles/rings
    - Smurfing alerts
    - Shell accounts
    - Suspicion scores for each account
    """
    try:
        if not request.transactions:
            raise HTTPException(status_code=400, detail="No transactions provided")
        
        # Generate analysis ID
        analysis_id = str(uuid.uuid4())
        
        # Build graph
        graph_builder = GraphBuilder()
        graph = graph_builder.build_graph(request.transactions)
        
        # Detect cycles
        cycle_detector = CycleDetector(graph)
        all_cycles = cycle_detector.find_all_cycles(max_length=5, min_length=3)
        
        # Create Ring objects
        rings = []
        for idx, cycle in enumerate(all_cycles):
            # Extract classification if detector returned it as dict
            classification = "LEGITIMATE"  # Default
            isolation_score = 0.0  # Default
            cycle_accounts = cycle  # Default to the cycle itself
            
            if isinstance(cycle, dict) and 'risk_level' in cycle:
                classification = cycle.get('risk_level', 'LEGITIMATE')
                isolation_score = cycle.get('isolation_score', 0.0)
                cycle_accounts = cycle.get('cycle', [])  # Extract the actual account list
            
            # Get metrics for the actual cycle accounts
            metrics = cycle_detector.get_cycle_metrics(cycle_accounts)
            
            ring = Ring(
                ring_id=f"RING_{analysis_id[:8]}_{idx}",
                accounts=metrics["accounts"],
                length=metrics["length"],
                total_amount=metrics["total_amount"],
                detection_type="cycle",
                transactions=metrics["transaction_ids"],
                classification=classification,
                isolation_score=isolation_score
            )
            rings.append(ring)
        
        # Detect smurfing
        smurf_detector = SmurfingDetector(request.transactions)
        smurfing_accounts = smurf_detector.detect_smurfing_accounts(min_transactions=10)
        
        smurfing_alerts = []
        for account_data in smurfing_accounts:
            alert = SmurfingAlert(
                account_id=account_data["account_id"],
                transaction_count=account_data["transaction_count"],
                time_window_hours=72,
                total_amount=account_data["total_amount"],
                fan_in=account_data["fan_in"],
                fan_out=account_data["fan_out"],
                risk_score=0.0  # Will be updated by scorer
            )
            smurfing_alerts.append(alert)
        
        # Detect shell accounts
        shell_detector = ShellAccountDetector(request.transactions)
        shell_accounts = shell_detector.detect_shell_accounts(max_transactions=5, min_total_value=50000)
        
        shell_alerts = []
        for account_data in shell_accounts:
            alert = ShellAccountAlert(
                account_id=account_data["account_id"],
                total_transactions=account_data["total_transactions"],
                total_throughput=account_data["total_throughput"],
                avg_transaction_value=account_data["avg_transaction_value"],
                risk_score=0.0,  # Will be updated by scorer
                description=f"Shell account with {account_data['total_transactions']} transactions totaling ${account_data['total_throughput']:,.2f}"
            )
            shell_alerts.append(alert)
        
        # Calculate suspicion scores for all accounts
        scorer = SuspicionScorer()
        all_accounts = graph_builder.get_all_accounts()
        
        account_scores = []
        high_risk = []
        critical_risk = []
        
        # Get cycle participation
        cycle_participation = cycle_detector.get_cycle_participation()
        
        # Get fraud rings for risk boosting
        fraud_ring_accounts = set()
        if hasattr(cycle_detector, 'fraud_rings'):
            for fraud_ring in cycle_detector.fraud_rings:
                fraud_ring_accounts.update(fraud_ring)
        
        for account_id in all_accounts:
            # Calculate ring involvement score
            ring_count = cycle_participation.get(account_id, 0)
            ring_amounts = []
            for cycle in all_cycles:
                if account_id in cycle:
                    metrics = cycle_detector.get_cycle_metrics(cycle)
                    ring_amounts.append(metrics["total_amount"])
            
            ring_score = scorer.score_ring_participation(
                account_id, ring_count, len(all_cycles), ring_amounts
            ) if all_cycles else 0.0
            
            # Calculate smurfing score
            account_smurfing = [s for s in smurfing_accounts if s["account_id"] == account_id]
            smurfing_score = 0.0
            if account_smurfing:
                data = account_smurfing[0]
                smurfing_score = scorer.score_smurfing_behavior(
                    data["transaction_count"],
                    data["fan_in"],
                    data["fan_out"],
                    data["total_amount"]
                )
            
            # Calculate shell account score
            account_shell = [s for s in shell_accounts if s["account_id"] == account_id]
            shell_score = 0.0
            if account_shell:
                data = account_shell[0]
                shell_score = scorer.score_shell_account(
                    data["total_transactions"],
                    data["total_throughput"],
                    data["avg_transaction_value"],
                    data["unique_sources"],
                    data["unique_destinations"]
                )
            
            # Calculate flow pattern score
            stats = graph_builder.get_account_stats(account_id)
            pattern_score = scorer.score_flow_pattern(
                account_id,
                stats.get("total_in", 0),
                stats.get("total_out", 0),
                stats.get("txn_count", 0),
                stats.get("in_degree", 0),
                stats.get("out_degree", 0)
            )
            
            # Check if account is in fraud ring
            is_in_fraud_ring = account_id in fraud_ring_accounts
            
            # Get final score
            score_result = scorer.calculate_account_score(
                account_id,
                ring_involvement=ring_score,
                smurfing_score=smurfing_score,
                shell_score=shell_score,
                pattern_score=pattern_score,
                is_fraud_ring=is_in_fraud_ring
            )
            
            account_score = AccountSuspicionScore(
                account_id=account_id,
                base_score=score_result["base_score"],
                ring_involvement_score=score_result["ring_involvement_score"],
                smurfing_score=score_result["smurfing_score"],
                shell_score=score_result["shell_score"],
                final_score=score_result["final_score"],
                risk_level=RiskLevel(score_result["risk_level"]),
                risk_factors=score_result["risk_factors"]
            )
            account_scores.append(account_score)
            
            # Categorize risk levels
            if account_score.risk_level == RiskLevel.CRITICAL:
                critical_risk.append(account_id)
            elif account_score.risk_level == RiskLevel.HIGH:
                high_risk.append(account_id)
        
        # Update smurfing alert scores
        for alert in smurfing_alerts:
            account_score = next((s for s in account_scores if s.account_id == alert.account_id), None)
            if account_score:
                alert.risk_score = account_score.smurfing_score
        
        # Update shell alert scores
        for alert in shell_alerts:
            account_score = next((s for s in account_scores if s.account_id == alert.account_id), None)
            if account_score:
                alert.risk_score = account_score.shell_score
        
        # Calculate additional statistics
        transaction_amounts = [t.amount for t in request.transactions]
        total_volume = sum(transaction_amounts)
        avg_transaction = total_volume / len(transaction_amounts) if transaction_amounts else 0
        sorted_amounts = sorted(transaction_amounts)
        median_transaction = sorted_amounts[len(sorted_amounts) // 2] if sorted_amounts else 0
        
        suspicious_accounts = len(high_risk) + len(critical_risk)
        suspicious_percent = (suspicious_accounts / len(all_accounts) * 100) if all_accounts else 0
        
        accounts_with_rings = set()
        for cycle in all_cycles:
            accounts_with_rings.update(cycle)
        
        # Create summary
        summary = {
            "total_accounts": len(all_accounts),
            "total_transactions": len(request.transactions),
            "total_volume": float(total_volume),
            "avg_transaction": float(avg_transaction),
            "median_transaction": float(median_transaction),
            "min_transaction": float(min(transaction_amounts)) if transaction_amounts else 0,
            "max_transaction": float(max(transaction_amounts)) if transaction_amounts else 0,
            "cycles_detected": len(all_cycles),
            "avg_cycle_length": sum(len(c) for c in all_cycles) / len(all_cycles) if all_cycles else 0,
            "accounts_in_rings": len(accounts_with_rings),
            "smurfing_alerts_count": len(smurfing_alerts),
            "shell_accounts_count": len(shell_alerts),
            "high_risk_accounts": len(high_risk),
            "critical_accounts": len(critical_risk),
            "suspicious_accounts": suspicious_accounts,
            "suspicious_percent": float(suspicious_percent),
            "analysis_timestamp": datetime.utcnow().isoformat()
        }
        
        # Create analysis result
        results = AnalysisResults(
            analysis_id=analysis_id,
            total_accounts=len(all_accounts),
            total_transactions=len(request.transactions),
            rings_detected=rings,
            smurfing_alerts=smurfing_alerts,
            shell_accounts=shell_alerts,
            account_scores=account_scores,
            high_risk_accounts=high_risk,
            critical_accounts=critical_risk,
            summary=summary
        )
        
        # Cache results
        analysis_cache[analysis_id] = results
        
        return results
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Validation error: {str(ve)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")


@app.post("/api/upload-csv", response_model=AnalysisResults, tags=["Analysis"])
async def upload_csv(file: UploadFile = File(...)) -> AnalysisResults:
    """
    Upload CSV file with transactions and analyze.
    
    CSV format should have columns:
    - transaction_id: Transaction ID
    - sender_id: Source account
    - receiver_id: Destination account
    - amount: Transaction amount
    - timestamp: ISO format datetime
    """
    try:
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="File must be CSV format")
        
        # Read CSV
        contents = await file.read()
        csv_data = contents.decode('utf-8')
        
        # Parse CSV
        csv_file = StringIO(csv_data)
        reader = csv.DictReader(csv_file)
        
        transactions = []
        for row in reader:
            try:
                # Parse timestamp - handle multiple formats
                timestamp_str = row['timestamp'].replace('Z', '+00:00')
                try:
                    # Try ISO format first
                    timestamp = datetime.fromisoformat(timestamp_str)
                except ValueError:
                    # Handle format like "2024-01-21 3:01:00" (single digit hours)
                    try:
                        timestamp = datetime.strptime(row['timestamp'], '%Y-%m-%d %H:%M:%S')
                    except ValueError:
                        # Try with T separator
                        timestamp = datetime.strptime(row['timestamp'], '%Y-%m-%dT%H:%M:%S')
                
                transaction = Transaction(
                    transaction_id=row.get('transaction_id', ''),
                    sender_id=row['sender_id'],
                    receiver_id=row['receiver_id'],
                    amount=float(row['amount']),
                    timestamp=timestamp
                )
                transactions.append(transaction)
            except (ValueError, KeyError) as e:
                print(f"Error parsing row {row}: {e}")
                continue
        
        if not transactions:
            raise HTTPException(status_code=400, detail="No valid transactions found in CSV")
        
        # Analyze
        request = TransactionRequest(transactions=transactions)
        return await analyze_transactions(request)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"CSV upload error: {str(e)}")


@app.get("/api/analysis/{analysis_id}", response_model=AnalysisResults, tags=["Analysis"])
async def get_analysis(analysis_id: str) -> AnalysisResults:
    """Retrieve cached analysis results"""
    if analysis_id not in analysis_cache:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return analysis_cache[analysis_id]


@app.get("/api/accounts/{account_id}", tags=["Account Details"])
async def get_account_details(account_id: str):
    """Get details for a specific account from all cached analyses"""
    account_results = []
    
    for analysis_id, results in analysis_cache.items():
        for score in results.account_scores:
            if score.account_id == account_id:
                # Find related rings, alerts
                related_rings = [r for r in results.rings_detected if account_id in r.accounts]
                related_smurfing = [s for s in results.smurfing_alerts if s.account_id == account_id]
                related_shells = [s for s in results.shell_accounts if s.account_id == account_id]
                
                account_results.append({
                    "analysis_id": analysis_id,
                    "account_score": score,
                    "rings": related_rings,
                    "smurfing_alerts": related_smurfing,
                    "shell_alerts": related_shells
                })
    
    if not account_results:
        raise HTTPException(status_code=404, detail="Account not found")
    
    return account_results


@app.get("/api/stats", tags=["Statistics"])
async def get_statistics():
    """Get overall statistics from all analyses"""
    if not analysis_cache:
        return {
            "total_analyses": 0,
            "total_accounts_analyzed": 0,
            "total_transactions": 0,
            "total_cycles": 0,
            "high_risk_accounts": 0
        }
    
    total_accounts = set()
    total_transactions = 0
    total_cycles = 0
    total_high_risk = set()
    
    for results in analysis_cache.values():
        total_accounts.update(results.account_scores)
        total_transactions += results.total_transactions
        total_cycles += len(results.rings_detected)
        total_high_risk.update(results.high_risk_accounts)
    
    return {
        "total_analyses": len(analysis_cache),
        "total_accounts_analyzed": len(total_accounts),
        "total_transactions": total_transactions,
        "total_cycles": total_cycles,
        "high_risk_accounts": len(total_high_risk)
    }


# ============ LLM-POWERED ENDPOINTS ============

@app.get("/api/account-narrative/{account_id}", tags=["LLM Analysis"])
async def get_account_narrative(account_id: str):
    """
    Generate AI-powered narrative explaining an account's risk profile.
    Uses LLM to create natural language summaries.
    """
    # Find account in cache
    account_data = None
    for analysis_id, results in analysis_cache.items():
        for score in results.account_scores:
            if score.account_id == account_id:
                account_data = score
                break
        if account_data:
            break
    
    if not account_data:
        raise HTTPException(status_code=404, detail=f"Account {account_id} not found")
    
    # Get comprehensive risk profile
    for analysis in analysis_cache.values():
        for account_score in analysis.account_scores:
            if account_score.account_id == account_id:
                risk_profile = {
                    'total_transactions': account_score.final_score,
                    'total_throughput': 0,
                    'avg_transaction_value': 0,
                    'shell_score': account_score.shell_score,
                    'pass_through_score': 0,
                    'connection_score': 0,
                    'dormancy_score': 0,
                    'directionality_score': 0,
                    'unique_sources': 0,
                    'unique_destinations': 0,
                    'in_out_ratio': 0,
                }
                break
    
    llm_service = get_llm_service()
    narrative = llm_service.generate_account_narrative(account_id, risk_profile)
    
    return {
        "account_id": account_id,
        "narrative": narrative,
        "risk_level": account_data.risk_level,
        "risk_score": account_data.final_score
    }


@app.get("/api/cycle-analysis/{analysis_id}/{ring_index}", tags=["LLM Analysis"])
async def get_cycle_analysis(analysis_id: str, ring_index: int):
    """
    Generate AI-powered analysis of a detected cycle.
    """
    if analysis_id not in analysis_cache:
        raise HTTPException(status_code=404, detail=f"Analysis {analysis_id} not found")
    
    results = analysis_cache[analysis_id]
    
    if ring_index >= len(results.rings_detected):
        raise HTTPException(status_code=404, detail=f"Ring {ring_index} not found")
    
    ring = results.rings_detected[ring_index]
    metrics = {
        'total_amount': ring.total_amount,
        'num_transactions': len(ring.transactions),
        'avg_transaction': ring.total_amount / len(ring.transactions) if ring.transactions else 0
    }
    
    llm_service = get_llm_service()
    analysis_text = llm_service.generate_cycle_analysis(ring.accounts, metrics)
    
    return {
        "ring_id": ring.ring_id,
        "ring_details": {
            "length": len(ring.accounts),
            "total_amount": ring.total_amount,
            "type": ring.detection_type
        },
        "participants": ring.accounts,
        "ai_analysis": analysis_text,
        "transaction_count": len(ring.transactions)
    }


@app.get("/api/investigation-summary/{analysis_id}", tags=["LLM Analysis"])
async def get_investigation_summary(analysis_id: str):
    """
    Generate executive summary for investigation using AI analysis.
    """
    if analysis_id not in analysis_cache:
        raise HTTPException(status_code=404, detail=f"Analysis {analysis_id} not found")
    
    results = analysis_cache[analysis_id]
    
    # Convert results to dict for LLM
    analysis_dict = {
        'total_accounts': results.total_accounts,
        'total_transactions': results.total_transactions,
        'summary': {
            'total_volume': results.summary.get('total_volume', 0)
        },
        'rings_detected': results.rings_detected,
        'smurfing_alerts': results.smurfing_alerts,
        'shell_accounts': results.shell_accounts,
        'critical_accounts': results.critical_accounts,
        'high_risk_accounts': results.high_risk_accounts
    }
    
    llm_service = get_llm_service()
    summary_text = llm_service.generate_investigation_summary(analysis_dict)
    
    # Extract structured data
    top_suspects = results.critical_accounts[:5] if results.critical_accounts else []
    key_findings = [
        f"{len(results.rings_detected)} money laundering rings detected",
        f"{len(results.smurfing_alerts)} smurfing alerts flagged",
        f"{len(results.shell_accounts)} shell accounts identified",
        f"Total transactional volume: ${results.summary.get('total_volume', 0):,.2f}"
    ]
    
    return {
        "overview": summary_text,
        "top_suspects": top_suspects,
        "key_findings": key_findings,
        "generated_at": datetime.utcnow().isoformat()
    }


@app.get("/api/recommendations/{account_id}", tags=["LLM Analysis"])
async def get_investigation_recommendations(account_id: str):
    """
    Generate AI-powered investigation recommendations for an account.
    """
    account_data = None
    for analysis in analysis_cache.values():
        for score in analysis.account_scores:
            if score.account_id == account_id:
                account_data = score
                break
        if account_data:
            break
    
    if not account_data:
        raise HTTPException(status_code=404, detail=f"Account {account_id} not found")
    
    llm_service = get_llm_service()
    recommendations_text = llm_service.generate_risk_recommendations(
        account_id,
        account_data.risk_factors
    )
    
    # Parse into structured steps
    steps = [
        {
            "title": "Review Account Transactions",
            "priority": "HIGH",
            "description": "Examine all transactions for patterns and anomalies"
        },
        {
            "title": "Identify Connected Accounts",
            "priority": "HIGH", 
            "description": "Map all inbound and outbound account connections"
        },
        {
            "title": "Analyze Transaction Velocity",
            "priority": "HIGH",
            "description": "Check for high-frequency or time-clustered transactions"
        },
        {
            "title": "Verify Account Documentation",
            "priority": "MEDIUM",
            "description": "Review KYC and AML documentation for completeness"
        },
        {
            "title": "Escalate to Compliance",
            "priority": "MEDIUM",
            "description": "File SAR or refer to regulatory authority if warranted"
        }
    ]
    
    return {
        "account_id": account_id,
        "steps": steps,
        "risk_score": account_data.final_score,
        "risk_level": account_data.risk_level,
        "generated_at": datetime.utcnow().isoformat()
    }


@app.get("/api/llm-status", tags=["LLM Analysis"])
async def get_llm_status():
    """Check LLM service status and configuration"""
    llm_service = get_llm_service()
    
    return {
        "llm_enabled": llm_service.enabled,
        "provider": llm_service.provider,
        "model": llm_service.model,
        "message": "LLM features enabled. Use other endpoints for narratives and recommendations." if llm_service.enabled else "LLM features disabled. Set LLM_API_KEY environment variable to enable."
    }


# ==================== Download & Export Endpoints ====================

@app.get("/api/download-report/{analysis_id}", response_model=DownloadableReport, tags=["Export"])
async def download_analysis_report(analysis_id: str):
    """
    Download analysis report in standardized JSON format.
    
    Returns JSON with the following structure:
    {
      "suspicious_accounts": [
        {
          "account_id": "ACC_00123",
          "suspicion_score": 87.5,
          "detected_patterns": ["cycle_length_3", "high_velocity"],
          "ring_id": "RING_001"
        }
      ],
      "fraud_rings": [
        {
          "ring_id": "RING_001",
          "member_accounts": ["ACC_00123", "ACC_00124"],
          "pattern_type": "cycle",
          "risk_score": 95.3
        }
      ],
      "summary": {
        "total_accounts_analyzed": 500,
        "suspicious_accounts_flagged": 15,
        "fraud_rings_detected": 4,
        "processing_time_seconds": 2.3
      }
    }
    """
    try:
        # Retrieve cached analysis
        if analysis_id not in analysis_cache:
            raise HTTPException(status_code=404, detail=f"Analysis {analysis_id} not found")
        
        analysis = analysis_cache[analysis_id]
        
        # Build suspicious accounts list with detected patterns
        suspicious_accounts = []
        
        for account_score in analysis.account_scores:
            # Only include HIGH and CRITICAL risk accounts
            if account_score.risk_level in [RiskLevel.HIGH, RiskLevel.CRITICAL]:
                # Find associated ring if any
                associated_ring_id = ""
                for ring in analysis.rings_detected:
                    if account_score.account_id in ring.accounts:
                        associated_ring_id = ring.ring_id
                        break
                
                # Build detected patterns from risk factors
                detected_patterns = account_score.risk_factors
                
                suspicious_account = DownloadableSuspiciousAccount(
                    account_id=account_score.account_id,
                    suspicion_score=round(account_score.final_score, 2),
                    detected_patterns=detected_patterns,
                    ring_id=associated_ring_id
                )
                suspicious_accounts.append(suspicious_account)
        
        # Sort by suspicion score descending
        suspicious_accounts.sort(key=lambda x: x.suspicion_score, reverse=True)
        
        # Build fraud rings list
        fraud_rings = []
        
        for ring in analysis.rings_detected:
            # Only include rings classified as FRAUD
            if ring.classification == "FRAUD":
                fraud_ring = DownloadableFraudRing(
                    ring_id=ring.ring_id,
                    member_accounts=ring.accounts,
                    pattern_type=ring.detection_type,
                    risk_score=round(ring.isolation_score * 100, 2)  # Convert isolation score to 0-100
                )
                fraud_rings.append(fraud_ring)
        
        # Sort by risk score descending
        fraud_rings.sort(key=lambda x: x.risk_score, reverse=True)
        
        # Build summary
        summary = DownloadableSummary(
            total_accounts_analyzed=analysis.total_accounts,
            suspicious_accounts_flagged=len(suspicious_accounts),
            fraud_rings_detected=len(fraud_rings),
            processing_time_seconds=round(
                (datetime.fromisoformat(analysis.summary.get("analysis_timestamp", datetime.utcnow().isoformat())) 
                 - datetime.utcnow()).total_seconds() * -1, 2
            )
        )
        
        # Create downloadable report
        report = DownloadableReport(
            suspicious_accounts=suspicious_accounts,
            fraud_rings=fraud_rings,
            summary=summary
        )
        
        return report
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")


@app.get("/api/download-report-json/{analysis_id}", tags=["Export"])
async def download_analysis_report_json(analysis_id: str):
    """
    Download analysis report as raw JSON file with proper content-disposition header.
    """
    try:
        # Retrieve cached analysis
        if analysis_id not in analysis_cache:
            raise HTTPException(status_code=404, detail=f"Analysis {analysis_id} not found")
        
        analysis = analysis_cache[analysis_id]
        
        # Build suspicious accounts list
        suspicious_accounts = []
        
        for account_score in analysis.account_scores:
            if account_score.risk_level in [RiskLevel.HIGH, RiskLevel.CRITICAL]:
                associated_ring_id = ""
                for ring in analysis.rings_detected:
                    if account_score.account_id in ring.accounts:
                        associated_ring_id = ring.ring_id
                        break
                
                suspicious_account = {
                    "account_id": account_score.account_id,
                    "suspicion_score": round(account_score.final_score, 2),
                    "detected_patterns": account_score.risk_factors,
                    "ring_id": associated_ring_id
                }
                suspicious_accounts.append(suspicious_account)
        
        suspicious_accounts.sort(key=lambda x: x["suspicion_score"], reverse=True)
        
        # Build fraud rings list
        fraud_rings = []
        
        for ring in analysis.rings_detected:
            if ring.classification == "FRAUD":
                fraud_ring = {
                    "ring_id": ring.ring_id,
                    "member_accounts": ring.accounts,
                    "pattern_type": ring.detection_type,
                    "risk_score": round(ring.isolation_score * 100, 2)
                }
                fraud_rings.append(fraud_ring)
        
        fraud_rings.sort(key=lambda x: x["risk_score"], reverse=True)
        
        # Build complete report JSON
        report_json = {
            "suspicious_accounts": suspicious_accounts,
            "fraud_rings": fraud_rings,
            "summary": {
                "total_accounts_analyzed": analysis.total_accounts,
                "suspicious_accounts_flagged": len(suspicious_accounts),
                "fraud_rings_detected": len(fraud_rings),
                "processing_time_seconds": round(
                    (datetime.fromisoformat(analysis.summary.get("analysis_timestamp", datetime.utcnow().isoformat())) 
                     - datetime.utcnow()).total_seconds() * -1, 2
                )
            }
        }
        
        # Return as JSON response with download header
        return JSONResponse(
            content=report_json,
            headers={"Content-Disposition": f"attachment; filename=rift_analysis_{analysis_id[:8]}.json"}
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating JSON: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    # port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=8000)
