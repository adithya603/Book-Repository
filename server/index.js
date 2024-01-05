// If you get {"code":"PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR","fatal":false} type this: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password_here'; into the MYSQL workbench file --> new query tab and click the middle lightning bolt. Then restart your node server.
//npm i cors

//for "import" to work include "type":"module"

import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "linux123",
    database: "test"
})

app.use(express.json());  //Middleware (when we post data from the browser, the data is not processed so we use a middleware)
app.use(cors())  //[CROSS ORIGIN RESOURCE SHARING] allows the frontend (e.g., a React app) to make requests to this server from a different origin

app.get("/",function(req,res){
    res.send("This is backend")
})

app.get("/books",function(req, res){
    const q = "SELECT * FROM books"
    
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books",function(req, res){
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Book was created successfully")
    })
})

app.delete("/books/:id",function(req, res){
    const bookId = req.params.id;    //params represents the endpoint url
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book was deleted successfully")
    })
})

app.put("/books/:id",function(req, res){
    const bookId = req.params.id;    //params represents the endpoint url
    const q = "UPDATE books SET `title` =?, `desc`=?, `cover` = ? WHERE id = ?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q, [...values, bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been updated successfully.")
    })
})

app.listen(8800,function(){
    console.log("Backend connected!")
})