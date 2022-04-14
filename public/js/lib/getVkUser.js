
// export default async (pageID) => {
//     let url = `http://api.vk.com/method/users.get?users_ids=${pageID}&fields=photo_200,status&name_case=nom`
//     let resp = await fetch(url, {headers: {
//         authorization: `Bearer 37ab1ad237ab1ad237ab1ad2e137dccecd337ab37ab1ad25737c6049ac5dffb93538d93`
//         }})
//     console.log(resp.status)
//     let data = await resp.text()
//
//     return data
// }

export default (pageID) => new Promise((rs, rj) => {
    VK.api("users.get", {user_ids: [pageID], fields: ["photo_200", "status"], name_case: "nom"}, rs)
})