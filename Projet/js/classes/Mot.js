"use strict"
let MOTS_JEUX =[]
let currentWord
function initWords(){
    let mots_source = []
    let setIndex = new Set()
    let nbEssaies =7


    for (let cle in motsSources){
        mots_source.push(motsSources[cle])
    }

    do {
        let randomInt = Math.trunc(Math.random()*15)
        setIndex.add(randomInt)
    }while (setIndex.size<nbEssaies)

    setIndex.forEach((value)=>{
        console.log(value)
        MOTS_JEUX.push(mots_source[value])
    })
    pickWord()
}

function pickWord() {
    if (MOTS_JEUX.length === 0) {
        //affiche le résultat
    }
    console.log(MOTS_JEUX)
    let random = Math.floor(Math.random() * (MOTS_JEUX.length - 1));
    currentWord = MOTS_JEUX[random];
    MOTS_JEUX.splice(random, 1);
    console.log(currentWord)
    console.log(MOTS_JEUX)
}

function initHiddenWord() {
    for (let x = 1; x <= nbLetters - 1; x++) {
        var newHiddenLetter = document.getElementById("hiddenLetter0").cloneNode(true);
        newHiddenLetter.firstChild.id = "lettre_" + x;
        newHiddenLetter.id = "hiddenLetter" + x;
        document.getElementById("mot_cache").appendChild(newHiddenLetter);
    }
}