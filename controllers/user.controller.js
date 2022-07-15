const { User }             = require('../models');

const getUserData = async (req, res) => {
    try {
        const foundUser = await User.findByPk(req.user.id, {
            attributes: ['name', 'city', 'address', 'phone_number', 'profile_picture' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "User berhasil ditemukan",
            data: foundUser
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
          }) 
    }
}

const updateUser = async (req, res) => {
  try {
      const {name, city, address, phone_number, profile_picture} = req.body;
      let id = req.user.id;
      if(!( await User.findByPk(id))) return res.status(404).json({
        status:"Error",
        msg:"User not found!"
      });
      
      const updatedUser = await User.update({
          name: name,
          city: city,
          address: address,
          phone_number: phone_number,
          profile_picture: profile_picture
      }, {
          where: {
              id: id
          }
      });

      res.status(201).json({
          status: "Success",
          msg: "Data updated successfully",
          data: updatedUser[1]
      });
  } catch (error) {
      res.status(400).json({
          status: "Error",
          msg: "Update data failed!",
          error: error
      });
  }
};

module.exports = {
    getUserData,
    updateUser
  }