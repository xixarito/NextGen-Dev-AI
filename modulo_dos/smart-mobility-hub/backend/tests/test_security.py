import pytest
from app.security import verify_password, hash_password, create_access_token
from datetime import datetime, timedelta

def test_password_hashing():
    """Test password hashing and verification"""
    password = "testpassword123"
    hashed = hash_password(password)
    
    # Hashed password should be different from original
    assert hashed != password
    
    # Should verify correctly
    assert verify_password(password, hashed) is True
    
    # Should not verify wrong password
    assert verify_password("wrongpassword", hashed) is False

def test_create_access_token():
    """Test JWT token creation"""
    subject = "testuser"
    token = create_access_token(subject)
    
    # Token should be a string
    assert isinstance(token, str)
    
    # Token should have 3 parts (header.payload.signature)
    assert len(token.split('.')) == 3