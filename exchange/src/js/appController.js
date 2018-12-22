/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(
  ['ojs/ojcore',
    'knockout',
    'ojs/ojmodule-element-utils',
    'ojs/ojmodule-element',
    'ojs/ojrouter',
    'ojs/ojknockout',
    'ojs/ojarraytabledatasource',
    'ojs/ojoffcanvas'],
  function (oj, ko, moduleUtils) {
    function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        components: { label: 'Components', isDefault: true },
        community: { label: 'Community' },
        events: { label: 'Events' },
        about: { label: 'About' },
        profile: { label: 'Profile' }
      });
      oj.Router.defaults.urlAdapter = new oj.Router.urlParamAdapter();

      self.moduleConfig = ko.observable({ view: [], viewModel: null });

      self.loadModule = function () {
        ko.computed(function () {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          var masterPromise = Promise.all([
            moduleUtils.createView({ viewPath: viewPath }),
            moduleUtils.createViewModel({ viewModelPath: modelPath })
          ]);
          masterPromise.then(
            function (values) {
              self.moduleConfig({ view: values[0], viewModel: values[1] });
            }
          );
        });
      };

      // Navigation setup
      var navData = [
        {
          name: 'Components',
          id: 'components',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
        },
        {
          name: 'Community',
          id: 'community',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
        },
        {
          name: 'Events',
          id: 'events',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
        },
        {
          name: 'Profile',
          id: 'profile',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
        },
        {
          name: 'About',
          id: 'about',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'
        }
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, { idAttribute: 'id' });

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function () { oj.OffcanvasUtils.close(self.drawerParams); });
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function () {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      };
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $('#navDrawer').on('ojclose', function () { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable('Community Exchange');
      // User Info used in Global Navigation area
      self.userLogin = ko.observable('john.hancock@oracle.com');

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About', 'aboutCommunityExchange', '/?root=about'),
        new footerLink('Contact Us', 'contactUs', '/?root=community'),
        new footerLink('Legal Notices', 'legalNotices', '/?root=about'),
        new footerLink('Terms Of Use', 'termsOfUse', '/?root=about'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', '/?root=about')
      ]);
    }

    return new ControllerViewModel();
  }
);
