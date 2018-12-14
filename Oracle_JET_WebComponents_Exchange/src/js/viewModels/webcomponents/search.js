define(["require", "exports", "knockout", "ojs/ojarraydataprovider", "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojmessages", "ojs/ojinputtext", "ojs/ojnavigationlist", "ojs/ojbutton", "ojs/ojselectcombobox"], function (require, exports, ko, ArrayDataProvider, ResponsiveUtils, ResponsiveKnockoutUtils) {
    "use strict";
    var DashboardViewModel = /** @class */ (function () {
        function DashboardViewModel() {
            var self = this;
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
            self.messages = ko.observable([{
                    category: 'MARKETPLACE UNDER DEVELOPMENT',
                    severity: 'warning',
                    detail: 'Report any issues/bugs to info@dtrgroup.org',
                    autoTimeout: 5000
                }
            ]);
            //Media queries for repsonsive layouts
            var smQuery = ResponsiveUtils.getFrameworkQuery('sm-only');
            if (smQuery) {
                self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            }
            var mdQuery = ResponsiveUtils.getFrameworkQuery('md-up');
            if (mdQuery) {
                self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
            }
            self.searchComponents = function () {
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
            var categories = [
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
        DashboardViewModel.prototype.connected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        DashboardViewModel.prototype.disconnected = function () {
            // Implement if needed
        };
        ;
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        DashboardViewModel.prototype.transitionCompleted = function () {
            // Implement if needed
        };
        ;
        return DashboardViewModel;
    }());
    return DashboardViewModel;
});
//# sourceMappingURL=search.js.map