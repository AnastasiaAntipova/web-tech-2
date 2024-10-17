from fastapi import FastAPI, Depends, Form, File, UploadFile
from databases import Database 
import sqlalchemy
from handlers import users_handler, books_handler
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

@app.post("/books/create_book")
async def create_book(
    title = Form(...),
    author = Form(...),
    description = Form(...),
    file: UploadFile = File(...),
    user = Depends(validate_token_and_role(["admin"]))
    ):
    return await books_handler.upload_book(database, title, author, description, file)

@app.get("/books/get-book/{book_id}")
async def get_book(book_id: int, user = Depends(validate_token_and_role(["user", "approved_user","admin"]))):
    return await books_handler.get_book(database, book_id)

@app.get("/books/download/{book_id}")
async def download_book(book_id: int, user = Depends(validate_token_and_role(["user", "approved_user","admin"]))):
    return await books_handler.download_book(database, book_id)