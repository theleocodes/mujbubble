//here we will write the middleware things which are used in routes

/*as images come into binary format from frontend therefore in order to format that we use 2 libraries: 
first we'll install: npm i multer-gridfs-storage ; here specific work of mutler is handling middleware; with the help of multer we can upload files on mongodb
and another to upload image specially on Mongodb; install - npm i multer
 */

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url : `mongodb://${username}:${password}@ac-weqcjsy-shard-00-00.anrwitl.mongodb.net:27017,ac-weqcjsy-shard-00-01.anrwitl.mongodb.net:27017,ac-weqcjsy-shard-00-02.anrwitl.mongodb.net:27017/?ssl=true&replicaSet=atlas-1nbpc6-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) =>{
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.namaType) === -1)
        {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }

})

export default multer({ storage });