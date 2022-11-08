"use strict"
import {QUnit} from "../lib/qunit/qunit-2.19.3";

let mot = new Mot("allo")



QUnit.module('Test de la fonction additionner', function(hooks) {
    hooks.before( function() {
        // prepare something once for all tests
        console.log("avant tous les tests additionner ...");
    });

    hooks.beforeEach( function() {
        // prepare something before each test
        console.log("avant chaque test additionner...");
    });

    QUnit.test('two numbers', function(assert) {
        assert.equal(add(1, 2), 3);
    });

    QUnit.test('two others numbers', function(assert) {
        assert.equal(add(4, 3), 7);
    });

    QUnit.test('two others numbers, test fail!', function(assert) {
        assert.equal(add(6, 9), 16);
    });
});


