import User from '../../models/User';
import connectDb from '../../utils/connectDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(404).send(`User with email "${email}" does't exist. Please sign up.`)
    }
    // check to see if the user's password matches the one in database,
    const passwordMatched = await bcrypt.compare(password, user.password);
    // if so generate token
    if(passwordMatched) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });
      // send the token to client
      res.status(200).json(token);
    }
    else {
      res.status(401).send('Passwords do not match!');
    }
  }
  catch(error) {
    console.error(error);
    res.status(500).send("Error loggin in user!");
  }
};