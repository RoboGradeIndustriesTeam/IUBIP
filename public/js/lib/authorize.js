
const loginPassword = async (login, password) => {
    try {
        let loginResp = await fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login,
                password
            })
        })

        let loginData = await loginResp.json()

        if (loginData.error) {
            return {error: loginData.error, status: false, continueFunction: undefined}
        }
        else {
            return {error: undefined, status: true, continueFunction: async (code) => {
                    let emailResp = await fetch("/users/emailCode", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email_code: code
                        })
                    })

                    let emailData = await emailResp.json()

                    if (emailData.error) {
                        return {error: emailData.error, status: false, user: undefined, jwt: undefined}
                    }
                    else {
                        return {error: undefined, status: true, user: emailData.user, jwt: emailData.jwt}
                    }
                }
            }
        }

    }
    catch (e) {
        return {error: undefined, status: false, continueFunction: undefined}

    }
}

let secret = "IUBIPTOP"

const vkAuth = async (pageLink) => {
    let loginResp = await fetch("/users/vkAuth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pageLink,
            secret
        })
    })

    let loginData = await loginResp.json()

    if (loginData.error) {
        return {error: loginData.error, user: undefined, jwt: undefined}
    }
    else {
        return {error: undefined, user: loginData.user, jwt: loginData.jwt}
    }
}

const googleAuth = async (email) => {
    console.log(email)
}

export {
    loginPassword,
    vkAuth,
    googleAuth
}