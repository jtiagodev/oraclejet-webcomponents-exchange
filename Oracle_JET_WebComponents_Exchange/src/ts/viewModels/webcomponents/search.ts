/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
import * as ko from "knockout";
//import Utils = require('./Utils');
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import ResponsiveKnockoutUtils = require('ojs/ojresponsiveknockoututils');

import {ojInputText} from "ojs/ojinputtext";
import {ojNavigationList} from "ojs/ojnavigationlist";
import {ojButton} from "ojs/ojbutton";
import {ojSelectOne, ojCombobox} from "ojs/ojselectcombobox";
import {ojMessages} from "ojs/ojmessages";

import "ojs/ojmessages";
import "ojs/ojinputtext";
import "ojs/ojnavigationlist";
import "ojs/ojbutton";
import "ojs/ojselectcombobox";


class DashboardViewModel {
    marketplacetitle: KnockoutObservable<string>;
    categoryText: KnockoutObservable<string>;
    updatedText: KnockoutObservable<string>;
    userText: KnockoutObservable<string>;
    ratingText: KnockoutObservable<string>;
    companieNameText: KnockoutObservable<string>;
    votesText: KnockoutObservable<string>;
    downloadTimesText: KnockoutObservable<string>;
    keywordsPlaceholder: KnockoutObservable<string>;
    infoText: KnockoutObservable<string>;
    loginButtonText: KnockoutObservable<string>;
    downloadButtonText: KnockoutObservable<string>;
    searchButtonText: KnockoutObservable<string>;
    something: KnockoutObservableArray<string>;
    keywordsValue: KnockoutObservable<BigInteger | undefined>;
    sortValue: KnockoutObservable<string | undefined>;
    public messages: KnockoutObservable<{ category: string; severity: string; detail: string; autoTimeout: number; }[]>;
    treta: KnockoutObservableArray<KnockoutObservable<{ category: string; severity: string; detail: string; autoTimeout: number; }[]>>;
    navDataCategories: ArrayDataProvider<string, object>;
    components: KnockoutObservableArray<object>;
    smScreen: KnockoutObservable<boolean>;
    mdScreen: KnockoutObservable<boolean>;
    downloadButton: KnockoutObservable<string>;
    searchComponents: ojButton['onOjAction'];


    constructor() {
        let self = this;
            // Texts
            self.marketplacetitle = ko.observable("Some Component");
            self.categoryText = ko.observable("A.I. > Chatbots");
            self.updatedText = ko.observable("v1.0 (Update 24-05-2010)");
            self.userText = ko.observable(" Mister Crowley");
            self.ratingText = ko.observable("3.5/5");
            self.companieNameText = ko.observable("Capgemini Portugal");
            self.votesText = ko.observable("24035 votes");
            self.downloadTimesText = ko.observable("Downloaded 3425 times");
            self.keywordsPlaceholder = ko.observable('Find a Web Component...');
            self.downloadButtonText = ko.observable('DOWNLOAD');
            self.searchButtonText = ko.observable('SEARCH');
            self.keywordsValue = ko.observable();
            self.sortValue = ko.observable();

            self.messages = ko.observable(
                [{
                        category: 'MARKETPLACE UNDER DEVELOPMENT',
                        severity: 'warning',
                        detail: 'Report any issues/bugs to info@dtrgroup.org',
                        autoTimeout: 5000
                    }
                ]
            );

                    //Media queries for repsonsive layouts
        let smQuery = ResponsiveUtils.getFrameworkQuery('sm-only');
        if (smQuery) {
            self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        }
        let mdQuery = ResponsiveUtils.getFrameworkQuery('md-up');
        if (mdQuery) {
            self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
        }

        self.searchComponents = function() {
            self.components.removeAll();
                self.components.push({
                    title: "Some Component",
                    category: "AI > Chatbots",
                    updated: "v1.0 (Updated 24.05.2018)",
                    image: "teste",
                    companylogo: "cap_logo",
                    username: "Mister Crowley",
                    usercountry: "France",
                    rating: "3.5",
                    companyname: "Capgemini",
                    votes: "2352",
                    downloads: "325"
                });
                self.components.push({
                    title: "Some Component #2",
                    category: "Maps > Google",
                    updated: "v1.0 (Updated 24.05.2018)",
                    image: "teste",
                    companylogo: "cap_logo",
                    username: "Bon Jovi",
                    usercountry: "Portugal",
                    rating: "4.5",
                    companyname: "Red Samurai",
                    votes: "2352",
                    downloads: "325"
                });
        };

            let categories = [
                {
                    name: 'Artificial Intelligence',
                    id: 'ai',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
                },
                {
                    name: 'Maps',
                    id: 'maps',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
                },
                {
                    name: 'Forms',
                    id: 'forms',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
                }
            ];
            self.navDataCategories = new ArrayDataProvider(categories, { keyAttributes: 'id' });

        self.downloadButton = ko.observable('Download');

        // TOP USERS
        self.components = ko.observableArray([]);

    }

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here. 
     * This method might be called multiple times - after the View is created 
     * and inserted into the DOM and after the View is reconnected 
     * after being disconnected.
     */
    connected(): void {
        // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    disconnected(): void {
        // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    transitionCompleted(): void {
        // Implement if needed
    };

}
export = DashboardViewModel;