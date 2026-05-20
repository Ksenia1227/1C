const { auth } = require('../models/auths')

checkDuplicateEmail = async (req, res, next) => {
    try {
        const authed = await auth.findOne({ where: { email: req.body.email.toLowerCase() } })
        if (authed) return res.status(409).send({ message: 'Email already used' })
        next()
    } catch (error) {
        return res.status(500).send({ message: 'Cannot find email attribute' })
    }

}

const checkSignUp = {
    checkDuplicateEmail
}

module.exports = checkSignUp