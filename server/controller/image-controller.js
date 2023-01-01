import { response } from "express";
import grid from 'gridfs-stream';
import mongoose from "mongoose";

const url = 'http://localhost:8000'

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', ()=>{
    gridfsBucket =  new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

export const uploadImage = (request, response) => {
    if(!request.file){
        return response.status(404).json({ msg: "File not found" });
    }

    const imageUrl = `${url}/file/${request.file.filename}`;
    return response.status(200).json(imageUrl);
}

export const getImage = async(request, response) =>{
    //as we are getting image link in backend in the form of chunks(numberform) so we can't work with that therefore installing: npm i gridfs-stream; in order to make it into reatable formate from MongoDB
    try{
        const file = gfs.files.findOne({filename: request.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    }catch(error){
        return response.status(500).json({ msg: error.message})

    }
}