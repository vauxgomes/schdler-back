const roles = {
    ROOT: 100,
    ADMIN: 200,
    USER: 300,
    VIEWER: 400
}

const authRoles = (permissions) => {
    return (req, res, next) => {
        if (!permissions.includes(req.user.role)) {
            return res.status(401).json({
                success: false,
                message: 'user.permission.denied'
            })
        }

        next()
    }
}

module.exports = { roles, authRoles }
