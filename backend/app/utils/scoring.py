"""
Scoring Module
Calculates suspicion scores (0-100) for accounts based on multiple risk factors.
"""
from typing import List, Dict, Set
from app.schemas.results import RiskLevel


class SuspicionScorer:
    """Calculate weighted suspicion scores"""

    def __init__(self):
        # Weight configuration for different risk factors
        # Increased ring_involvement weight - very important for fraud detection!
        self.weights = {
            "ring_involvement": 0.50,  # INCREASED: Cycles are strongest fraud signal
            "smurfing": 0.20,
            "shell_account": 0.15,
            "transaction_patterns": 0.15
        }

    def calculate_account_score(self, account_id: str,
                               ring_involvement: float = 0,
                               smurfing_score: float = 0,
                               shell_score: float = 0,
                               pattern_score: float = 0,
                               is_fraud_ring: bool = False) -> Dict:
        """
        Calculate composite suspicion score for an account.
        
        Each component is 0-100, weighted together for final score.
        """
        # Normalize components to 0-100 range
        scores = {
            "ring_involvement": max(0, min(100, ring_involvement)),
            "smurfing": max(0, min(100, smurfing_score)),
            "shell_account": max(0, min(100, shell_score)),
            "transaction_patterns": max(0, min(100, pattern_score))
        }
        
        # Calculate weighted final score
        final_score = sum(
            scores[key] * self.weights[key] 
            for key in scores
        )
        
        # Normalize to 0-100
        final_score = max(0, min(100, final_score))
        
        # HUGE BOOST for accounts in fraud rings (isolated components)
        # This ensures fraud ring members show up as HIGH or CRITICAL
        if is_fraud_ring and ring_involvement > 0:
            final_score = final_score * 2.0  # 2x multiplier for fraud ring members
            final_score = min(100, final_score)
        
        # Determine risk level
        risk_level = self._get_risk_level(final_score)
        
        # Identify risk factors
        risk_factors = self._identify_risk_factors(scores)
        
        return {
            "account_id": account_id,
            "base_score": final_score,
            "ring_involvement_score": scores["ring_involvement"],
            "smurfing_score": scores["smurfing"],
            "shell_score": scores["shell_account"],
            "final_score": final_score,
            "risk_level": risk_level,
            "risk_factors": risk_factors,
            "component_weights": self.weights
        }

    def _get_risk_level(self, score: float) -> RiskLevel:
        """Convert numerical score to risk level"""
        if score >= 80:
            return RiskLevel.CRITICAL
        elif score >= 60:
            return RiskLevel.HIGH
        elif score >= 40:
            return RiskLevel.MEDIUM
        else:
            return RiskLevel.LOW

    def _identify_risk_factors(self, scores: Dict) -> List[str]:
        """Identify which factors contribute to high score"""
        factors = []
        
        if scores["ring_involvement"] > 50:
            factors.append("Involved in financial cycles/rings")
        
        if scores["smurfing"] > 50:
            factors.append("Smurfing behavior detected (high-frequency transactions)")
        
        if scores["shell_account"] > 50:
            factors.append("Shell account characteristics (high value, few transactions)")
        
        if scores["transaction_patterns"] > 50:
            factors.append("Suspicious transaction patterns")
        
        return factors

    def score_ring_participation(self, account_id: str,
                                ring_count: int,
                                total_rings: int,
                                ring_amounts: List[float]) -> float:
        """
        Score for participation in cycles.
        Higher score if:
        - Involved in any rings (any = 50 base)
        - Involved in multiple rings (additional boost)
        - High value cycles
        """
        if ring_count == 0:
            return 0.0
        
        # BOOSTED: Being in any ring is already suspicious (50 base points)
        # Being in 2+ rings is very suspicious
        base_score = 50.0 + (ring_count * 15.0)  # 50 for being in ring, +15 per additional
        base_score = min(100, base_score)
        
        # Boost for high-value rings
        avg_ring_amount = sum(ring_amounts) / len(ring_amounts) if ring_amounts else 0
        amount_factor = min(2.0, 1.0 + (avg_ring_amount / 500000))  # More aggressive boost
        
        score = base_score * amount_factor
        return max(0, min(100, score))

    def score_smurfing_behavior(self, transaction_count: int,
                               fan_in: int,
                               fan_out: int,
                               total_amount: float,
                               time_window_hours: int = 72) -> float:
        """
        Score for smurfing behavior.
        Higher score for:
        - Any transaction activity (even 1 txn can be suspicious in short window)
        - Multiple sources/destinations
        - High total amount
        """
        if transaction_count == 0:
            return 0.0
        
        # BOOSTED: Even low transaction counts are suspicious now
        # 1 txn = 30, 5 txns = 50, 10+ = 100
        txn_score = min(100, 10 + (transaction_count * 8))
        
        # Fan-in/out diversity score (very important for smurfing)
        total_fan = fan_in + fan_out
        fan_score = min(100, total_fan * 5)
        
        # Amount score (higher amounts = higher suspicion)
        amount_score = min(100, (total_amount / 50000) * 50) if total_amount > 5000 else 0
        
        # Composite score - weighted heavily toward fan diversity and amount
        score = (txn_score * 0.3 + fan_score * 0.5 + amount_score * 0.2)
        return max(0, min(100, score))

    def score_shell_account(self, transaction_count: int,
                           total_value: float,
                           avg_transaction_value: float,
                           unique_sources: int,
                           unique_destinations: int) -> float:
        """
        Score for shell account characteristics.
        Higher for:
        - Very few transactions (even 1-2 = suspicious)
        - High per-transaction value
        - Low connection diversity
        """
        if transaction_count == 0:
            return 0.0
        
        # BOOSTED: Very low transaction count = more suspicious (1-2 txns = 50+)
        txn_score = max(0, 100 - (transaction_count * 5))  # Changed from *10
        
        # High per-transaction value score
        value_score = min(100, (avg_transaction_value / 50000) * 50) if avg_transaction_value > 5000 else 0
        
        # Low connectivity score
        total_connections = unique_sources + unique_destinations
        connectivity_score = max(0, 100 - (total_connections * 15))  # Changed from *20
        
        # Composite score
        score = (txn_score * 0.4 + value_score * 0.4 + connectivity_score * 0.2)  # Increased value weight
        return max(0, min(100, score))

    def score_flow_pattern(self, account_id: str,
                          in_amount: float,
                          out_amount: float,
                          total_txns: int,
                          unique_sources: int,
                          unique_destinations: int) -> float:
        """
        Score for suspicious flow patterns.
        High score for:
        - Pass-through patterns (similar in/out)
        - Unbalanced connections
        - Rapid consolidation
        """
        if total_txns == 0:
            return 0.0
        
        # Pass-through score
        if in_amount > 0 and out_amount > 0:
            ratio = min(in_amount, out_amount) / max(in_amount, out_amount)
            pass_through_score = (1.0 - ratio) * 100  # 0 if perfectly balanced
        else:
            pass_through_score = 0
        
        # Consolidation score (money flowing in, dispersing out)
        if unique_sources > unique_destinations and in_amount > out_amount:
            consolidation_score = 60
        elif unique_destinations > unique_sources and out_amount > in_amount:
            consolidation_score = 60
        else:
            consolidation_score = 0
        
        # Throughput without connectivity score
        avg_per_txn = (in_amount + out_amount) / total_txns
        connectivity = (unique_sources + unique_destinations) / max(total_txns, 1)
        throughput_efficiency = min(100, (avg_per_txn / 10000) * (1.0 / max(connectivity, 0.1)))
        
        score = (pass_through_score * 0.3 + consolidation_score * 0.3 + throughput_efficiency * 0.4)
        return max(0, min(100, score))

    def batch_score_accounts(self, accounts_data: List[Dict]) -> List[Dict]:
        """Score multiple accounts at once"""
        scores = []
        for account_data in accounts_data:
            score = self.calculate_account_score(
                account_id=account_data.get("account_id"),
                ring_involvement=account_data.get("ring_score", 0),
                smurfing_score=account_data.get("smurfing_score", 0),
                shell_score=account_data.get("shell_score", 0),
                pattern_score=account_data.get("pattern_score", 0)
            )
            scores.append(score)
        return scores
