"""
Authentication service for user management
"""
from datetime import datetime
from typing import Optional
from passlib.context import CryptContext
from bson import ObjectId

from app.database import get_collection, USERS_COLLECTION
from app.schemas.user import UserCreate, UserResponse

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_user_by_organization(organization_name: str) -> Optional[dict]:
    """
    Get user by organization name
    
    Args:
        organization_name: Organization name to search for
        
    Returns:
        User document or None if not found
    """
    users_collection = get_collection(USERS_COLLECTION)
    if users_collection is None:
        return None
    
    user = users_collection.find_one({"organization_name": organization_name})
    return user


def get_user_by_id(user_id: str) -> Optional[dict]:
    """
    Get user by ID
    
    Args:
        user_id: User ID to search for
        
    Returns:
        User document or None if not found
    """
    users_collection = get_collection(USERS_COLLECTION)
    if users_collection is None:
        return None
    
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        return user
    except Exception:
        return None


def create_user(user_data: UserCreate) -> Optional[dict]:
    """
    Create a new user
    
    Args:
        user_data: User creation data
        
    Returns:
        Created user document or None if failed
    """
    users_collection = get_collection(USERS_COLLECTION)
    if users_collection is None:
        return None
    
    # Check if user already exists
    existing_user = get_user_by_organization(user_data.organization_name)
    if existing_user:
        return None
    
    # Create user document
    user_doc = {
        "organization_name": user_data.organization_name,
        "email": user_data.email,
        "full_name": user_data.full_name,
        "hashed_password": hash_password(user_data.password),
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    # Insert user
    result = users_collection.insert_one(user_doc)
    
    # Retrieve and return created user
    if result.inserted_id:
        user = users_collection.find_one({"_id": result.inserted_id})
        return user
    
    return None


def authenticate_user(organization_name: str, password: str) -> Optional[dict]:
    """
    Authenticate a user
    
    Args:
        organization_name: Organization name
        password: Plain text password
        
    Returns:
        User document if authentication successful, None otherwise
    """
    user = get_user_by_organization(organization_name)
    
    if not user:
        return None
    
    if not verify_password(password, user.get("hashed_password", "")):
        return None
    
    if not user.get("is_active", False):
        return None
    
    return user


def user_to_response(user: dict) -> UserResponse:
    """
    Convert user document to UserResponse schema
    
    Args:
        user: User document from MongoDB
        
    Returns:
        UserResponse object
    """
    return UserResponse(
        id=str(user["_id"]),
        organization_name=user["organization_name"],
        email=user.get("email"),
        full_name=user.get("full_name"),
        created_at=user["created_at"],
        is_active=user.get("is_active", True)
    )
