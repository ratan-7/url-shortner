import { registerUser, loginUser } from "./user.service.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const user = await registerUser({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    const statusCode = error.message === "Email already registered" ? 409 : 500;

    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal server error" : error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    const statusCode =
      error.message === "Invalid email or password" ? 401 : 500;

    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal server error" : error.message,
    });
  }
};

export { register, login };
