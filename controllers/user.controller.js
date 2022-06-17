const { User }             = require('../models');
const bcrypt               = require('bcrypt');
const jwt                  = require('jsonwebtoken');
const { SALT_ROUNDS }      = process.env;
const {sendEmail, sendOTP} = require('../misc/mailer')
const { checkPassword }    = require('../misc/auth')

const getAllUsers = async (req, res) => {
    try {
        // let { page, row } = req.query;

        // page -= 1;

        const options = {
            attributes: ['id', 'name', 'email', 'password', 'city', 'address', 'phone_number', 'role_id', 'profile_picture' ],
            // offset: page,
            // limit: row,
        };

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

const register = async (req, res) => {
    try {
        const { name, email, password, city, address, phone_number, role_id, profile_picture } = req.body;
        const createdUser = await User.create({
            name: name,
            email: email,
            password: password
        });
        return res.status(201).json({
            status: 'User created successfully',
            data: createdUser
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: err.message
          }) 
    }
};
  
  const login = async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({
      where: {
        email: email
      }
    });
    const isValidPassword = bcrypt.compareSync(password, foundUser.password);
    if (isValidPassword) {
      const payload = {
        name: foundUser.name,
        email: foundUser.email,
        city: foundUser.city,
        address: foundUser.address,
        phone_number: foundUser.phone_number,
        role_id: foundUser.role_id
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      return res.status(200).json({
        token: token
      });
  };
    return res.status(400).json({
      status: 'Failed',
      message: 'Wrong email or password'
    });
};

const sendToEmail = async(req, res) => {
  try {
      const {to, message} = req.body;
      const emailRes = await sendEmail(to, message)
      return res.status(200).json({
          message: `Successful email sent to ${emailRes.accepted.join(',').split(',')}`
      })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

const getOtp = async (req, res) => {
  try {
      const { email } = req.body;
      const otp = Math.random().toString(36).slice(-6).toUpperCase();
      const hashOtp = bcrypt.hashSync(otp, +SALT_ROUNDS);
      const updateEmail = await User.update(
        {
          otp: hashOtp
        },{
          where: {
              email: email
          }
      })
      if (!updateEmail[0]) {
          return res.status(400).json({
              status: 'Error',
              message: 'Email not found'
          })
      }
      const otpMessage = `OTP: ${otp}, please use this otp as your credential to retrieve the password. DON'T SHARE OTP!`
      const emailRes = await sendOTP(email, otpMessage);

      return res.status(200).json({
          message: `OTP successfully sent to ${emailRes.accepted.join(',').split(',')}`
      })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
};

const PasswordOTP = async (req, res) => {
  try {
      const { email, newPassword, newPasswordConfirmation, otp } = req.body;

      if (newPassword === newPasswordConfirmation) {
          const foundUser = await User.findOne({
              where: {
                  email: email
              }
          });
          if (!foundUser) throw { message: 'Email is not registered', status: 'Failed', code: 400 };

          const compareOtp = checkPassword(otp, foundUser.otp);

          if (compareOtp) {
              await foundUser.update({
                  password: bcrypt.hashSync(newPassword, +SALT_ROUNDS),
                  otp: null
              });

              return res.status(200).json({
                  status: 'Success',
                  message: 'Password successfully changed'
              });
          }

          throw { message: 'Wrong OTP', status: 'Failed', code: 400 };
      }

      throw { message: `Password doesn't match`, status: 'Failed', code: 400 };
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
};

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
          }, returning: true
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
    register,
    login,
    sendToEmail,
    getOtp,
    PasswordOTP,
    updateUser,
    deleteUser
  }