import User from '../../models/User';
import Cart from '../../models/Cart';
import connectDb from '../../utils/connectDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // validate name, email, password values
    if (!isLength(name, { min: 3, max: 20})) {
      return res.status(422).send("Name must be 3-10 characters");
    }
    else if (!isLength(password, { min: 6 })) {
      return res.status(422).send("Password must be atleast 6 characters long");
    }
    else if (!isEmail(email)){
      return res.status(422).send("Email must be valid");
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exits with email ${email}`);
    }
    // Otherwise, hash the password
    const hash = await bcrypt.hash(password, 10);
    // create the user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    console.log({newUser});
    // create cart for the new user
    await new Cart({ user: newUser._id }).save();
    // create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })
    // send back the token
    res.status(200).json(token);
  }
  catch(error) {
    console.error(error);
    res.status(500).send("Error signup user. Please try again later!");
  }
}