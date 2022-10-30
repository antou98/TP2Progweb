"use strict"



function createImg(src,width,height,alt,id){

    let img = document.createElement("img")
    img.src = src
    img.width = width
    img.height =height
    img.alt = alt
    img.id = id

    return img

}

