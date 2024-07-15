import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';
import multer from 'multer';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ChefsCanvas', 
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage })

export default upload;
