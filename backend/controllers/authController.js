// const User = require('../models/User');
// // const { OAuth2Client } = require('google-auth-library');

// // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const googleLogin = async (req, res) => {
//   const { token } = req.body;

//   try {
//     // Verify the token with Google
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { name, email, picture: avatar } = ticket.getPayload();

//     // Check if the user already exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create a new user if they don't exist
//       user = new User({ name, email, avatar });
//       await user.save();
//     }

//     res.status(200).json(user); // Return user details
//   } catch (error) {
//     console.error('Google login error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { googleLogin };

const User = require('../models/User');
// const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { name, email, picture: avatar } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if they don't exist
      user = new User({ name, email, avatar });
      await user.save();
    }

    res.status(200).json(user); // Return user details
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const googleUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Return users in JSON format
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { googleLogin, googleUsers };

