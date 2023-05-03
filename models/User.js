const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 4,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    img: {
      type: String,
    },
  },
  { timestamps: true }
);

// user sign up
userSchema.statics.SignUp = async function ({
  username,
  email,
  password,
  confirm_password,
}) {
  if (!username || !email || !password || !confirm_password) {
    throw Error("All fields are Mandatory");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not Valid");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw Error("Email must be Unique");
  }

  if (password !== confirm_password) {
    throw Error("Wrong Password");
  }

  const salt = await bcrypt.genSalt(10);
  const hshedPassword = await bcrypt.hash(password, salt);

  // const user = new User({
  //   username,
  //   email,
  //   password: hshedPassword,
  // });

  // await user.save();
  const user = await this.create({username , email , password:hshedPassword});
  const {password:pswd , ...others} = user._doc;

  return others;
};

// user sign in
userSchema.statics.SignIn = async function ({ email, password: pswd }) {
  if (!email || !pswd) {
    throw Error("All Fields Required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const hashedPassword = user.password;
  const typedPassword = pswd;
  const isCorrect = await bcrypt.compare(typedPassword, hashedPassword);

  if (!isCorrect) {
    throw Error("Incorrect Password");
  }

  const token = jwt.sign({ id: user._id , isAdmin:user.isAdmin }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  const { password, ...others } = user._doc;

  return {
    ...others,
    token,
  };
};
const User = mongoose.model("User", userSchema);

module.exports = User;
