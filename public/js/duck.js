(() => {
    if (document.querySelector(".duckDiv")) return;
    const duckStyle = document.createElement("style");
    duckStyle.textContent = `.duckDiv {
    all: revert;
    margin: 0;
    padding: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999999;
    background: radial-gradient(ellipse at left bottom, #eee3, transparent, transparent);
    -webkit-tap-highlight-color: transparent;
  }

  .duck {
    all: revert;
    cursor: pointer;
    margin: 10px;
    padding: 0;
    padding-bottom: 2px;
    text-shadow: 0 0 15px #fff;
    text-align: left;
    user-select: none;
    font-weight: 900;
    background: -webkit-linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 600% 600%;
    -webkit-text-stroke-color: #6663;
    -webkit-text-stroke-width: .5px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: duckGradient 15s ease infinite;
    transition: 0.2s;
  }

  @keyframes duckGradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }`;
    let dcount = 0;
    const quak = ["Ender", "BrainTor", "__AG__", "EverDrunky"]
    const duck = document.createElement("pre");
    duck.className = "duck";
    duck.style.lineHeight = "2vh";
    duck.style.fontSize = "2vh";
    duck.textContent = `  
   w
__(o)>    
\\___)`;
    const randomQuak = (time = Math.random() * 8000 + 4000) => {
        setTimeout(randomQuak, time);
        if (duck.dataset.clicked) return;
        duck.dataset.clicked = true;
        duck.innerText = duck.innerText.replace(')>    ', ')< ' + quak[Math.floor(Math.random() * quak.length)]);
        setTimeout(() => {
            duck.innerText = duck.innerText.replace(/\)\<.+/, ')>    ');
            duck.dataset.clicked = ''
        }, 800);
    }
    setTimeout(randomQuak, Math.random() * 8000 + 4000);
    let timer = 0;
    const clear = () => {
        duck.style.lineHeight = "2vh";
        duck.style.fontSize = "2vh";
        dcount = 0;
        duck.textContent = `   _
__(.)>    
\\___)`;
    }
    duck.onmousedown = ({target: e}) => {
        timer = setTimeout(clear, 1000);
        if (e.dataset.clicked) return;
        const t = quak[Math.floor(Math.random() * quak.length)]
        if (dcount > 8) {
            dcount = 0;
        }
        if (dcount == 4) e.innerText = e.innerText.replace('.', 'o');
        if (dcount == 8) e.innerText = e.innerText.replace(' _', ' w');
        e.dataset.clicked = true;
        const size = +e.style.fontSize.replace("vh", "") + 0.1;

        e.style.lineHeight = size + "vh";
        e.style.fontSize = size + "vh";
        e.innerText = e.innerText.replace('>    ', '< ' + t);
        if (size > 3) {
            e.style.lineHeight = "2vh";
            e.style.fontSize = "2vh";
        }
        setTimeout(() => {
            e.innerText = e.innerText.replace(/<.+/, '>    ');
            setTimeout(() => e.dataset.clicked = '', 50);
        }, 300);
    }
    duck.ontouchstart = () => timer = setTimeout(clear, 1000);
    duck.onmouseup = () => clearTimeout(timer);
    duck.onmouseleave = () => clearTimeout(timer);
    duck.ontouchend = () => clearTimeout(timer);
    const duckDiv = document.createElement("div")
    duckDiv.className = "duckDiv"
    duckDiv.ondblclick = e => e.stopPropagation();
    document.head.appendChild(duckStyle)
    duckDiv.appendChild(duck)
    document.body.appendChild(duckDiv)
})()