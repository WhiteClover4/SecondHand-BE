const cloudinary = require('cloudinary').v2;
const fs         = require('fs');

cloudinary.config({
    cloud_name: 'dfhjxw9zd',
    api_key: '828852342422215',
    api_secret: 'GOB2p0dnpYNyyqC8DOedfxq9E4g'
});
const uploadWithCloudinary = async (req, res, next) => {
    try {
        const folder = 'assets/${req.file.mimetype.split('/')[0]}';
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: folder,
            resource_type: "auto"
        });
        fs.unlinkSync(req.file.path);
        req.body.profile_picture = uploadResult.secure_url;
        next();
    } catch (error) {
        fs.unlinkSync(req.file.path);
        console.log(error);
    }
};

module.exports = uploadWithCloudinary;