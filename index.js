// ==UserScript==
// @name         Booru图片标签按钮
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Booru图片标签按钮,在Moepi代码上修改
// @author       Moepi
// @match        *://*/*
// @grant        none
// ==/UserScript==
(function () {
    "use strict";
    const imgLink = "https://i.imgur.com/tLvFC8H.png";
    const drawButton = () => {
        let btn = document.createElement("span");
        btn.style.background = "transparent";
        const img = document.createElement("img");
        btn.style.marginBottom = "10px";
        img.src = imgLink;
        img.width = 20;
        img.height = 20;
        btn.appendChild(img);
        img.style.cursor = "pointer";
        return btn;
    };
    const flicker = (btn) => {
        btn.style.filter = "invert(1)";
        setTimeout(() => {
            btn.style.filter = "none";
        }, 100);
    };
    const danbooru = () => {
        let elem = document.querySelector("#tag-list");
        let btn = drawButton();
        btn.onclick = () => {
            let tagList = document.querySelectorAll("a.search-tag");
            let tags = [];
            tagList.forEach((tag) => {
                tags.push(tag.innerText);
            });
            navigator.clipboard.writeText(tags.join(", "));
            flicker(btn);
        };
        elem.prepend(btn);
    };
    const gelbooru = () => {
        // handle tag
        let elem = document.querySelector(".tag-list");
        let btn = drawButton();
        btn.style.marginLeft = "13px";
        const tagTypes = [
            ".tag-type-artist",
            ".tag-type-character",
            ".tag-type-copyright",
            ".tag-type-metadata",
            ".tag-type-general",
        ];
        btn.onclick = () => {
            let tags = [];
            for (let i = 0; i < tagTypes.length; i++) {
                const listItem = document.querySelectorAll(tagTypes[i]);
                listItem.forEach((l) => {
                    const tagList = l.querySelectorAll("a");
                    tagList.forEach((tag) => {
                        if (tag.innerText === "?") return;
                        tags.push(tag.innerText);
                    });
                });
            }
            navigator.clipboard.writeText(tags.join(", "));
            flicker(btn);
        };
        elem.prepend(btn);

        // handle thumbnail-preview
        let previewImage = document.querySelectorAll(".thumbnail-preview");
        for (let i = 0; i < previewImage.length; i++) {
            previewImage[i].style.position = "relative";
            const image = previewImage[i].querySelector("a > img");
            const title = image.getAttribute("title");
            const btn = document.createElement("button");
            btn.id = "Btn" + "index" + i;
            btn.innerHTML = "标签" + i;
            btn.value = title;
            btn.style.width = "50px";
            btn.style.height = "20px";
            btn.style.lineHeight = "20px";
            btn.style.position = "absolute";
            btn.style.left = "50%";
            btn.style.top = "-10px";
            btn.style.transform = "translateX(-50%)";
            btn.style.fontSize = "10px";
            btn.style.borderRadius = "12px";
            btn.style.backgroundColor = "rgba(232, 122, 144, 0.8)";
            btn.style.border = "none";
            btn.style.boxShadow = "rgba(232, 122, 144, 0.8)";
            btn.style.color = "rgb(255, 255, 255)";
            btn.onclick = (event) => {
                console.log(event.target);
                let str = event.target.value;
                str = str.replace(/\s+/g, ", ");
                str = "masterpiece, best quality" + str;
                _copy(str);
            };
            previewImage[i].append(btn);
        }
    };
    const konachan = () => {
        let elem = document.querySelector("#tag-sidebar");
        let btn = drawButton();
        btn.style.marginTop = "10px";
        btn.style.marginBottom = "10px";
        btn.onclick = () => {
            let tags = [];
            let tagList = document.querySelectorAll(".tag-link");
            tagList.forEach((listItem) => {
                const tag = listItem.getAttribute("data-name");
                tags.push(tag.replaceAll("_", " "));
            });
            navigator.clipboard.writeText(tags.join(", "));
            flicker(btn);
        };
        elem.prepend(btn);
    };
    const yandere = () => {
        let elem = document.querySelector("#tag-sidebar");
        let btn = drawButton();
        btn.style.marginTop = "10px";
        btn.style.marginBottom = "10px";
        const tagTypes = [
            ".tag-type-artist",
            ".tag-type-character",
            ".tag-type-copyright",
            ".tag-type-metadata",
            ".tag-type-general",
        ];
        btn.onclick = () => {
            let tags = [];
            for (let i = 0; i < tagTypes.length; i++) {
                const listItem = document.querySelectorAll(tagTypes[i]);
                listItem.forEach((l) => {
                    const tagList = l.querySelectorAll("a");
                    const tag = tagList[tagList.length - 1];
                    tags.push(tag.innerText);
                });
            }
            navigator.clipboard.writeText(tags.join(", "));
            flicker(btn);
        };
        elem.prepend(btn);
    };
    const sankaku = () => {
        let elem = document.querySelector("#tag-sidebar");
        let btn = drawButton();
        btn.style.marginTop = "10px";
        btn.style.marginBottom = "10px";
        const tagTypes = [
            ".tag-type-artist",
            ".tag-type-character",
            ".tag-type-copyright",
            ".tag-type-meta",
            ".tag-type-general",
            ".tag-type-studio",
            ".tag-type-medium",
            ".tag-type-genre",
        ];
        btn.onclick = () => {
            let tags = [];
            for (let i = 0; i < tagTypes.length; i++) {
                const listItem = document.querySelectorAll(tagTypes[i]);
                listItem.forEach((l) => {
                    const tagList = l.querySelectorAll("a");
                    const tag = tagList[0];
                    tags.push(tag.innerText);
                });
            }
            navigator.clipboard.writeText(tags.join(", "));
            flicker(btn);
        };
        elem.prepend(btn);
    };
    const _copy = (value) => {
        const myInput = document.createElement("input");
        myInput.value = value;
        myInput.id = "MyInput";
        document.body.appendChild(myInput);
        // Get the text field
        const copyText = document.getElementById("MyInput");
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        // Alert the copied text
        console.log("Copied the text: " + copyText.value);
        document.body.removeChild(myInput);
    };
    if (window.location.href.includes("danbooru")) danbooru();
    if (window.location.href.includes("gelbooru.com")) gelbooru();
    if (window.location.href.includes("konachan")) konachan();
    if (window.location.href.includes("lolibooru")) konachan();
    if (window.location.href.includes("yande.re")) yandere();
    if (window.location.href.includes("safebooru")) yandere();
    if (window.location.href.includes("aibooru")) danbooru();
    if (window.location.href.includes("e621")) danbooru();
    if (window.location.href.includes("rule34")) yandere();
    if (window.location.href.includes("sankakucomplex")) sankaku();
})();
