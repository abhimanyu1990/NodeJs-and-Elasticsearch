import express from "express";
import Router from "./routers/router";
import client from "./elasticsearch-connection";


const app = express();
app.use(express.json());

new Router(app);

app.listen(8000,()=>{
    client.info(console.log)
    console.log("Application is running on port 8000")
})