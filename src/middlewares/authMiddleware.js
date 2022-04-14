import pkg from 'jsonwebtoken';
const {verify} = pkg;
import {User} from "../db/models.js";

export default async (req, res, next) => {
    const auth_header = req.headers.authorization;

    if (!auth_header) return res.status(400).json({error: "Хедер авторизации не предоставлен."})

    const auth_token = auth_header.split(" ")[1]

    if (!auth_token) return res.status(400).json({error: "Хедер авторизации не предоставлен."})

    try {
        const data = verify(auth_token, process.env.SECRET)

        if (!data) return res.status(400).json({error: "Хедер авторизации не предоставлен."})

        const candidate = await User.findOne({id_: data._id})
        // Что ты делаешь, это middleware для проверки авторизации
        // aconst candidate =await  User.findOne()
        if (!candidate) return res.status(401).json({error: "Хедер авторизации не верен."})

        req.user = candidate;

        next()
    }
    catch (e) {
        return res.status(400).json({error: "Хедер авторизации не предоставлен."})
    }
}