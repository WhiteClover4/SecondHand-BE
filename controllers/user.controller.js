const { User }             = require('../models');


const getAllUsers = async (req, res) => {
    try {
        const options = {
            attributes: ['name', 'email', 'password', 'city', 'address', 'phone_number', 'profile_picture' ],
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
            msg: 'Semua user ditampilkan',
            data: allUsers,
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        }) 
    }
}

const getUserData = async (req, res) => {
    try {
        console.log(req);
        return res.status(200).json({
            status: "success",
            msg: "User berhasil ditemukan",
            data: req.user
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

const deleteUser = async (req, res) => {
  try{
      const deletedUser = await User.destroy({
          where: {
              id: req.params.id
          }
      });
      if (!deletedUser) {
        return res.status(404).json({
          msg: `User dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          msg: 'User berhasil dihapus'
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

module.exports = {
    getAllUsers,
    getUserData,
    updateUser,
    deleteUser
  }