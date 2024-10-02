from utils.password import hash_password
from sqlalchemy import select, insert 
from models.Users import users
from fastapi import HTTPException

async def create_user(user, db):
    query = select(users).where(users.c.email == user.email)
    existing_user = await db.fetch_one(query)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists") 
    
    hashed_password = hash_password(user.password)

    query = insert(users).values(
        name = user.name,
        email = user.email,
        hashed_password = hashed_password,
    )
    await db.execute(query)

    return {"name":user.name, "email":user.email}