import {googleAuth, loginPassword, vkAuth} from "./lib/authorize.js"
import users_me from "./lib/me.js";
import {getToken, setToken} from "./lib/tokenManager.js";

if (getToken()) {
    let me = await users_me(getToken())

    if (me.user) {
        window.location.href = "/profile.html"
    }
}

// alert('sdsd'
VK.init({
    apiId: 8124000
});

const onBtnClick = async () => {
    let login=document.getElementById('login')
    let password=document.getElementById('password')
    let data = await loginPassword(login.value, password.value)
    //console.log(data)
    if (data.status) {
        let code = prompt("Код: ")
        let data2 = await data.continueFunction(code)

        if (data2.error) {
            alert(`Ошибка: ${data2.error}`)
        }
        else {
            alert(`Привет, ${data2.user.login}`)
            setToken(data2.jwt, document.querySelector("#formCheck-1").checked)
            window.location.href = "/profile.html"

        }
    }
}

document.querySelector("#login_btn").addEventListener("click", onBtnClick)

let auth2;
gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
        client_id: '736073772441-1936f471tnaafmatsdsl85of74rqe2du.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
    });
    attachSignin(document.getElementById('googleAu'));
});

function attachSignin(element) {
        auth2.attachClickHandler(element, {},
            async function(googleUser) {
                console.log("Signed in: " + googleUser.getBasicProfile().getName());
                console.log(await googleAuth(googleUser.getBasicProfile().getEmail()))
            }
        );
}
async function vkLogin(){
    VK.Auth.login(
        async function (response) {
            if (response.status === 'connected') { // авторизация прошла успешно
                var user = response.session.user; //  информация о пользователе
                let resp = await vkAuth(user.href)

                if (resp.error) {
                    alert(`Ошибка: ${resp.error}`)
                }
                else {
                    alert(`Привет, ${resp.user.login}`)
                    setToken(resp.jwt,false)
                    window.location.href = "/profile.html"

                }
                /*
                 user.first_name - имя;
                 user.last_name - фамилия;
                 user.href - ссылка на страницу в формате https://vk.com/domain;
                 user.id  - идентификатор пользователя;
                 user.nickname -  отчество или никнейм (если указано);
                 */

            } else if (response.status === 'not_authorized') { // пользователь авторизован в ВКонтакте, но не разрешил доступ приложению;

            } else if (response.status === 'unknown') { // пользователь не авторизован ВКонтакте.
            }
        },
        // права доступа (integer)
        // допустимые значения:
        // AUDIO:8
        // FRIENDS:2
        // MATCHES:32
        // PHOTOS:4
        // QUESTIONS:64
        // VIDEO:16
        // WIKI:128
        // VK.access.PHOTOS
    );
}

document.querySelector("#vklogin").addEventListener("click", vkLogin)
