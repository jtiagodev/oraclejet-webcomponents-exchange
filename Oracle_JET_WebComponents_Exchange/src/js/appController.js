define(["require", "exports", "knockout", "ojs/ojrouter", "./Utils", "ojs/ojarraydataprovider", "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojavatar", "ojs/ojdialog", "ojs/ojtoolbar", "ojs/ojbutton", "ojs/ojmenu", "ojs/ojnavigationlist", "ojs/ojmodule-element"], function (require, exports, ko, Router, Utils, ArrayDataProvider, ResponsiveUtils, ResponsiveKnockoutUtils) {
    "use strict";
    var ControllerViewModel = /** @class */ (function () {
        function ControllerViewModel() {
            var self = this;
            // Router Configuration
            self.router = Router.rootInstance;
            self.router.configure({
                'webComponentsSearch': {
                    label: 'Web Components Search',
                    isDefault: true,
                    value: 'webcomponents/search'
                },
                'login': {
                    label: 'Login',
                    value: 'exchange/login'
                },
                'register': {
                    label: 'Register',
                    value: 'exchange/register'
                },
                'about': {
                    label: 'About',
                    value: 'exchange/about'
                },
                'accelerator': {
                    label: 'OJET Accelerator',
                    value: 'exchange/accelerator'
                },
                'webComponentsCreate': {
                    label: 'Web Components Create',
                    value: 'webcomponents/create'
                },
                'webComponentsEdit': {
                    label: 'Web Components Edit',
                    value: 'webcomponents/edit'
                },
                'webComponentsView': {
                    label: 'Web Components View',
                    value: 'webcomponents/view'
                },
                'profileView': {
                    label: 'Profile View',
                    value: 'profile/view'
                },
                'profileEdit': {
                    label: 'Profile Edit',
                    value: 'profile/edit'
                },
                'events': {
                    label: 'Events',
                    value: 'events/view'
                }
            });
            //Media queries for repsonsive layouts
            var smQuery = ResponsiveUtils.getFrameworkQuery('sm-only');
            if (smQuery) {
                self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            }
            var mdQuery = ResponsiveUtils.getFrameworkQuery('md-up');
            if (mdQuery) {
                self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
            }
            // Header Navigation setup
            var navData = [
                {
                    name: 'Components Exchange',
                    id: 'webComponentsSearch',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
                },
                // {
                //     name: 'Accelerator',
                //     id: 'accelerator',
                //     iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
                // },
                {
                    name: 'Events',
                    id: 'events',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
                },
                {
                    name: 'About',
                    id: 'about',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
                }
            ];
            // Header
            // Application Name used in Branding Area
            self.appName = ko.observable("Community Web Component Exchange");
            // User Info used in Global Navigation area
            self.userName = ko.observable("Jorge Mendes");
            self.loggedIn = ko.observable(true);
            self.loggedInUserInitials = ko.computed(function () {
                var numOfNames = self.userName().split(" ").length;
                return self.userName().split(" ")[0].charAt(0).toUpperCase() + self.userName().split(" ")[numOfNames - 1].charAt(0).toUpperCase();
            }, self);
            // TOP USERS
            self.topRatedUsers = ko.observableArray([{
                    name: " João",
                    company: "Capgemini",
                    country: "Portugal",
                    uploaded: 20
                },
                {
                    name: " Bernardo",
                    company: "Capgemini",
                    country: "France",
                    uploaded: 50
                },
                {
                    name: " Carlos",
                    company: "AMIS",
                    country: "Ukraine",
                    uploaded: 21
                },
                {
                    name: "Dani",
                    company: "Red Samurai",
                    country: "Russia",
                    uploaded: 51
                }
            ]);
            // TOP DOWNLOADERS
            self.topDownloadedComponents = ko.observableArray([{
                    name: "Component 1",
                    timesDownloaded: 20
                },
                {
                    name: "Component 2",
                    timesDownloaded: 50
                },
                {
                    name: "Component 3",
                    timesDownloaded: 21
                },
                {
                    name: "Component",
                    timesDownloaded: 51
                }
            ]);
            // SORT BY UPLOADS
            self.topRatedUsers().sort(function (a, b) { return b.uploaded - a.uploaded; });
            // ADD THE RANKINGS
            var posNumberRatedUsers = 1;
            self.topRatedUsers().forEach(function (elem) {
                elem.position = posNumberRatedUsers;
                posNumberRatedUsers++;
            });
            // SOR BY DOWNLOADS
            self.topDownloadedComponents().sort(function (c, d) { return c.timesDownloaded - d.timesDownloaded; });
            // ADD THE RANKINGS
            var posNumberDownload = 1;
            self.topDownloadedComponents().forEach(function (elem) {
                elem.position = posNumberDownload;
                posNumberDownload++;
            });
            // Dropdown menu states
            self.menuItemSelect = function (event) {
                var selectedOption = event.target;
                switch (selectedOption.value) {
                    case "about":
                        var dialog = document.getElementById('aboutDialog');
                        dialog.open();
                        break;
                    default:
                }
            };
            self.close = function () {
                var dialog = document.getElementById('aboutDialog');
                dialog.close();
            };
            // Change the router state based on selection
            self.navDataSource = new ArrayDataProvider(navData, { keyAttributes: 'id' });
            self.selectionChange = function (event) {
                var newVal = event.detail.value;
                if (newVal !== self.router.stateId()) {
                    self.router.go(newVal);
                }
            };
            // Navigation setup
            var defaultConfig = { view: [], viewModel: Object, cleanupMode: "onDisconnect" };
            self.moduleConfig = ko.observable(defaultConfig);
            Utils.resolveViewAndViewModel(self.router.moduleConfig.name(), self.moduleConfig, 'none');
            // When router state changes, load the new modules
            var currentRouterSelection = self.router.moduleConfig.name;
            currentRouterSelection.subscribe(function (name) {
                Utils.resolveViewAndViewModel(name, self.moduleConfig, 'none');
            });
            // Footer
            self.footerLinks = [
                new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
            ];
        }
        return ControllerViewModel;
    }());
    var footerLink = /** @class */ (function () {
        function footerLink(name, linkId, linkTarget) {
            this.name = name;
            this.linkId = linkId;
            this.linkTarget = linkTarget;
        }
        return footerLink;
    }());
    return ControllerViewModel;
});
//# sourceMappingURL=appController.js.map