const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });

  const uploadMedia = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: 'auto', // auto detects whether it's an image, video, or audio
          });
          return result.secure_url;
    } catch (error) {
        return error;
    }
    
  };
  
  module.exports = { uploadMedia };