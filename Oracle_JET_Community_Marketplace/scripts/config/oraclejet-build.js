/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
/**
 * # oraclejet-build.js
 * This script allows users to configure and customize the grunt build tasks. 
 * Configurable tasks include: 
 *   copySrcToStaging
 *   copyCustomLibsToStaging
 *   injectTheme
 *   injectPaths
 *   uglify
 *   requireJs
 *   sass 
 * To configure a task, uncomment the corresponding sections below, and pass in your configurations. 
 * Any options will be merged with default configuration found in node_modules/@oracle/oraclejet-tooling/lib/defaultconfig.js
 * Any fileList options will replace the corresponding option defined by the default configuration in its entirety - ie. arrays are not merged.
 */

module.exports = function () {
  return {

/**
 * # copyCustomLibsToStaging
 * This task copies any custom libraries that are not provided by JET to staging directory.
 * This task supports a single option: fileList. The fileList option defines an array of file objects. 
 * Each file object contains the following properties: 
 *   cwd, current working directory
 *   dest, destination path
 *   src, array of source file patterns
 *   rename, function to return the full path of desired destination
 * If a fileList value is specified, it completely replaces the default fileList value defined by JET
 * Example: {cwd: 'app', src: ['**', '!test.js'], dest: 'staging',  rename: function (dest, file) {return renamed path}}
 */
    // copyCustomLibsToStaging: {
    //  fileList: [
    //   {
    //     cwd:'node_modules/oraclejet/',
    //     src: ['*'],
    //     dest: 'web/js/libs/oraclejet'
    //   }
    //  ]
    // }

/**
 * # copySrcToStaging
 * This task copies all source files and libraries to staging directory.
 * This task supports a single option: fileList. The fileList option defines an array of file objects. 
 * See descriptions and example in copyCustomLibsToStaging for configuring the fileList.
 */
    // copySrcToStaging: {
    //   fileList: [],
    // },

/**
 * # injectTheme
 * This task injects css stylesheet links for the current theme into index.html using the injection start and end markers defined below.
 */
    // injectTheme: {
    //   startTag: '<!-- injector:theme -->',
    //   endTag: '<!-- endinjector -->'
    // }

/**
 * # injectPaths
 * Configuration for path injection during build in release mode
 * This task reads the release paths from the mainReleasePaths json file and injects the path configuration in main.js when run in release mode.
 */
    // injectPaths: paths => ({
    //  startTag: '//injector:mainReleasePaths',
    //  endTag: '//endinjector',
    //  mainJs: 'path to mainjs',
    //  destMainJs: 'path to the inject destination',
    //  mainReleasePaths: 'path to the main-release-paths.json'
    // }),

/**
 * # uglify
 * This task minifies source files and libraries that don't have minified distributions. 
 * It runs only when build in release mode. Support input of fileList that contains an array of file objects. 
 * See the example in copyCustomLibsToStaging for configuring the fileList.
 * See detailed uglify options at https://github.com/mishoo/UglifyJS
 */
    // ONLY WORKS ON ojet build --release
    // NOTE JOABREU: This minifies with UglifyJS, missing options and it seems to skip the build for all remaining files
    /*
     uglify: {
       fileList: [
        {
            cwd:'src/js/',
            src: ['resources/audit/*', 'resources/bundles/*', 'resources/common/*', 'resources/dc/*', 'resources/logger/*', 'resources/router/*', 'resources/utils/*',
            'resources/nls/da/*', 'resources/nls/de/*', 'resources/nls/en/*', 'resources/nls/es/*', 'resources/nls/fi/*', 'resources/nls/fr/*', 'resources/nls/it/*', 'resources/nls/nl/*', 'resources/nls/no/*', 'resources/nls/pt/*', 'resources/nls/sv/*', 'resources/nls/*',
            'main.js', 'appController.js',
            'jet-composites/ojet-errorloading/*', 'jet-composites/ojet-errorloading/resources/nls/*',
            'jet-composites/ojet-loading/*', 'jet-composites/ojet-loading/resources/nls/*',
            'jet-composites/ojet-selectone/*', 'jet-composites/ojet-selectone/resources/nls/*',
            'jet-composites/ojet-subnavigation/*', 'jet-composites/ojet-subnavigation/resources/nls/*',
            'jet-composites/ojet-table/*', 'jet-composites/ojet-table/resources/nls/*',
            'jet-composites/ojet-tables/*', 'jet-composites/ojet-tables/resources/nls/*',
            'jet-composites/ojet-text/*', 'jet-composites/ojet-tables/text/nls/*',
            'jet-composites/ojet-toast-message/*', 'jet-composites/ojet-toast-message/text/nls/*',
            'viewModels/pr/attribute/*', 'viewModels/pr/localproduct/*', 'viewModels/pr/masterproduct/*', 'viewModels/pr/productclass/*', 'viewModels/rk/tasklist/*'
              ],
            dest: 'web/js'
        }

        ],
       options: {}
     },
     */

/**
 * # requireJs
 * This task runs requirejs optimizer to bundle all scripts in to a large minified main.js for release. 
 * It runs only when build in release mode.
 * The task mirrors the configuration in this link https://github.com/gruntjs/grunt-contrib-requirejs
 */
    // requireJs: {
    //   baseUrl: 'path to the js directory in staging area',
    //   name: 'the main.js file name',
    //   mainConfigFile: `the main configuration file`,
    //   optimize: 'option for optimize',
    //   out: 'output file path'
    // },

/**
 * # sass
 * This task runs sass compile for scss files.
 * It takes a fileList as input, see copyCustomLibsToStaging section for examples of fileList
 * See detailed node sass options available here https://github.com/sass/node-sass
 */
/*
     sass: {
       fileList: [
       {
        cwd:'src/css/',
        src: ['app2.scss'],
        dest: 'web/css' 
       }
      ],
       options: {}
     }, 
*/
/**
 * This is the web specific configuration. You can specify configurations targeted only for web apps. 
 * The web specific configurations will override the general configuration. 
 */
    web: {
      copyCustomLibsToStaging: {
        fileList: []
      }
    }, 

/**
 * This is the hybrid specific configuration. You can specify configurations targeted only hybrid apps. 
 * The hybrid specific configurations will override the general configuration. 
 */
    hybrid: {
    // copyCustomLibsToStaging: {
    //  fileList: [
    //   {
    //     cwd:'node_modules/oraclejet/',
    //     src: ['*'],
    //     dest: 'hybrid/www/js/libs/oraclejet'
    //   }
    //  ]
    // }
    }
  };
};
