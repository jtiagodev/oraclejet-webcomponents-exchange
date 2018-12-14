define(["require", "exports", "knockout", "./appController", "ojs/ojrouter", "ojs/ojlogger", "ojs/ojknockout"], function (require, exports, ko, RootViewModel, Router, Logger) {
    "use strict";
    var Main = /** @class */ (function () {
        function Main() {
            var self = this;
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
            Router.defaults['urlAdapter'] = new Router.urlParamAdapter();
            Router.sync().then(function () {
                // bind your ViewModel for the content of the whole page body.
                ko.applyBindings(new RootViewModel(), document.getElementById('globalBody'));
            }, function (error) {
                Logger.error('Error in root start: ' + error.message);
            });
        }
        return Main;
    }());
    return Main;
});
//# sourceMappingURL=main.js.map