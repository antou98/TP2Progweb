"use strict"


function createImg(src, width, height, alt, id) {
    let img = document.createElement("img")
    img.src = src
    img.alt = alt
    img.id = id

    if (width === 0 && height === 0) {
        console.log("span")
    } else {
        img.width = width
        img.height = height
    }

    return img
}


function createFirstSpan() {
    let retSpan = document.createElement("span")
    retSpan.id = "hiddenLetter0"
    retSpan.append(createImg("images/lettres_mot/underscore.gif", 0, 0, "_", "lettre_0"))

    return retSpan
}
