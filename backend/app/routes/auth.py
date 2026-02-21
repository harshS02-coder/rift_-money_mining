"""
Authentication API routes
"""
from datetime import timedelta
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer

from app.schemas.user import UserCreate, UserLogin, Token, UserResponse
from app.services.auth_service import (
    create_user,
    authenticate_user,
    user_to_response,
    get_user_by_organization
)
from app.utils.jwt_utils import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.utils.auth_dependencies import get_current_user

router = APIRouter(prefix="api/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserCreate):
    """
    Register a new user
    
    Args:
        user_data: User registration data
        
    Returns:
        Created user information
        
    Raises:
        HTTPException: If organization name already exists
    """
    # Check if organization already exists
    existing_user = get_user_by_organization(user_data.organization_name)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Organization name already registered"
        )
    
    # Create user
    user = create_user(user_data)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )
    
    return user_to_response(user)


@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    """
    Login and get access token
    
    Args:
        user_credentials: User login credentials
        
    Returns:
        JWT access token
        
    Raises:
        HTTPException: If credentials are invalid
    """
    # Authenticate user
    user = authenticate_user(
        user_credentials.organization_name,
        user_credentials.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid organization name or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "sub": user["organization_name"],
            "user_id": str(user["_id"])
        },
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """
    Get current authenticated user information
    
    Args:
        current_user: Current authenticated user from dependency
        
    Returns:
        User information
    """
    return user_to_response(current_user)


@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """
    Logout user (client should delete the token)
    
    Args:
        current_user: Current authenticated user from dependency
        
    Returns:
        Success message
    """
    return {
        "message": "Successfully logged out",
        "organization_name": current_user["organization_name"]
    }
