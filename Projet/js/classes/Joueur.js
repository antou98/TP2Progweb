"use strict"
//Anoh Christian Assanvo/ Antoine Fortier
class Joueur{
    constructor() {
        this._secondes = 0
        this._minutes = 0
        this._motTentative =0
        this._motReussi = 0
        this._pointage = 9
        this._pointageTotal =0

    }


    get secondes() {
        return this._secondes;
    }



    get minutes() {
        return this._minutes;
    }



    get motTentative() {
        return this._motTentative;
    }

    incrementeMotTentative() {
        this._motTentative++
    }

    get motReussi() {
        return this._motReussi;
    }

    incrementeMotReussi() {
        this._motReussi++
    }

    get pointage() {
        return this._pointage;
    }


    setpointage(value) {
        this._pointage = value;
    }

    decrementePointage() {
        this._pointage--;
    }


    get pointageTotal() {
        return this._pointageTotal;
    }

    pointageTotalAddition(){
        this._pointageTotal +=this._pointage
    }

    timer(){
        setTimeout(()=>{

            if (this._secondes<59){
                this._secondes+=1
            }
            else {
                this._minutes+=1
                this._secondes=0
            }
            console.log(`${this._minutes} : ${this._secondes}`);
            this.timer()

        },999)


    }
}