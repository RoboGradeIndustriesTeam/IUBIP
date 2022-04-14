
let main = () => {
    console.log(user)
    document.querySelector("#content > nav > div > ul > li > div > a > img").style.display = "none"
    document.querySelector("#content > nav > div > ul > li > div > a > span").innerText = user.login
    document.querySelector("#content > nav > div > ul > li > div > div > a:nth-child(3)").addEventListener("click", () => {
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = "/login.html"
    })
}


if (!window.user)
    document.addEventListener("authorize", main)
else main()