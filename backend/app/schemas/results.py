from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum


class RiskLevel(str, Enum):
    """Risk level classification"""
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class Ring(BaseModel):
    """Schema for detected cycle/ring"""
    ring_id: str = Field(..., description="Unique ring identifier")
    accounts: List[str] = Field(..., description="Accounts in the ring (ordered path)")
    length: int = Field(..., description="Ring length")
    total_amount: float = Field(..., description="Total amount flowing in ring")
    detection_type: str = Field(..., description="Type of ring (e.g., 'cycle')")
    transactions: List[str] = Field(..., description="List of transaction IDs in ring")
    classification: str = Field(default="LEGITIMATE", description="Classification: FRAUD or LEGITIMATE")
    isolation_score: float = Field(default=0.0, ge=0, le=1, description="Isolation score 0-1 (higher = more isolated/fraudulent)")


class SmurfingAlert(BaseModel):
    """Schema for smurfing detection alert"""
    account_id: str = Field(..., description="Account ID showing smurfing behavior")
    transaction_count: int = Field(..., description="Number of transactions in 72h window")
    time_window_hours: int = Field(..., description="Time window in hours")
    total_amount: float = Field(..., description="Total amount in window")
    fan_in: int = Field(..., description="Number of unique inbound sources")
    fan_out: int = Field(..., description="Number of unique outbound destinations")
    risk_score: float = Field(..., ge=0, le=100, description="Risk score 0-100")


class ShellAccountAlert(BaseModel):
    """Schema for shell account detection"""
    account_id: str = Field(..., description="Account ID")
    total_transactions: int = Field(..., description="Total lifetime transactions")
    total_throughput: float = Field(..., description="Total value flowing through")
    avg_transaction_value: float = Field(..., description="Average transaction value")
    risk_score: float = Field(..., ge=0, le=100, description="Risk score 0-100")
    description: str = Field(..., description="Description of shell account behavior")


class AccountSuspicionScore(BaseModel):
    """Schema for per-account suspicion scoring"""
    account_id: str = Field(..., description="Account ID")
    base_score: float = Field(..., ge=0, le=100, description="Base suspicion score")
    ring_involvement_score: float = Field(..., ge=0, le=100, description="Score from ring involvement")
    smurfing_score: float = Field(..., ge=0, le=100, description="Score from smurfing behavior")
    shell_score: float = Field(..., ge=0, le=100, description="Score from shell characteristics")
    final_score: float = Field(..., ge=0, le=100, description="Final composite score")
    risk_level: RiskLevel = Field(..., description="Risk classification")
    risk_factors: List[str] = Field(..., description="List of risk factors detected")


class AnalysisResults(BaseModel):
    """Main response schema with all detection results"""
    analysis_id: str = Field(..., description="Unique analysis ID")
    total_accounts: int = Field(..., description="Total unique accounts analyzed")
    total_transactions: int = Field(..., description="Total transactions processed")
    rings_detected: List[Ring] = Field(default_factory=list, description="Detected rings/cycles")
    smurfing_alerts: List[SmurfingAlert] = Field(default_factory=list, description="Smurfing alerts")
    shell_accounts: List[ShellAccountAlert] = Field(default_factory=list, description="Shell accounts detected")
    account_scores: List[AccountSuspicionScore] = Field(..., description="Scores for all accounts")
    high_risk_accounts: List[str] = Field(default_factory=list, description="Accounts with high risk")
    critical_accounts: List[str] = Field(default_factory=list, description="Accounts with critical risk")
    summary: dict = Field(..., description="Summary statistics")


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str = Field(..., description="Error message")
    details: Optional[str] = Field(None, description="Additional error details")


# ==================== Downloadable JSON Output Schemas ====================

class DownloadableSuspiciousAccount(BaseModel):
    """Schema for suspicious account in downloadable format"""
    account_id: str = Field(..., description="Account identifier")
    suspicion_score: float = Field(..., ge=0, le=100, description="Suspicion score 0-100")
    detected_patterns: List[str] = Field(..., description="List of detected pattern types")
    ring_id: str = Field(..., description="Associated fraud ring ID if applicable")


class DownloadableFraudRing(BaseModel):
    """Schema for fraud ring in downloadable format"""
    ring_id: str = Field(..., description="Unique ring identifier")
    member_accounts: List[str] = Field(..., description="List of account IDs in the ring")
    pattern_type: str = Field(..., description="Type of pattern (e.g., 'cycle', 'layering')")
    risk_score: float = Field(..., ge=0, le=100, description="Risk score for the ring 0-100")


class DownloadableSummary(BaseModel):
    """Schema for analysis summary in downloadable format"""
    total_accounts_analyzed: int = Field(..., description="Total number of accounts analyzed")
    suspicious_accounts_flagged: int = Field(..., description="Number of suspicious accounts detected")
    fraud_rings_detected: int = Field(..., description="Number of fraud rings detected")
    processing_time_seconds: float = Field(..., description="Total processing time in seconds")


class DownloadableReport(BaseModel):
    """Complete downloadable report in standardized format"""
    suspicious_accounts: List[DownloadableSuspiciousAccount] = Field(..., description="List of suspicious accounts sorted by score (descending)")
    fraud_rings: List[DownloadableFraudRing] = Field(..., description="List of detected fraud rings")
    summary: DownloadableSummary = Field(..., description="Analysis summary statistics")
