
export const auth = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).send({
            success: false,
            message: 'User not logged'
        });
    }
    next();
}