const { User } = require('../models/UserModel');

exports.RegisterUser = async (request, response) => {
  const user = new User(request.body);
  await user.save((error, doc) => {
    if (error) {
      return response.status(422).json({errors: error});
    }
    const userData = {
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
    }
    return response.status(200).json({
      success: true,
      message: 'User signed up',
      userData,
    });
  });
}

exports.LoginUser = (request, response) => {
  User.findOne({email: request.body.email}, (error, user) => {
    if (!user) {
      return response.status(404).json({message: 'Email not found!'})
    }
    user.comparePassword(request.body.password, (error, isMatch) => {
      if (!isMatch) {
        return response.status(400).json({success: false, message: 'Password is incorrect!'})
      }
      user.generateToken((error, user) => {
        if (error) {
          response.status(400).send({ error })
        }
        const userData = {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: user.token,
        }
        response.cookie('authToken', user.token).status(200).json({
          success: true,
          message: 'User logged in',
          userData,
        });
      });
    });
  });
}

exports.LogoutUser = (request, response) => {
  User.findByIdAndUpdate({
    _id: request.user._id
  },
  {
    token: ''
  }),
  (error) => {
    if (error) {
      return response.status(400).json({
        success: false,
        message: error
      })
    }
    return response.status(200).json({
      success: true,
      message: 'User logged out',
    });
  }
}

exports.getUserDetails = (request, response) => {
  return response.status(200).json({
    isAuth: true,
    firstName: request.user.firstName,
    lastName: request.user.lastName,
    email: request.user.email,
  })
}

