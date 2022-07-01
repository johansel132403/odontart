var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
    secure: true
  });


 async function uploadFileImgCloudinary(fileImage){

  return  await cloudinary.uploader.upload(fileImage,{
    folder: 'imgodonto'
  });
}

module.exports = { uploadFileImgCloudinary };