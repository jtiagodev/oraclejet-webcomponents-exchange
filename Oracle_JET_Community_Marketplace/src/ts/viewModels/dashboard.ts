/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
import * as ko from "knockout";

import {ojInputText} from "ojs/ojinputtext";
import {ojNavigationList} from "ojs/ojnavigationlist";
import {ojButton} from "ojs/ojbutton";
import {ojSelectOne, ojCombobox} from "ojs/ojselectcombobox";

import "ojs/ojinputtext";
import "ojs/ojnavigationlist";
import "ojs/ojbutton";
import "ojs/ojselectcombobox";


class DashboardViewModel {
    public marketplacetitle: KnockoutObservable<string>;
    public categoryText: KnockoutObservable<string>;
    public updatedText: KnockoutObservable<string>;
    public userText: KnockoutObservable<string>;
    public ratingText: KnockoutObservable<string>;
    public companieNameText: KnockoutObservable<string>;
    public votesText: KnockoutObservable<string>;
    public downloadTimesText: KnockoutObservable<string>;
    public keywordsPlaceholder: KnockoutObservable<string>;
    public infoText: KnockoutObservable<string>;
    public loginButtonText: KnockoutObservable<string>;
    public downloadButtonText: KnockoutObservable<string>;
    public searchButtonText: KnockoutObservable<string>;
    public something: KnockoutObservableArray<string>;
    public keywordsValue: KnockoutObservable<BigInteger | undefined>;
    public sortValue: KnockoutObservable<string | undefined>;

    constructor() {
        let self = this;
            // Texts
            self.marketplacetitle = ko.observable("Some Component");
            self.categoryText = ko.observable("A.I. > Chatbots");
            self.updatedText = ko.observable("v1.0 (Update 24-05-2010)");
            self.userText = ko.observable("Soham Saputa");
            self.ratingText = ko.observable("3.5/5");
            self.companieNameText = ko.observable("Capgemini Portugal");
            self.votesText = ko.observable("24035 votes");
            self.downloadTimesText = ko.observable("Downloaded 3425 times");
            self.keywordsPlaceholder = ko.observable('Find a Web Component...');
            self.downloadButtonText = ko.observable('DOWNLOAD');
            self.searchButtonText = ko.observable('SEARCH');
            self.keywordsValue = ko.observable();
            self.sortValue = ko.observable();

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