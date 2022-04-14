import express from "express";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export default (Model, overrideGet, overrideCreate, overrideUpdate, overrideDelete) => {
    const router = express.Router()

    // Create
    router.post("/", [authMiddleware, roleMiddleware("ADMIN")], async (req, res) => {
        if (overrideCreate) {
            return await overrideCreate(req, res);
        }
        else {
            try {
                let obj = new Model(req.body)

                await obj.save()

                return res.status(200).json(obj)
            } catch (e) {
                console.error(e)
                return res.status(500).json({error: "Ошибка сервера смотрите консоль"})
            }
        }
    })

    // Read
    router.get("/", [authMiddleware], async (req, res) => {
        if (overrideGet) {
            return await overrideGet(req, res)
        }
        else {
            try {
                let data = await Model.find()
                let filters = req.query;
                let filtered = data.filter(i => {
                    let isValid = true;
                    for (let key in filters) {
                        isValid = isValid && i[key] === filters[key];
                    }
                    return isValid;
                });
                return res.status(200).json(filtered)
            } catch (e) {
                console.error(e)
                return res.status(500).json({error: "Ошибка сервера смотрите консоль"})
            }
        }
    })

    // Update
    router.patch("/:id",[authMiddleware, roleMiddleware("ADMIN")], async (req, res) => {
        if (overrideUpdate) {
            return await overrideUpdate(req, res)
        }
        else {
            try {
                let resp = await Model.findByIdAndUpdate(req.params.id, req.body, {})

                if (!resp) {
                    return res.status(404).json({error: "Не найдено"})
                }

                return res.status(200).json({ok: true})
            } catch (e) {
                console.error(e)
                return res.status(500).json({error: "Ошибка сервера смотрите консоль"})
            }
        }
    })

    // Delete
    router.delete("/:id", [authMiddleware, roleMiddleware("ADMIN")], async (req, res) => {
        if (overrideDelete) {}
        else {
            try {
                let resp = await Model.findByIdAndDelete(req.params.id, req.body, {})

                if (!resp) {
                    return res.status(404).json({error: "Не найдено"})
                }

                return res.status(200).json({ok: true})
            } catch (e) {
                console.error(e)
                return res.status(500).json({error: "Ошибка сервера смотрите консоль"})
            }
        }
    })

    return router
}