from pydantic import BaseModel, Field
from datetime import datetime


class Transaction(BaseModel):
    """Schema for individual transactions"""
    transaction_id: str = Field(..., description="Transaction ID")
    sender_id: str = Field(..., description="Sender account ID")
    receiver_id: str = Field(..., description="Receiver account ID")
    amount: float = Field(..., gt=0, description="Transaction amount")
    timestamp: datetime = Field(..., description="Transaction timestamp")

    class Config:
        json_schema_extra = {
            "example": {
                "transaction_id": "TXN001",
                "sender_id": "ACC001",
                "receiver_id": "ACC002",
                "amount": 5000.00,
                "timestamp": "2025-12-15T10:30:00"
            }
        }


class TransactionRequest(BaseModel):
    """Request schema for transaction batch uploads"""
    transactions: list[Transaction] = Field(..., description="List of transactions")

    class Config:
        json_schema_extra = {
            "example": {
                "transactions": [
                    {
                        "transaction_id": "TXN001",
                        "sender_id": "ACC001",
                        "receiver_id": "ACC002",
                        "amount": 5000.00,
                        "timestamp": "2025-12-15T10:30:00"
                    }
                ]
            }
        }
