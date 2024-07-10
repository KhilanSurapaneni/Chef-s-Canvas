export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'You need to be logged in to access this resource' });
    }
    next();
};
