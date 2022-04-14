
export default async (token) => {
    try {
        let resp = await fetch("/users/me", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        let data = await resp.json()

        if (data.error) {
            return {error: data.error, user: undefined}
        }
        else {
            return {error: undefined, user: data}
        }
    }
    catch (e) {
        console.error(e)
        return {error: "Ошибка сервера", user: undefined}
    }

}