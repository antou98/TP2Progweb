"use strict"




let mot = new Mot("allo")



//test function contient lettre
QUnit.test('retourne indice 1 et 2', function(assert) {
    let num = mot.contientLettre("l")
    let test =num.join("")
    console.log(test)
    assert.equal(test,"12",'devrait retourner 2 indices');
});

QUnit.test('retourne indice 0', function(assert) {
    let num = mot.contientLettre("a")
    let test =num.join("")
    console.log(test)
    assert.equal(test,"0",'devrait retourner 2 indices');

});

QUnit.test('retourne auncun indice', function(assert) {
    let num = mot.contientLettre("f")
    let test =num.join("")
    console.log(test)
    assert.equal(test,"",'devrait retourner 2 indices');
});

//test function qui retourne la longeur du mot
QUnit.test('fonctionne  si la longeur du mot est de 4', function(assert) {

    assert.equal(mot.motLength(),4,'retoune vrai si la longeur du mot est de 4');
});

QUnit.test('fonctionne si la longeur du mot est de 4', function(assert) {

    assert.notEqual(mot.motLength(),5,'retoune vrai si la longeur du mot est de 4');
});

//test function qui test si il reste des lettres dans le mot ou non
QUnit.test('fonctionne si la tous les lettres non pas été demandé', function(assert) {

    assert.false(mot.lettreTousDemandee(),'devrait retourner faux');
});
QUnit.test('fonctionne si la tous les lettres ont été demandé', function(assert) {
    //j'enlève la dernière lettre du mot
    mot.contientLettre("o")
    assert.true(mot.lettreTousDemandee(),'devrait retourner vrai');
});

//test function permet de tester la function qui retourne le nb de lettre mauvaise fonctionne
QUnit.test('fonctionne égale au nombre de lettre demandé', function(assert) {
    //j'enlève la dernière lettre du mot
    mot.contientLettre("y")
    assert.equal(mot.nbLettreMauvaiseGET,1,'fonctionne si le nb est égal au nb de lettre deja utilisé (1 ici)');
});
QUnit.test('fonctionne égale au nombre de lettre demandé', function(assert) {
    //j'enlève la dernière lettre du mot
    mot.contientLettre("t")
    mot.contientLettre("u")

    assert.equal(mot.nbLettreMauvaiseGET,3,'fonctionne si le nb est égal au nb de lettre deja utilisé (3 ici)');
});
// QUnit.module('Test de la contient lettre', function(hooks) {
//     hooks.before( function() {
//
//         console.log("");
//     });
//
//     hooks.beforeEach( function() {
//
//         console.log("");
//     });
//
// });


