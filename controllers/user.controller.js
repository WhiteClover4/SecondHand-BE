const { User }             = require('../models');


const getAllUsers = async (req, res) => {
    try {
        const options = {
            attributes: ['name', 'email', 'password', 'city', 'address', 'phone_number', 'role_id', 'profile_picture' ],
        };

        if(req.query) {
            let { page, row } = req.query;
    
            let pages = ((page - 1) * row);
    
    
            if (page && row) {
                options.offset = pages;
                options.limit = row;
            }
        }


        const allUsers = await User.findAll(options);

        return res.status(200).json({
            status: 'success',
            result: allUsers,
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          message: err.message
        }) 
    }
}



const updateUser = async (req, res) => {
  try {
      const {name, city, address, phone_number, profile_picture} = req.body;
      let id = req.params.id;
      if(!( await User.findByPk(id))) return res.status(404).json({
        status:"Error",
        message:"User not found!"
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
          message: "Data updated successfully",
          data: updatedUser[1]
      });
  } catch (error) {
      res.status(400).json({
          status: "Error",
          message: "Update data failed!",
          error: error
      });
  }
};

const deleteUser = async (req, res) => {
  try{
      const deletedUser = await User.destroy({
          where: {
              id: req.params.id
          }
      });
      if (!deletedUser) {
        return res.status(404).json({
          message: `User dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          message: 'Yosha'
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser
  }