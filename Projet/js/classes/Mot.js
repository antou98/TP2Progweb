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

        for (let i = 0; i < this._mot.length; i++) {
            if (this._mot[i] === lettre) {
                retIndex.push(i)
            }
        }
        //appel
        this.lettrePasContenueDansMot(retIndex)
        this.moifieLettreRestante(lettre)

        return retIndex;
    }

    //ajoute 1 si la lettre sélectionné est mal
    lettrePasContenueDansMot(tab) {
        if (tab.length === 0) {
            this._nbDeMauvaiseLettresEntrees += 1
        }
    }


    moifieLettreRestante(lettreRecu) {
        let tabSetLettresRestante = Array.from(this._lettresRestantes)
        let retTab = tabSetLettresRestante.filter(item => item != lettreRecu)
        this._lettresRestantes = retTab.join("")
    }

    resetAttributes() {
        this._nbDeMauvaiseLettresEntrees = 0
        this._lettresRestantes = this._mot
    }
    lettreTousDemandee(){
        let bool = false;
        this._lettresRestantes.length === 0? bool =true:bool=false;
        return bool
    }
}


function test() {
    let mot = new Mot("allo");
    console.log(mot)

    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)

    mot.contientLettre("t")

    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)

    mot.contientLettre("l")
    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)

    mot.contientLettre("a")
    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)

    mot.contientLettre("t")
    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)

    mot.contientLettre("o")
    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)

    mot.contientLettre("y")
    console.log(mot.lettresRestantesGET)
    console.log(mot.nbLettreMauvaiseGET)


}

test()

