"use strict"
//Anoh Christian Assanvo/ Antoine Fortier


//génération du html
function afficheInterfaceHtml() {
    let divPrincipal = document.createElement("div")

    divPrincipal.id = "divPrincipal"
    $("body").prepend(divPrincipal)

    // let table = document.createElement("table")
    // table.id = "tablePrincipal"

    $("#divPrincipal").append($("<table>").prop("id", "tablePrincipal"))

    for (let i = 0; i < 3; i++) {
        let tr = $("<tr>").prop("id", "tr" + i)
        $("#tablePrincipal").append(tr)
    }

    //creation de la disposition de la table
    let td1 = $("<td>").prop("colSpan", 2).append(createImg("images/titre.jpg", "677", "92", "Jeu du bonhomme pendu", ""))
    $("#tr0").append(td1)

    let td2 = ($("<td>").prop({
        "id": "dessinTD",
        "rowSpan": "2"
    }).append(createImg("images/bonhomme_pendu_0.jpg", "400", "435", "dessin", "dessin")))
    let td3 = $("<td>").prop("id", "phylactereTD").append(createImg("images/phylactere_intro.jpg", "275", "192", "", "phylactere"))
    $("#tr1").append(td2, td3)


    let td4 = $("<td>").prop("id", "personnageTD").append(createImg("images/personnage_1.jpg", "275", "241", "personnage", "personnage"))
    $("#tr2").append(td4)

    //ajout attribut sur tout les td de la table
    $("table td").attr('align', 'left').attr('valign', 'top');

    //div du mot à deviner

    $("#divPrincipal").append($("<div>").prop("id", "mot_cache"))

    //create span parent for hidden word
    let spanLettreBase = createFirstSpan()
    $("#mot_cache").append(spanLettreBase)

    //div des lettres de l'alphabet
    let div_alphabet = $("<div>").prop("id", "alphabet")

    //création de span lettre pour la div alphabet
    let alphabetTab = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (let i = 0; i < 26; i++) {
        let spanLettre = $("<span>").prop("className", "spanAlphabet")
        let src = `images/lettres/${alphabetTab[i]}.gif`
        spanLettre.append(createImg(src, 18, 35, alphabetTab[i], alphabetTab[i]))
        div_alphabet.append(spanLettre)
    }
    $("#divPrincipal").append(div_alphabet)


    //ajout event listener
    addEventListenersAlphabet()


    //création div joueur info
    let divJoueur = $("<div>").prop("id", "divJoueur")


    $("#divPrincipal").append(divJoueur)
    let spanPointsPossible = $("<span>").prop("id", "pointsPossible")
    spanPointsPossible.append(document.createTextNode("9/9"))

    let paraJoueur = $("<p>").prop("id", "idParaJoueur")


    $("#divJoueur").html("Points possibles : ").append(spanPointsPossible, '<br/>', paraJoueur)

    $("#idParaJoueur").html("Vous avez pris" + '<span> 0 minute</span>' + '<span> 0 seconde</span>' + " pour découvrir " + '<span> 0 mot</span>' + " sur " + '<span> 0 essaie </span>' + ", ce qui vous a donné " + '<span> 0 point.</span>')
    let i = 1
    let spans = document.querySelectorAll("#idParaJoueur > span")
    spans.forEach((span) => {
        span.id = String(i);
        i++;
    })
}

