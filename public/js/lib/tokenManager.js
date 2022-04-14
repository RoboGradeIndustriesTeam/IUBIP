
const getToken = () => {
    let session = sessionStorage.getItem("token")
    let local = localStorage.getItem("token")

    let token;

    if (session) {
        token = session
    }
    else if (local) {
        token = local
    }

    return token
}

const setToken = (token, remember) => {
    let storage = remember ? localStorage : sessionStorage;

    storage.clear()

    storage.setItem("token", token)

    return getToken()
}

export {
    setToken,
    getToken
}