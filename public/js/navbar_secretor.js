
let main = () => {
    let expeditor = [
        "#accordionSidebar > li:nth-child(1) > div:nth-child(4)",
        "#accordionSidebar > li:nth-child(1) > a:nth-child(5)"
    ].map((selector) => document.querySelector(selector))

    let seller = [
        "#accordionSidebar > li:nth-child(1) > div:nth-child(7)",
        "#accordionSidebar > li:nth-child(1) > a:nth-child(8)"
    ].map((selector) => document.querySelector(selector))

    let warehouse = [
        "#accordionSidebar > li:nth-child(3) > a:nth-child(1)",
        "#accordionSidebar > li:nth-child(3) > a:nth-child(3)"
    ].map((selector) => document.querySelector(selector))

    let always = [
        // "#accordionSidebar > li:nth-child(1) > a:nth-child(9)",
        // "#accordionSidebar > li:nth-child(3) > a:nth-child(2)"
    ].map((selector) => document.querySelector(selector))

    always.forEach(i => i.style.display = "none")

    let isExpeditor = user.roles.map(i => i.system_name).indexOf("EXPEDITOR") !== -1
    let isSeller = user.roles.map(i => i.system_name).indexOf("SELLER") !== -1
    let isWarehouse = user.roles.map(i => i.system_name).indexOf("WAREHOUSEWORKER") !== -1

    if (!isExpeditor) expeditor.forEach(i => i.style.display = "none")
    if (!isSeller) seller.forEach(i => i.style.display = "none")
    if (!isWarehouse) warehouse.forEach(i => i.style.display = "none")
}


if (!window.user)
    document.addEventListener("authorize", main)
else main()