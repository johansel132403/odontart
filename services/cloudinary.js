var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
    secure: true
  });


 async function uploadFileImgCloudinary(fileImage){

    console.log('prue',fileImage)

  return  await cloudinary.uploader.upload(fileImage,{
    folder: 'imgodonto'
  });
}


async function deleteImagenCloudinary(publicId){
  return await cloudinary.uploader.destroy(publicId)

}

module.exports = { uploadFileImgCloudinary,deleteImagenCloudinary };