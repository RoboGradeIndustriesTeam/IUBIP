import { Order } from "../db/models.js"

export default new (class {
    async expert(req, res) {
        const {
            orderID
        } = req.body

        if (!orderID) return res.status(400).json({ error: "ID Заказа не указан." })

        const candidate = await Order.findOne({ _id: orderID })

        if (!candidate) return res.status(404).json({ error: "Заказ не найден." })

        if (!candidate.status === "approved") return res.status(400).json({ error: "Нельзя сменить статус на Готово с данного статуса." })

        candidate.status = "complete";

        await candidate.save()
        return res.status(200).json(candidate)
    }

    async seller(req, res) {
        const {
            orderID,
            new_status
        } = req.body
        if (!orderID) return res.status(400).json({ error: "ID Заказа не указан." })
        if (new_status !== "approved" && new_status !== "not_approved") return res.status(400).json({ error: "new_status может иметь значения: approved или not_approved." })

        const candidate = await Order.findOne({ _id: orderID })

        if (!candidate) return res.status(404).json({ error: "Заказ не найден." })

        if (!candidate.status === "in_waiting") return res.status(400).json({ error: "Нельзя сменить статус с данного статуса." })

        candidate.status = new_status;

        await candidate.save()
        return res.status(200).json(candidate)
    }
})()
