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

    let spanLettre0 = createFirstSpan()
    $("#mot_cache").append(spanLettre0)

    let buttonTest = document.createElement("button")
    buttonTest.id ="buttonTest"
    buttonTest.textContent = "test"

    $("body").append(buttonTest)

    buttonTest.addEventListener("click",nextWord)


}

function main(){
    createHTML()
    initWords()

}
let MOTS_JEUX =[]
let currentWord ;
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

function nextWord(){

    let span = createFirstSpan()
    let mot_cache = document.getElementById("mot_cache")
    while (mot_cache.firstChild){
        mot_cache.removeChild(mot_cache.lastChild)
    }
    $("#mot_cache").append(span)
    pickWord()
    initHiddenWord()


}


main()