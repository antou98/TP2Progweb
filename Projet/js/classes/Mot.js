"use strict"

//Anoh Christian Assanvo/ Antoine Fortier

class Mot {
    constructor(mot) {
        this._mot = mot
        this._lettresRestantes = mot
        this._nbDeMauvaiseLettresEntrees = 0
    }

    get mot() {
        return this._mot
    }

    get lettresRestantesGET() {
        return this._lettresRestantes
    }

    get nbLettreMauvaiseGET() {
        return this._nbDeMauvaiseLettresEntrees
    }


    motLength() {
        return this._mot.length
    }

    //retourne tableau de lettres
    contientLettre(lettre) {
        let tabLettre = Array.from(this._mot)

        let retIndex = []

        for (let i = 0; i < tabLettre.length; i++) {
            if (tabLettre[i] === lettre) {
                retIndex.push(i)
            }
        }
        this.lettreContenueDansMot(retIndex)
        this.moifieLettreRestante(retIndex)

        return retIndex;
    }

    //ajoute 1 si la lettre sélectionné est mal
    lettreContenueDansMot(tab) {
        if (tab.length === 0) {
            this._nbDeMauvaiseLettresEntrees += 1
        }
    }


    moifieLettreRestante(tab) {
        let tabSetLettresRestante = Array.from(this._lettresRestantes)
        let numberTimesConditionFilled = 1

        for (let i = 0; i < tab.length; i++) {
            //enlève la première trouver
            if (i === 0) {
                tabSetLettresRestante.splice(tab[i], 1)
            }
            //enlève les autres à l'aide du nombre de fois que la condition est remplie qui incrémente à chaque fois
            else {
                let index = tab[i] - numberTimesConditionFilled
                tabSetLettresRestante.splice(index, 1)
                numberTimesConditionFilled++
            }
        }
        console.log(tabSetLettresRestante)
        this._lettresRestantes = tabSetLettresRestante.join("")
    }

    resetAttributes() {
        this._nbDeMauvaiseLettresEntrees = 0
        this._lettresRestantes = this._mot
    }
}


function test() {
    let mot = new Mot("allllyyllello");
    console.log(mot)

    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)

    mot.contientLettre("t")

    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)

    mot.contientLettre("l")
    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)


}

test()

