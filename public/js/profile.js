
let main = () => {
    let login = document.querySelector("#username")
    let email = document.querySelector("#email")
    let vk = document.querySelector("#vk")
    let auth = document.querySelector("#auth")
    let roles = document.querySelector("#roles")

    login.value = user.login;
    email.value = user.email;
    vk.value = user.pageLink;
    auth.value = `VK: ${user.isVkAuth ? "Да" : "Нет"}, Google: ${user.isGoogleAuth ? "Да" : "Нет"}`
    roles.value = user.roles.map(i => i.display_name).join(', ')
}

if (!window.user)
    document.addEventListener("authorize", main)
else main()