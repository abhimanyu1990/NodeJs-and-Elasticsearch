
import express from "express";

export default class Router {

    constructor(router:express.Router){
           
          router.get("/api/search",(req,res)=>{
                res.send("hello");
           })

           router.post("/api/save",(req,res) => {
               res.send("hello");
           })

           router.put("/api/update",(req,res) =>{
              res.send("hello");
           });

           router.get("/api/percolator/search",(req,res)=>{
               res.send("hello")
           })


           router.get("/api/projection/search",(req,res) => {
               res.send("hello")
           });


           router.get("/api/geo/search",(req,res)=>{
               res.send("hello")
           })

           router.get("/api/reindex",(req,res)=>{
            res.send("hello")
        })
    }

}