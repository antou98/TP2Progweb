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

    //creation de la disposition de la table
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
    //ajout attribut sur tout les td de la table
    $("table td").attr('align', 'left').attr('valign', 'top');

    //div du mot à deviner
    let divMot_cache = document.createElement("div");
    divMot_cache.id = "mot_cache"
    $("#divPrincipal").append(divMot_cache)

    //create span parent for hidden word
    let spanLettreBase = createFirstSpan()
    $("#mot_cache").append(spanLettreBase)

    //div des lettres de l'alphabet
    let div_alphabet = document.createElement("div")
    div_alphabet.id = "alphabet"

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


    //ajout event listener
    addEventListenersAlphabet()



    ///////////////////////////////////////////////////
    //button pour tester à déroulement effacer
    let buttonTest = document.createElement("button")
    buttonTest.id = "buttonTest"
    buttonTest.textContent = "test"
    $("body").append(buttonTest)
    buttonTest.addEventListener("click", nextWord)
    ///////////////////////////////////////////////////
}

function main() {
    createHTML()
    initWords()

}

//add event listener sur les lettres de l'alphabet
function addEventListenersAlphabet(){
    $(".spanAlphabet").one("click",function (e){
        e.currentTarget.className = "spanAlphabetClicked"

        let lettreClicker = e.currentTarget.firstChild.id

        console.log(this)

        afficheLettre(lettreClicker)
    })
}


function afficheLettre(lettre){
    console.log(lettre)
    console.log(currentWord.mot)
    let tabIndex = currentWord.contientLettre(lettre)
    console.log(tabIndex)
    for(let index of tabIndex){
        let string = `hiddenLetter${index}`
        console.log(string)
        let span = document.getElementById(string)
        console.log(span)
        span.replaceChildren()

        console.log()
        let image = createImg(`../images/lettres/${lettre}.gif`,0,0,lettre,lettre)
        span.append(image)

    }







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

//choisi un mot random dans MOTS_JEUX
function pickWord() {
    if (MOTS_JEUX.length === 0) {
        //affiche le résultat
    }

    let random = Math.floor(Math.random() * (MOTS_JEUX.length - 1));
    currentWord = new Mot(MOTS_JEUX[random]);
    MOTS_JEUX.splice(random, 1);

}

//intialise un mot caché
function initHiddenWord() {
    console.log(currentWord.motLength())
    for (let x = 1; x < currentWord.motLength(); x++) {
        let newHiddenLetter = document.getElementById("hiddenLetter0").cloneNode(true);
        newHiddenLetter.firstChild.id = `lettre_${(x)}`;
        newHiddenLetter.id = `hiddenLetter${(x)}`;
        document.getElementById("mot_cache").appendChild(newHiddenLetter);
    }
}

//initialise un nouveau mot
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


main()