module.exports = {
    // Middleware to check if user is authenticated (logged in)
    ensureAuth: (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },

    // Middleware to check for admin role
    ensureAdmin: (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }
    res.status(403).send("Not authorized");
  }
};
