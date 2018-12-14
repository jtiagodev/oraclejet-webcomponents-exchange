/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

requirejs.config(
  {
    baseUrl : '../../js',
    // Path mappings for the logical module names
    paths :
        {
          'knockout': 'libs/knockout/knockout-3.4.2.debug',
          'jquery': 'libs/jquery/jquery-3.3.1',
          'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
          'promise': 'libs/es6-promise/es6-promise',
          'hammerjs': 'libs/hammer/hammer-2.0.8',
          'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
          'ojs': 'libs/oj/v6.0.0/debug',
          'ojL10n': 'libs/oj/v6.0.0/ojL10n',
          'ojtranslations': 'libs/oj/v6.0.0/resources',
          'text': 'libs/require/text',
          'signals': 'libs/js-signals/signals',
          'customElements': 'libs/webcomponents/custom-elements.min',
          'css': 'libs/require-css/css'
        }
      ,
      // Shim configurations for modules that do not expose AMD
      shim :
        {
          'jquery' :
            {
              exports : ['jQuery', '$']
            },
          'simulate' :
            {
              deps : ['jquery']
            },
          'test' :
            {
              deps : ['jquery', 'knockout', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojcomponentcore']
            }
        }
    }
  );

  require(['ojs/ojcore', 'knockout', '../tests/js/test-functions', 'ojs/ojknockout'],
    function (oj, ko, tests)
    {
      $(function ()
      {
        QUnit.load();
        QUnit.start();

        // Dev #1
        QUnit.module("ATRADIUS - POWERFUL TEST SUITE");
        QUnit.test("Testing Basics #1", function( assert ) {
          var now = "2008/01/28 22:25:00";
          assert.equal(tests.prettyDate(now, "2008/01/28 22:24:30"), "just now");
          assert.equal(tests.prettyDate(now, "2008/01/28 22:23:30"), "1 minute ago");
          assert.equal(tests.prettyDate(now, "2008/01/28 21:23:30"), "1 hour ago");
          assert.equal(tests.prettyDate(now, "2008/01/27 22:23:30"), "Yesterday");
          assert.equal(tests.prettyDate(now, "2008/01/26 22:23:30"), "2 days ago");
          assert.equal(tests.prettyDate(now, "2007/01/26 22:23:30"), undefined);
        });

        // Dev #2
        QUnit.test("Testing Basics #2", function( assert ) {
          function date(then, expected) {
            assert.equal(tests.prettyDate("2008/01/28 22:25:00", then), expected);
          }
          date("2008/01/28 22:24:30", "just now");
          date("2008/01/28 22:23:30", "1 minute ago");
          date("2008/01/28 21:23:30", "1 hour ago");
          date("2008/01/27 22:23:30", "Yesterday");
          date("2008/01/26 22:23:30", "2 days ago");
          date("2007/01/26 22:23:30", undefined);
        });

        // Dev #3
          QUnit.test("Testing Basics #3", function (assert)
          {
            var done = assert.async();
            assert.expect(1);
            assert.ok(true);
            done();
        });
    });
  });