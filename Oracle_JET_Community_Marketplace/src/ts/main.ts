import * as ko from "knockout";
import "ojs/ojknockout";
import RootViewModel = require ('./appController');
import Router = require('ojs/ojrouter');
import Logger = require('ojs/ojlogger');

class Main {
    router: Router;

    constructor() {
        
        let self = this;
        self.router = Router.rootInstance;
        self.router.configure({
            'login': { label: 'Login', isDefault: true },
            'register': { label: 'Register' },
            'about': { label: 'About' },
            'accelerator': { label: 'Accelerator' },
            'componentsCreate': { label: 'Web Components Create' },
            'componentsEdit': { label: 'Web Components Edit' },
            'componentsSearch': { label: 'Web Components Search' },
            'componentsView': { label: 'Web Components View' },
            'profileEdit': { label: 'Profile Edit' },
            'profileView': { label: 'Profile View' }
        });
        Router.defaults['urlAdapter'] = new Router.urlParamAdapter();
        Router.sync().then(
            function() {
                // bind your ViewModel for the content of the whole page body.
                ko.applyBindings(new RootViewModel(), document.getElementById('globalBody'));
            },
            function(error) {
                Logger.error('Error in root start: ' + error.message);
            }
        );
    }
}

export = Main;