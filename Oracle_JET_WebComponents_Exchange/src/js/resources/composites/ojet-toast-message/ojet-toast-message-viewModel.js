/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojL10n!./resources/nls/ojet-toast-message-strings'], function (oj, ko, $, componentStrings) {

    
    function ExampleComponentModel(context) {
        var self = this;
        /*  
        self.category = ko.observable();
        var message = document.getElementById('toast-message');
        if(message.classList == null){
            message.classList.add('atr-info-toast');
        }
        */

        context.props.then(function (propertyMap) {
            if (propertyMap.severity == "error") {
                message.className.replace(message.className, 'atr-error-toast');
                if(propertyMap.category == null) {
                    self.category("ERROR LOADING SERVICES");
                } else {
                    self.category(propertyMap.category);
                }
            } else if (propertyMap.severity == "info") {
                message.className.replace(message.className, 'atr-info-toast');
                if(propertyMap.category == null) {
                    self.category("INFO LOADING SERVICES");
                } else {
                    self.category(propertyMap.category);
                }
            } else if (propertyMap.severity == "warning"){
                message.className.replace(message.className, 'atr-warning-toast');
                if(propertyMap.category == null) {
                    self.category("WARNING LOADING SERVICES");
                } else {
                    self.category(propertyMap.category);
                }
            } else if (propertyMap.severity == "confirmation"){
                message.className.replace(message.className, 'atr-confirmation-toast');
                if(propertyMap.category == null) {
                    self.category("SUCCESS LOADING SERVICES");
                } else {
                    self.category(propertyMap.category);
                }
            }

        });
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnect = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
});