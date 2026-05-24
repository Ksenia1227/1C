const { auth } = require('../models/auths')
const { user } = require('../models/user')
const bcrypt = require('bcryptjs')
// Библиотека для хеширования паролей.
const jwt = require('jsonwebtoken')
// Библиотека для создания JWT
require('dotenv').config()
// Загружает переменные окружения из .env файла.
const secret = process.env.SECRET
const { v4: uuidv4 } = require('uuid')
// Генерирует уникальные идентификаторы для пользователей
const ACCESS_LIFETIME = 15 * 60
const REFRESH_LIFETIME = 60 * 60 * 24 * 60


createToken = (uid,role, lifetime) => jwt.sign({ uid, role }, secret, { expiresIn: lifetime })
createAccess = (uid,role) => createToken(uid, role, ACCESS_LIFETIME)
createRefresh = (uid, role) => createToken(uid,role, REFRESH_LIFETIME)

const { generateUserData } = require("../services/generatorService");
const fs = require("fs");
const path = require("path");

exports.signup = async (req, res) => {
    try {
        const authed = await auth.create({
            uid: uuidv4(),
            email: req.body.email.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 8)
        })
        const cur_user = await user.create({
            uid: authed.uid,
            name: req.body.name,
        })
        const generated = await generateUserData(
            cur_user.uid,
            cur_user.name,
            authed.email
        )
        const dir = path.join(__dirname, "../data/users");
        fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, `${cur_user.uid}.json`);

        fs.writeFileSync(
            filePath,
            JSON.stringify(generated, null, 2)
        );

        return res.status(201).send({ message: 'User are registered', uid: cur_user.uid })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
exports.signin = async (req, res) => {
    try {
        const user = await auth.findOne({
            where: {
                email: req.body.email.toLowerCase()
            }
        })
        if (!user) return res.status(404).send({ message: 'User not found' })
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) return res.status(401).send({ message: 'Invalid Password!' })
        const token = createAccess(user.uid, user.role)
        const token_refresh = createRefresh(user.uid, user.role)
        await auth.update({ AccessToken: token, RefreshToken: token_refresh }, { where: { uid: user.uid } })
        return res.status(200).send({
            uid: user.uid,
            role: user.role,
            accessToken: token,
            refreshToken: token_refresh
        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
exports.changeAccess = async (req, res) => {
    try {
        let token_refresh = req.headers['x-refresh-token']
        const { uid } = jwt.verify(token_refresh, secret)
        const user = await auth.findOne({ where: { uid: uid } })
        if (!user) return res.status(404).send({ message: 'User not found' })
        const token = createAccess(user.uid, user.role)
        token_refresh = createRefresh(user.uid, user.role)
        await auth.update({ AccessToken: token, RefreshToken: token_refresh }, { where: { uid: user.uid } })
        return res.status(200).send({
            uid: user.uid,
            role: user.role,
            accessToken: token,
            refreshToken: token_refresh
        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
