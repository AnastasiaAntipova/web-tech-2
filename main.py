from fastapi import FastAPI, Depends
from databases import Database 
import sqlalchemy
from handlers import users_handler
from schemas.user import UserCreate, UserAuthorize
from database import metadata, engine, database
from utils.token import validate_token_and_role

metadata.create_all(bind=engine)

app=FastAPI()

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/users/")
async def read_users():
   query = users.select()
   return await database.fetch_all(query)

@app.post("/users/")
async def create_user(user:UserCreate):
    return await users_handler.create_user(user, database)


@app.post("/users/authorize")
async def authorize_user(user:UserAuthorize):
    return await users_handler.authorize_user(user, database)
    
@app.get("/with-credentials")
async def check_credentials(user = Depends(validate_token_and_role([ "approved_user", "admin"]))):
    return {"msg": "Welcome allowed user"}
    
    
@app.get("/without-credentials")
async def check_credentials():
     return {"msg": "Welcome all"}