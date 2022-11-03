"use strict"
//Anoh Christian Assanvo/ Antoine Fortier


//génération du html
function afficheInterfaceHtml() {
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
            td1.id = "dessinTD"
            let td2 = document.createElement("td")
            td2.id = "phylactereTD"
            td1.rowSpan = 2
            td1.append(createImg("images/bonhomme_pendu_0.jpg", "400", "435", "dessin", "dessin"))
            td2.append(createImg("images/phylactere_intro.jpg", "275", "192", "", "phylactere"))
            this.append(td1, td2)
        } else if (indexTD === 2) {
            let td = document.createElement("td")
            td.id = "personnageTD"
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

//variable globale à modifier
let MOTS_JEUX = []
let currentWord;
let NB_ESSAIE = 1

//add event listener sur les lettres de l'alphabet
//et réintialise les classe des lettres de l'alphabet lors du relancement des listener
function addEventListenersAlphabet() {
    let clickedSpans = document.querySelectorAll(".spanAlphabetClicked")
    clickedSpans.forEach((e) => {
        e.className = "spanAlphabet"
    })

    $(".spanAlphabet").off("click",).one("click", function (e) {
        //function anonyme qui ajoute les event listeners
        e.currentTarget.className = "spanAlphabetClicked"

        let lettreClicker = e.currentTarget.firstChild.id

        afficheLettre(lettreClicker)
    })
}

//affiche lettre clické
function afficheLettre(lettre) {

    let tabIndex = currentWord.contientLettre(lettre)
    console.log(tabIndex)


    if (NB_ESSAIE <= 9 && currentWord.lettresRestantesGET.length === 0) {
        for (let i = 0; i < currentWord.mot.length; i++) {
            let selector = `#lettre_${i}`
            let tab = Array.from(currentWord.mot)
            $(selector).prop("src", `images/lettres_verte/${tab[i]}.gif`)

        }
        //document.body.addEventListener("click",nextWord,true)


    }
    //si dépassé le nombre d'essaie
    else if (NB_ESSAIE >= 9 && currentWord.lettresRestantesGET.length > 0) {
        for (let i = 0; i < currentWord.mot.length; i++) {
            let selector = `#lettre_${i}`
            let tab = Array.from(currentWord.mot)
            $(selector).prop("src", `images/lettres_rouge/${tab[i]}.gif`)
            $("#dessin").prop("src", "images/bonhomme_pendu_9.jpg")

        }
        //ajoute event listener qui change au prochain mot à la fin de selection
        //document.body.addEventListener("click",nextWord,true)


    } else {
        if (tabIndex.length < 1) {
            let pathImg = `images/bonhomme_pendu_${NB_ESSAIE}.jpg`
            console.log(pathImg)
            $("#dessin").prop("src", pathImg)
            NB_ESSAIE += 1
            console.log(NB_ESSAIE)


        } else {
            tabIndex.forEach((num) => {
                let string = `#lettre_${num}`
                console.log($(string))
                $(string).prop("src", `images/lettres_mot/${lettre}.gif`)

            })
        }
    }
}

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
    addEventListenersAlphabet()
    $("#dessin").prop("src", `images/bonhomme_pendu_0.jpg`)
    NB_ESSAIE = 1
}

//lancement
function main() {
    afficheInterfaceHtml()
    initWords()

}

$(() => {
    main()
})