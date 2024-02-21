const UserModel = require("../models/User");
const {
  hashedPassword,
  createToken,
  comparePassword,
} = require("../services/authServices");

module.exports.register = async (req, res, next) => {
  const { name, email, password, phone, gender, dateBirth } = req.body;

  console.log(req.body);

  try {
    const emailExist = await UserModel.findOne({ email });
    if (!emailExist) {
      const hashed = await hashedPassword(password);
      const user = await UserModel.create({
        name,
        email,
        phone,
        gender,
        dateBirth,
        password: hashed,
      });
      const token = createToken({ id: user._id, name: user.name });

      return res
        .status(201)
        .json({ msg: "Your account has been created!", token });
    } else {
      // email already taken
      return res.status(400).json({
        errors: [{ msg: `${email} is already taken`, param: "email" }],
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
    // return res.status(500).json("Server internal error!");
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      if (await comparePassword(password, user.password)) {
        const token = createToken({ id: user._id, name: user.name });

        return res
          .status(201)
          .json({ msg: "Your login has been created!", token,user});
      } else {
        return res.status(400).json({
          errors: [{ msg: "password not matched!", param: "password" }],
        });
      }
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: `${email} is not found!`, param: "email" }] });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};

