/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */


import * as ko from "knockout";
import Router = require("ojs/ojrouter");
import Utils = require('./Utils');
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import ResponsiveKnockoutUtils = require('ojs/ojresponsiveknockoututils');


//###Component imports###
import { ojDialog } from "ojs/ojdialog";
import { ojMenu } from "ojs/ojmenu";
import { ojNavigationList } from 'ojs/ojnavigationlist';
import { ojModule } from 'ojs/ojmodule-element';
import { ojButton } from 'ojs/ojbutton';
import { ojOption} from 'ojs/ojoption';
import { ojAvatar } from "ojs/ojavatar";


// this is for requiring the actual component
import "ojs/ojavatar";
import "ojs/ojdialog";
import "ojs/ojtoolbar";
import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojnavigationlist";
import "ojs/ojmodule-element";
import { oj } from "@oracle/oraclejet";

class ControllerViewModel {
    router: Router;
    smScreen: KnockoutObservable<boolean>;
    mdScreen: KnockoutObservable<boolean>;
    moduleConfig: KnockoutObservable<ojModule['config']>;
    appName: KnockoutObservable<string>;
    userName: KnockoutObservable<string>;
    navDataSource: ArrayDataProvider<string, object>;
    drawerParams: object;
    footerLinks: Array<object>;
    menuButtonClass: KnockoutComputed<Array<string>>;
    menuItemSelect: ojMenu['onOjAction'];
    close: ojButton['onOjAction'];
    selectionChange: ojNavigationList<string, object>['onSelectionChanged'];
    loggedIn: KnockoutObservable<boolean>;
    loggedInUserInitials: KnockoutObservable<string>;
    topRatedUsers: KnockoutObservableArray<{ name: string; company: string; country: string; uploaded: number; position?: number; }>;
    topDownloadedComponents: KnockoutObservableArray<{ position?: number; name: string; timesDownloaded: number; }>;

    constructor() {
        let self = this;
        self.router = Router.rootInstance;
        self.router.configure({
            'webComponentsSearch': {
                label: 'Web Components Search',
                isDefault: true,
                value: 'webcomponents/search'
            },
            'login': {
                label: 'Login',
                value: 'marketplace/login'
            },
            'register': {
                label: 'Register',
                value: 'marketplace/register'
            },
            'about': {
                label: 'About',
                value: 'marketplace/about'
            },
            'accelerator': {
                label: 'OJET Accelerator',
                value: 'marketplace/accelerator'
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
            }
        });

        //Media queries for repsonsive layouts
        let smQuery = ResponsiveUtils.getFrameworkQuery('sm-only');
        if (smQuery) {
            self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        }
        let mdQuery = ResponsiveUtils.getFrameworkQuery('md-up');
        if (mdQuery) {
            self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
        }

        // Navigation setup
        let navData = [
            {
                name: 'Marketplace',
                id: 'webComponentsSearch',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
            },
            {
                name: 'Accelerator',
                id: 'accelerator',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
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
        self.userName = ko.observable("jorge.mendes@capgemini.com");
        self.loggedIn = ko.observable(true);
        self.loggedInUserInitials = ko.observable("JA");

        // TOP USERS
        self.topRatedUsers = ko.observableArray([{
            name: " João",
            company: "Capgemini",
            country: "Portugal",
            uploaded: 20
        },
        {
            name: " Bernardo",
            company: "CROSS",
            country: "France",
            uploaded: 50
        },
        {
            name: " Carlos",
            company: "LIDL",
            country: "Ukraine",
            uploaded: 21
        },
        {
            name: "Dani",
            company: "Maroscas LDA",
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
    self.topRatedUsers().sort((a, b) => b.uploaded - a.uploaded);
    // ADD THE RANKINGS
    let posNumberRatedUsers: number = 1;
    self.topRatedUsers().forEach(elem => {
        elem.position = posNumberRatedUsers;
        posNumberRatedUsers++;
    }
        );

    // SOR BY DOWNLOADS
    self.topDownloadedComponents().sort((c, d) => c.timesDownloaded - d.timesDownloaded);
    // ADD THE RANKINGS
    let posNumberDownload: number = 1;
    self.topDownloadedComponents().forEach(elem => {
        elem.position = posNumberDownload;
        posNumberDownload++;
    }
        );
        // Dropdown menu states
        self.menuItemSelect = function(event) {
            let selectedOption = event.target as ojOption;
            switch (selectedOption.value) {
                case "about":
                    let dialog = document.getElementById('aboutDialog') as ojDialog;
                    dialog.open();
                    break;
                default:
            }
        };

        self.close = function() {
            let dialog = document.getElementById('aboutDialog') as ojDialog;
            dialog.close();
        }

        // Change the router state based on selection
        self.navDataSource = new ArrayDataProvider(navData, { keyAttributes: 'id' });
        self.selectionChange = (event) => {
            let newVal = event.detail.value;
            if (newVal !== self.router.stateId()) {
                self.router.go(newVal);
            }
        }

        // Navigation setup
        let defaultConfig: ojModule['config'] = { view: [], viewModel: Object, cleanupMode: "onDisconnect" };
        self.moduleConfig = ko.observable(defaultConfig);
        Utils.resolveViewAndViewModel(self.router.moduleConfig.name(), self.moduleConfig, 'none');

        // When router state changes, load the new modules
        let currentRouterSelection = self.router.moduleConfig.name;
        currentRouterSelection.subscribe((name) => {
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
}

class footerLink {
    name: string;
    linkId: string;
    linkTarget: string;
    constructor(name: string, linkId: string, linkTarget: string) {
        this.name = name;
        this.linkId = linkId;
        this.linkTarget = linkTarget;
    }
}
export = ControllerViewModel;
