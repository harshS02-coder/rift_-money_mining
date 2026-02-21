"""
MongoDB database connection and utilities
"""
import os
from pymongo import MongoClient, errors
from dotenv import load_dotenv

load_dotenv()

# MongoDB Configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "rift_2026")

# Global MongoDB client
_client = None
_database = None


def get_mongodb_client():
    """Get MongoDB client instance (singleton)"""
    global _client
    if _client is None:
        try:
            _client = MongoClient(
                MONGODB_URL,
                serverSelectionTimeoutMS=5000,
                connectTimeoutMS=10000,
            )
            # Test connection
            _client.admin.command('ping')
            print(f"[OK] Successfully connected to MongoDB at {MONGODB_URL}")
        except errors.ConnectionFailure as e:
            print(f"[ERROR] Failed to connect to MongoDB: {e}")
            _client = None
    return _client


def get_database():
    """Get database instance"""
    global _database
    if _database is None:
        client = get_mongodb_client()
        if client:
            _database = client[MONGODB_DB_NAME]
    return _database


def get_collection(collection_name: str):
    """Get a specific collection from the database"""
    db = get_database()
    if db is not None:
        return db[collection_name]
    return None


def close_mongodb_connection():
    """Close MongoDB connection"""
    global _client, _database
    if _client:
        _client.close()
        _client = None
        _database = None
        print("[INFO] MongoDB connection closed")


# Collection names
USERS_COLLECTION = "users"
ANALYSIS_SESSIONS_COLLECTION = "analysis_sessions"
