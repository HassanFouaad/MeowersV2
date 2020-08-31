const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

///JOIN
exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    console.log(user);
    //Return JSONWEBTOKEN
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .cookie("Tea", token, { expire: new Date() + 9999 })
          .json({ token, msg: "User has been created successfully" });
      }
    );
    user.salt = undefined;
    user.hashed_password = undefined;
    user.role = undefined;
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
};

//signin
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email }, (err, user) => {
      if (!user || err) {
        return res
          .status(401)
          .json({ error: "Email doesn't exists, Please Signup and try again" });
      }
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invaild Credentials" }] });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          console.error(err);
        }
        return res
          .status(200)
          .cookie("Tea", token, { expire: new Date() + 9999 })
          .json({ token, msg: "Signed In Successfully" });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

//SignOut

exports.signOut = (req, res) => {
  jwt.res.clearCookie("Tea");
  res.json({ message: "Signed Out" });
};
