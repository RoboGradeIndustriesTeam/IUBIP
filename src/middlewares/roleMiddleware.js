
export default (roleName) => async (req, res, next) => {
    if (!req.user) {
        console.error("При использование roleMiddleware перед ним нужно выполнять authMiddleware.")
        return res.status(500).json({error: "Ошибка сервера, посмотрите консоль."})
    }

    if (req.user.roles.map(i => i.system_name).indexOf(roleName) === -1) return res.status(401).json({error: "У вас нету доступа."})

    next()
}