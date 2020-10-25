
import express from "express";
import { readFile } from "fs";
import { request } from "http";
import client from "../elasticsearch-connection";

export default class Router {

    constructor(router: express.Router) {

        // to create an index
        // request body
        // {
        //     "index":"company"
        // }
        router.post("/api/index", (req, res) => {
            client.indices.create({
                index: req.body.index
            }, (err: any, resp: any) => {
                if (err) {
                    res.send(err.meta.body.error);
                }
                else {
                    res.send(resp.body)
                }
            });

        })

    

        // To enable percolator query on an Index
        // {
        //     "name":"company",
        //     "properties":{
        //            "properties": {
        //             "perco_query": {                // on this line perco_query refer as name , it could be any name which you want to give to percolate query
        //                "type": "percolator"
        //              },   
        //             "firstname": { "type": "text" },
        //             "lastname": { "type": "text" },
        //             "email": { "type": "text" },
        //             "emoployeeId":{"type":"integer"}
        //              }
        // }

        // Document mapping without Percolator
        // {
        //     "name":"company",
        //     "properties":{
        //            "properties": {   
        //             "firstname": { "type": "text" },
        //             "lastname": { "type": "text" },
        //             "email": { "type": "text" },
        //             "emoployeeId":{"type":"integer"}
        //              }
        // }


        router.put("/api/mapping", (req, res) => {
            client.indices.putMapping({
                index: req.body.name,
                body: req.body.properties
            }, function (err: any, resp: any) {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send(resp)
                }
            });

        })

        // Delete data from a index
        // {
        //     "name":"company",
        //     "id":"2YFZXnUBpDtnz55qWc-p"
        // }
        
        router.delete("/api/index/data", (req, res) => {
            client.delete({
                index: req.body.name,
                id: req.body.id,
                type: req.body.type
            }, (err: any, resp: any) => {
                if (err) {
                    res.send(err.meta.body.error);
                }
                else {
                    res.send(resp.body)
                }
            });
        })

        //delete a index

        router.delete("/api/index/:indexname", (req, res) => {
            client.indices.delete({ index: req.params.indexname }, (err: any, resp: any) => {
                if (err) {
                    res.send(err.meta.body.error);
                } else {
                    res.send(resp.body)
                }
            });
        });

        // Add data to a index
        // Request Body
        // {
        //     "index":"company",
        //     "data":{
        //         "firstname":"vicky",
        //         "lastname":"singh",
        //         "email":"example2@abhimanyu.com",
        //         "employeeId":"4"
        //     }
        // }
        router.post("/api/save", (req, res) => {
            let documentId = new Date().getTime().toString()
            client.index({
                index: req.body.index,
                id: documentId,
                type: req.body.type,
                body: req.body.data
            }, (err: any, resp: any) => {
                if (err) {
                    res.send(err.meta.body.error);
                }
                else {
                    res.send(resp.body)
                }
            });
        });

        // Update a document
        // {
        //     "index":"company",
        //     "documentId":"1603520966910",
        //     "data":{
        //         "firstname":"abhimanyu singh 08901"
        //     }
        // }

        router.put("/api/update", (req, res) => {
            client.index({
                index: req.body.index,
                id: req.body.documentId,
                type: req.body.type,
                body: req.body.data
            }, (err: any, resp: any) => {
                if (err) {
                    res.send(err.meta.body.error);
                }
                else {
                    res.send(resp.body)
                }
            });
        });


        //request
        // {
        //     "name":"testing",  #index name
        //     "query":{          # query  we need to run  for search
        //         "query": {
        //          "match": { "employee": "abhimanyu" }
        //         }
        //     }
        // }

        router.get("/api/search", (req, res) => {
            client.search({
                index: req.body.name,
                type: req.body.type,
                body: req.body.query
            }, (err: any, resp: any) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(resp);
                    res.send(resp)
                }
            });
        });

        // {
        //     "name": "company",
        //     "query": {
        //         "query": {
        //             "percolate": {
        //                 "field": "perco_query",
        //                     "document": {
        //                     "firstname": "abhimanyu"
        //                 }
        //             }
        //         }
        //     }
        // }
        router.get("/api/percolator/search", (req, res) => {
            client.search({
                index: req.body.name,
                type: req.body.type,
                body: req.body.query
            }, (err: any, resp: any) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(resp)
                }
            });
        });

    }

}