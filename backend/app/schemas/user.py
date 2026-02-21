"""
User-related Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    """Base user schema"""
    organization_name: str = Field(..., min_length=3, max_length=100)
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None


class UserCreate(UserBase):
    """Schema for user registration"""
    password: str = Field(..., min_length=6, max_length=100)

    @validator('organization_name')
    def validate_organization_name(cls, v):
        if not v.strip():
            raise ValueError('Organization name cannot be empty')
        return v.strip()


class UserLogin(BaseModel):
    """Schema for user login"""
    organization_name: str = Field(..., min_length=3)
    password: str = Field(..., min_length=6)


class UserResponse(UserBase):
    """Schema for user response (excludes password)"""
    id: str
    created_at: datetime
    is_active: bool = True

    class Config:
        from_attributes = True


class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Schema for JWT token data"""
    organization_name: Optional[str] = None
    user_id: Optional[str] = None
