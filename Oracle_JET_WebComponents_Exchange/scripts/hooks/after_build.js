/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
const fs = require('fs');
const archiver = require('archiver');

// CALLED ON "ojet biuld --release"
module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
   console.log("Running after_build hook.");
   resolve();

   // BABEL TRANSPILER - JOAO.ABREU
  //  const exec = require('child_process').exec;
  //  console.log('Transpiling code.');
  //  exec('npm run babel', (error, stdout, stderr) => {
  //    if (error) {
  //      reject(error);
  //    };

  //    console.log('Code transpilation finished');
  //    exec('npm run babel-ojet', (error, stdout, stderr) => {
  //     if (error) {
  //       reject(error);
  //     };
  
  //     console.log('Code transpilation (core) finished');
  //     console.log('Applying Autoprefixers.');
  //     exec('npm run postcss', (error, stdout, stderr) => {
  //       if (error) {
  //         reject(error);
  //       };
    
  //       console.log('Autoprefixing finished');
  //       resolve();
  //     });
  //   });
   
  });
};