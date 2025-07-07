const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "No hay sesión activa"
    });
  }
};

module.exports = authMiddleware;