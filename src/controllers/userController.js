import {EmailToken, User} from "../db/models.js";
import pkg from 'jsonwebtoken';
import nodemailer from "nodemailer";
const {sign} = pkg;
import pkg2 from "bcryptjs"
import qrcode from 'qrcode';
import { authenticator } from '@otplib/preset-default';
const {compareSync, genSaltSync, hashSync} = pkg2;

export default new (class {
    async authorize(req, res) {
        const {
            login,
            password,

        } = req.body

        const candidate = await User.findOne({login})

        if (!candidate) return res.status(401).json({error: "Не верный логин."})

        const is = compareSync(password, candidate.password)

        if (!is) return res.status(401).json({error: "Не верный пароль."})

        const email_token = new EmailToken({
            user: candidate
        })

        await email_token.save()

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: Number(process.env.SMTP_PORT),
            secure: Boolean(process.env.SMTP_SERVER), // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // generated ethereal user
                pass: process.env.SMTP_PASS, // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: '"Hackathon Project" <hackathon@rgit.tech>', // sender address
            to: candidate.email, // list of receivers
            subject: "Код авторизации", // Subject line
            text: "Двух-этапная аутентификация", // plain text body
            html: `<b><h1>${email_token.code}</h1></b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        return res.status(200).json({})
    }

    async mailLogin(req, res) {
        const {
            email_code
        } = req.body;

        let candidate = await EmailToken.findOne({code: email_code})

        if (!candidate) return res.status(401).json({error: "Код авторизации не верен"})

        const payload = {
            _id: candidate.user._id
        }

        const jwt = sign(payload, process.env.SECRET)

        await Promise.all((await EmailToken.find()).map(i => i.remove()))

        return res.status(200).json({jwt, user: candidate.user})
    }

    async me(req, res) {
        return res.status(200).json(req.user)
    }

    async create(req, res) {
        try {
            let obj = new User({
                login: req.body.login,
                password: hashSync(req.body.password, genSaltSync()),
                roles: req.body.roles,
                email: req.body.email
            })

            await obj.save()

            return res.status(200).json(obj)
        } catch (e) {
            console.error(e)
            return res.status(500).json({error: "Ошибка сервера смотрите консоль"})
        }
    }

    async googleAuth(req, res) {
        const {
            email,
            secret,
        } = req.body;

        if (!secret) return res.status(400).json({error: "Ключ клиента не указан"})
        if (secret !== process.env.SECRET) return res.status(401).json({error: "Ключ клиента не верен"})

        const candidate = await User.findOne({email})

        if (!candidate) return res.status(404).json({error: "Пользователь не найден."})

        if (!candidate.isGoogleAuth)
        {
            return res.status(400).json({error: "Нет доступа к авторизации через Google."})
        }


        const payload = {
            _id: candidate._id,
        }

        const token = sign(payload, process.env.SECRET)

        return res.status(200).json({jwt: token, user: candidate})
    }

    async vkAuth(req, res) {
        const {
            pageLink,
            secret,
        } = req.body;

        if (!secret) return res.status(400).json({error: "Ключ клиента не указан"})
        if (secret !== process.env.SECRET) return res.status(401).json({error: "Ключ клиента не верен"})

        const candidate = await User.findOne({pageLink})

        if (!candidate) return res.status(404).json({error: "Пользователь не найден."})

        if (!candidate.isVkAuth)
        {
            return res.status(400).json({error: "Нет доступа к авторизации через VK."})
        }

        const payload = {
            _id: candidate._id,
        }
        const token = sign(payload, process.env.SECRET)
        return res.status(200).json({jwt: token, user: candidate})
    }
})()