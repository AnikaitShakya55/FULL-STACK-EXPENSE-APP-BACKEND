const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sib = require("sib-api-v3-sdk");

const JWT_SECRET = "dfjkfdjdfkvkdfjbfbfggfgfvjg";

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;
const transEmailApi = new Sib.TransactionalEmailsApi();

exports.forgetHandler = async (req, res) => {
  console.log(req.body);
  try {
    const sender = {
      email: "shakya.ani47@gmail.com",
      name: "Expense App",
    };

    const receivers = [{ email: req.body.email }];

    const response = await transEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "FORGOT PASSWORD SERVICE",
      textContent: "Learning sending email service",
    });

    console.log("Email sent successfully!", response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("REGISTER", req.body);
    if (!username || !email || !password) {
      return res.status(401).send({
        message: "Please Enter Valid SignUp Details",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      name: username,
      email,
      password: hashedPassword,
    });
    return res.status(200).send({ message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both email and password." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: "Lax",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message });
  }
};
