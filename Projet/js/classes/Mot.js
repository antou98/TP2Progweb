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
        let tabLettre = Array.from(this._lettresRestantes)

        let retIndex = []

        let tabSetLettresRestante = Array.from(this._lettresRestantes)

        for (let i = 0; i < tabLettre.length; i++) {
            if (tabLettre[i] === lettre) {
                retIndex.push(i)
            }
        }
        console.log(retIndex)
        console.log(tabSetLettresRestante)

        let numberTimesConditionFilled = 1
        for (let i = 0; i < retIndex.length; i++) {
            if (i === 0) {
                tabSetLettresRestante.splice(retIndex[i], 1)
            } else {
                let index = retIndex[i] -= numberTimesConditionFilled
                tabSetLettresRestante.splice(index, 1)
                numberTimesConditionFilled++
            }
        }
        console.log(tabSetLettresRestante)
        this._lettresRestantes = tabSetLettresRestante.join("")

        if (retIndex.length === 0) {
            this._nbDeMauvaiseLettresEntrees += 1
        }
        return retIndex;
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

