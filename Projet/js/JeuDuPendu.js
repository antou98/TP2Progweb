"use strict"
//Anoh Christian Assanvo/ Antoine Fortier


//génération du html
function createHTML() {
    let divPrincipal = document.createElement("div")

    divPrincipal.id = "divPrincipal"
    $("body").prepend(divPrincipal)

    let table = document.createElement("table")
    table.id = "tablePrincipal"

    $("#divPrincipal").append(table)

    for (let i = 0; i < 3; i++) {
        $("#tablePrincipal").append("<tr>")
    }

    let indexTD = 0
    $("tr").each(function () {
        if (indexTD === 0) {
            let td = document.createElement("td")
            td.colSpan = 2
            td.append(createImg("images/titre.jpg", "677", "92", "Jeu du bonhomme pendu", ""))
            this.append(td)
        } else if (indexTD === 1) {
            let td1 = document.createElement("td")
            let td2 = document.createElement("td")
            td1.rowSpan = 2
            td1.append(createImg("images/bonhomme_pendu_0.jpg", "400", "435", "dessin", "dessin"))
            td2.append(createImg("images/phylactere_intro.jpg", "275", "192", "", "phylactere"))
            this.append(td1, td2)
        } else if (indexTD === 2) {
            let td = document.createElement("td")
            td.append(createImg("images/personnage_1.jpg", "275", "241", "personnage", "personnage"))
            this.append(td)
        }

        indexTD++
    })

    $("table td").attr('align', 'left').attr('valign', 'top');

    //reste à ajouter les divs pour lettre et le mot
    let divMot_cache = document.createElement("div");
    divMot_cache.id = "mot_cache"
    $("#divPrincipal").append(divMot_cache)

    //create span parent for hidden word
    let spanLettreBase = createFirstSpan()
    $("#mot_cache").append(spanLettreBase)

    let div_alphabet = document.createElement("div")
    div_alphabet.id = "alphabet"

//exemple du  html qui doit être généré

    //<span style="margin-right:10px;">
    // <a href="#" onClick="javascript:letterCheck('a',0,event)" id="link_a">
    // <img src="images/lettres/a.gif" alt="Lettre A" width="18" height="35" border="0" id="a"/>
    // </a>
    // </span>


    //création de span lettre pour la div alphabet
    let alphabetTab = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (let i = 0; i < 26; i++) {
        let spanLettre = document.createElement("span")
        spanLettre.className = "spanAlphabet"

        let src = `images/lettres/${alphabetTab[i]}.gif`
        spanLettre.append(createImg(src, 18, 35, alphabetTab[i], alphabetTab[i]))
        div_alphabet.append(spanLettre)


    }
    $("#divPrincipal").append(div_alphabet)


    //button pour tester
    let buttonTest = document.createElement("button")
    buttonTest.id = "buttonTest"
    buttonTest.textContent = "test"

    $("body").append(buttonTest)

    buttonTest.addEventListener("click", nextWord)


}

function main() {
    createHTML()
    initWords()

}

//variable globale à modifier
let MOTS_JEUX = []
let currentWord;


//lancement des fonctions du jeu
function initWords() {
    let mots_source = []
    let setIndex = new Set()
    let nbEssaies = 7


    for (let cle in motsSources) {
        mots_source.push(motsSources[cle])
    }

    do {
        let randomInt = Math.trunc(Math.random() * 15)
        setIndex.add(randomInt)
    } while (setIndex.size < nbEssaies)

    setIndex.forEach((value) => {
        console.log(value)
        MOTS_JEUX.push(mots_source[value])
    })
    pickWord()
    initHiddenWord()

}

function pickWord() {
    if (MOTS_JEUX.length === 0) {
        //affiche le résultat
    }

    let random = Math.floor(Math.random() * (MOTS_JEUX.length - 1));
    currentWord = new Mot(MOTS_JEUX[random]);
    MOTS_JEUX.splice(random, 1);

}

function initHiddenWord() {
    console.log(currentWord.motLength())
    for (let x = 1; x < currentWord.motLength(); x++) {
        let newHiddenLetter = document.getElementById("hiddenLetter0").cloneNode(true);
        newHiddenLetter.firstChild.id = `lettre_${(x)}`;
        newHiddenLetter.id = `hiddenLetter${(x)}`;
        document.getElementById("mot_cache").appendChild(newHiddenLetter);
    }
}

function nextWord() {

    let span = createFirstSpan()
    let mot_cache = document.getElementById("mot_cache")
    while (mot_cache.firstChild) {
        mot_cache.removeChild(mot_cache.lastChild)
    }
    $("#mot_cache").append(span)
    pickWord()
    initHiddenWord()


}


$(() => main())