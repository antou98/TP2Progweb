"use strict"


import {QUnit} from "../lib/qunit/qunit-2.19.1";

let mot = new Mot("allo")



QUnit.module('Test de la contient lettre', function(hooks) {
    hooks.before( function() {

        console.log("");
    });

    hooks.beforeEach( function() {

        console.log("");
    });

    QUnit.test('retourne indice 1 et 2', function(assert) {
        assert.equal(mot.contientLettre("l"),[1,2]);
    });

    QUnit.test('retourne indice 0', function(assert) {
        assert.equal(mot.contientLettre("a"),[0]);
    });

    QUnit.test('retourne auncun indice', function(assert) {
        assert.equal(mot.contientLettre("a"),[]);
    });
});


