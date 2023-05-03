
export const myProfile = (req, res, next) => {
    res.send({
        success: false,
        message: 'User logged',
        user: req.user
    });
}

export const logout = (req, res, next) => {
    res.clearCookie('access_token').send({
        success: true,
        message: 'logout successfully'
    })
}