const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.token;

    if (!authHeader) {
      return res.status(401).json({
        message: "You are not Authenticated",
      });
    }

    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};

const verifyTokenUser = async (req, res, next) => {
  const { id } = req.params;

  if (req.user.id === id) {
    next();
  } else {
    res.status(401).json({
      message: "You are not allowed to do thtat",
    });
  }
};

const verifyTokenAdmin = async (req, res, next) => {
  if (req.user.isAdmin === true) {
    next();
  } else {
    res.status(401).json({
      message: "You are not allowed to do that",
    });
  }
};

const verifyTokenUserAdmin = async (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.id) {
    next();
  } else {
    res.status(401).json({
      message: "You are not allowd to do that",
    });
  }
};
module.exports = {
  verifyToken,
  verifyTokenUser,
  verifyTokenAdmin,
  verifyTokenUserAdmin,
};