//variable globale à modifier
let MOTS_JEUX = []
let MOT_ACTUEL;
let NB_ESSAIE = 1
let JOUEUR;

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

    let tabIndex = MOT_ACTUEL.contientLettre(lettre)

    //si mot est bon
    if (NB_ESSAIE <= 9 && MOT_ACTUEL.lettresRestantesGET.length === 0) {
        let tab = Array.from(MOT_ACTUEL.mot)
        //lettres verte
        for (let i = 0; i < MOT_ACTUEL.mot.length; i++) {
            let selector = `#lettre_${i}`
            $(selector).prop("src", `images/lettres_verte/${tab[i]}.gif`)
        }
        $("#phylactere").prop("src", "images/phylactere_bravo.jpg")
        //remove event listener
        $(".spanAlphabet").off("click",)
        setTimeout('$("#phylactere").prop("src","images/phylactere_rien.jpg")', 2000);

        JOUEUR.incrementeMotTentative()
        JOUEUR.incrementeMotReussi()
        JOUEUR.pointageTotalAddition()
        //afficheTexteJoueur()
        //réinitialise mots du jeux
        MOTS_JEUX.length === 1 ? initWords() : setTimeout(nextWord, 2000)
        afficheTexteJoueur()
        setTimeout(nextWord, 2000)
    }
    //si dépassé le nombre d'essaie
    else if (NB_ESSAIE >= 9 && MOT_ACTUEL.lettresRestantesGET.length > 0) {
        let tab = Array.from(MOT_ACTUEL.mot)
        //lettres rouge
        for (let i = 0; i < MOT_ACTUEL.mot.length; i++) {
            let selector = `#lettre_${i}`
            $(selector).prop("src", `images/lettres_rouge/${tab[i]}.gif`)
        }
        $("#dessin").prop("src", "images/bonhomme_pendu_9.jpg")
        //remove event listener
        $(".spanAlphabet").off("click",)
        $("#phylactere").prop("src", "images/phylactere_desole.jpg")
        setTimeout('$("#phylactere").prop("src","images/phylactere_rien.jpg")', 2000);
        JOUEUR.decrementePointage()

        JOUEUR.incrementeMotTentative()

        //afficheTexteJoueur()
        //réinitialise mots du jeux
        MOTS_JEUX.length === 1 ? initWords() : setTimeout(nextWord, 2000)
        afficheTexteJoueur()
        setTimeout(nextWord, 2000)


    } else {
        if (tabIndex.length < 1) {
            let pathImg = `images/bonhomme_pendu_${NB_ESSAIE}.jpg`
            $("#dessin").prop("src", pathImg)

            NB_ESSAIE += 1
            JOUEUR.decrementePointage()
            afficheTexteJoueur()

            $("#phylactere").prop("src", "images/phylactere_zut.jpg")
            setTimeout('$("#phylactere").prop("src","images/phylactere_rien.jpg")', 2000);


        } else {
            tabIndex.forEach((num) => {
                let string = `#lettre_${num}`
                $(string).prop("src", `images/lettres_mot/${lettre}.gif`)
                afficheTexteJoueur()

                $("#phylactere").prop("src", "images/phylactere_super.jpg")
                setTimeout('$("#phylactere").prop("src","images/phylactere_rien.jpg")', 2000);
            })
        }
    }
}

//lancement d'un tableau de mot 10 différent
function initWords() {
    let mots_source = []
    let setIndex = new Set()
    //nb de mot dans le jeu
    let nbEssaies = 15

    for (let cle in motsSources) {
        mots_source.push(motsSources[cle])
    }

    do {
        let randomInt = Math.trunc(Math.random() * 15)
        setIndex.add(randomInt)
    } while (setIndex.size < nbEssaies)

    setIndex.forEach((value) => {
        MOTS_JEUX.push(new Mot(mots_source[value]))
    })

    console.log(MOTS_JEUX)
}

//choisi un mot random dans MOTS_JEUX
function pickWord() {

    let random = Math.floor(Math.random() * (MOTS_JEUX.length - 1));
    MOT_ACTUEL = MOTS_JEUX[random];
    MOTS_JEUX.splice(random, 1);
    $("#phylactere").prop("src", "images/phylactere_intro.jpg")
}

//intialise un mot caché
function initHiddenWord() {

    for (let x = 1; x < MOT_ACTUEL.motLength(); x++) {
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
    pickWord()

    $("#mot_cache").append(span)

    initHiddenWord()
    addEventListenersAlphabet()
    $("#dessin").prop("src", `images/bonhomme_pendu_0.jpg`)
    NB_ESSAIE = 1
    JOUEUR.setpointage(9)
}

//fonctions qui gèrent le wink du personnage
function wink() {
    $("#personnage").prop("src", "images/personnage_2.jpg")
    setTimeout(() => {
        $("#personnage").prop("src", "images/personnage_1.jpg")
    }, 400)
    winkLoop();
}

function winkLoop() {
    let delay = Math.floor(Math.random() * 4000) + 2000;
    setTimeout(wink, delay)

}

function afficheTexteJoueur() {
    $('#pointsPossible').html(`${JOUEUR.pointage}/9`)
    let spanIndex = 0;
    let tab = [` ${JOUEUR.minutes} minutes`, ` ${JOUEUR.secondes} secondes`, ` ${JOUEUR.motReussi} mots`, ` ${JOUEUR.motTentative} essaies`, ` ${JOUEUR.pointageTotal} points`]
    let spansPara = document.querySelectorAll("#idParaJoueur span")
    spansPara.forEach((span) => {
        span.innerHTML = tab[spanIndex];
        spanIndex++;
    })
}

/**
 * lancement initial de l'application
 */

function main() {

    JOUEUR = new Joueur();
    afficheInterfaceHtml()
    initWords()
    pickWord()
    initHiddenWord()
    wink()
    $('body').one("click", () => {
        JOUEUR.timer();
    })

}

$(() => {
    main()
})