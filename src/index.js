import express from "express";
import {connect} from "./db/db.js"
import {Role, User} from "./db/models.js";
import {config} from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import pkg from "bcryptjs"
import fileRouter from "./routers/fileRouter.js";
import orderRouter from "./routers/orderRouter.js";
const {compareSync, genSaltSync, hashSync} = pkg;

config()

await connect(process.env.MONGO)

export let def_roles = [
    {
        system_name: "USER",
        display_name: "Пользователь"
    },
    {
        system_name: "ADMIN",
        display_name: "Администратор"
    },
    {
        system_name: "WAREHOUSEWORKER",
        display_name: "Работник склада"
    },
    {
        system_name: "EXPEDITOR",
        display_name: "Экспедитор"
    },
    {
        system_name: "SELLER",
        display_name: "Продавец"
    },
]

if ((await User.find()).length === 0) {
    let roles = [];

    for await (let i of def_roles) {
        let candidate = await Role.findOne({system_name: i.system_name})

        if (candidate) {
            roles.push(candidate)
        }
        else {
            let new_obj = new Role(i)

            await new_obj.save()

            roles.push(new_obj)
        }
    }

    await (new User({
        login: "admin",
        password: hashSync("admin", genSaltSync()),
        roles,
        email: process.env.SMTP_USER,
        pageLink: "https://vk.com/maxim295"
    })).save()
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use("/users", userRouter)
app.use("/files", fileRouter)
app.use("/orders", orderRouter)

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Express started on ${process.env.HOST}:${process.env.PORT}`))
