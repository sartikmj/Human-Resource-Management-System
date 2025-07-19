//first req will go to cloudinary to store images assets, as soon as image stored, it will give us a url in response 
// we store that url along with other info of employee in MongoDB

import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

cloudinary.config({ //we initialised in the object cloudinary with method config with its credentials
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
// now the connection with server is secured 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{ //params is an object that tells CLoudinary how and where to store the uploaded files
        folder: "uploads", //folder in which files will be stored
        format: async(req,file)=> 'png', //format of files to be stored
        public_id: (req,file)=> file.originalname.split('.')[0] + "" //to name the files for storage
    }
})

//multer helps us to manipulate the file
const cloudinaryFileUploader = multer({storage: storage}); //telling multer that the storage used is the Cloudinary storage.
//you can also use local storage as storage.

export default cloudinaryFileUploader; //now we can use it as middleware