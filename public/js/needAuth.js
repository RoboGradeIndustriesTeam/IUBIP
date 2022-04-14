import user_me from "./lib/me.js";
import {getToken} from "./lib/tokenManager.js";

export const onAuthorize = new Event('authorize')

if (getToken() === undefined) {
    window.location.href = "/login.html";
} else {
    let me = await user_me(getToken());

    if (me.error) {
        window.location.href = "/login.html";
    }

    window.user = me.user;
    document.dispatchEvent(onAuthorize)

}