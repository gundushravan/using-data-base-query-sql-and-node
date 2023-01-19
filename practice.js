const express = require("express");
const path = require("path");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath =path.join(__dirname,"goodreads.db");

const app = express();

let db =null;

const initiallizeDBAndServer =async ()=>{
   try{
        db =await open({
        filename:dbPath,
        driver:sqlite3.Database
        })
        app.listen(3000,()=>{
            console.log("Server Running at http//localhost:3000/")
    });
   }catch(e){
        console.log(`DB error: ${e.massege}`);
        process.exit(1);
   }
    
    
}
initiallizeDBAndServer();

app.get("/books/", async (Request,Response) =>{
    const getBooksquery =`
        SELECT * FROM book ORDER BY book_id;`;
        const booksArray = await db.all(getBooksquery);
        Response.send(booksArray);

})
