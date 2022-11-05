"use strict"
import {QUnit} from "../lib/qunit/qunit-2.19.3";

let mot = new Mot("allo")


QUnit.test('a test', function (assert) {
    assert.equal(mot.contientLettre("l"),'[1,2]',"should return true")
});
