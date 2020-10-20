import express from "express";
import Router from "./routers/router"
const app = express();

new Router(app);

app.listen(8000,()=>{
    console.log("Application is running on port 8000")
})