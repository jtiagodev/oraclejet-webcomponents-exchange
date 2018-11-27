//define(['ojs/ojcore', 'knockout', 'jquery', 'ojFetch', 'ojTime', 'ojEncrypt', 'ojUAParser', 'ojRouterConfig', 'ojNavData', 'ojDataControls', 'ojState', 'ojs/ojmodule-element-utils', 'ojCommonComponents', 'ojCommonLibs', 'ojCoreComponents'],
//    function (oj, ko, $, ojFetch, ojTime, ojEncrypt, ojUAParser, ojRouterConfig, ojNavData, ojDC, ojState, moduleUtils) {
define([], 
    function() {

        return {
            // (String) Gets Current Page on Router
            RouterCurrentPage: function() {
                return oj.Router.rootInstance.stateId._latestValue;
            },
            // (Array) Gets Router Navigation History
            RouterNavHistory: function() {
                return oj.Router.rootInstance._navHistory;
            },
            // Loads CSS into <head>
            loadCSS(href, id) {
                let head = document.getElementsByTagName('head')[0];
                let cssElem = document.createElement('link');
                cssElem.setAttribute('rel', 'stylesheet');
                cssElem.setAttribute('href', href);
                cssElem.setAttribute('type', 'text/css');
                cssElem.setAttribute('id', id);
                head.appendChild(cssElem);
            },
            // Removes CSS from <head>
            removeCSS(id) {
                document.getElementById(id).remove();
            },
            // OJET Currency Converter
            currencyConverter: function (currency) {
                return {
                    "type": "number",
                    "options": {
                        "style": "currency",
                        "currency": currency
                    }
                };
            },
            //////////////////////////////////////
            ///////////////// CAP ////////////////
            //////////////////////////////////////
            // Sorting
            sortDecreasing: function (a, b) {
                // Use toUpperCase() to ignore character casing
                const attrA = a.attrgrouplabel.toUpperCase();
                const attrB = b.attrgrouplabel.toUpperCase();

                let comparison = 0;
                if (attrA > attrB) {
                    comparison = 1;
                } else if (attrA < attrB) {
                    comparison = -1;
                }
                return comparison * -1;
            },
            sortArray: function (array, type, sortAttribute) {
                if (type.toUpperCase() == 'INCREASING' || type.toUpperCase() == 'ASC' || type.toUpperCase() == 'ASCENDING') { // ascending
                    array().sort(function (a, b) {
                        //let attrA = null;
                        //let attrB = null;
                        if (sortAttribute.includes(".")) { // attribute.attribute case
                            let attrs = sortAttribute.split(".");
                            const attrA = (a[attrs[0]][attrs[1]] + '').toUpperCase();
                            const attrB = (b[attrs[0]][attrs[1]] + '').toUpperCase();
                            let comparison = 0;
                            if (attrA > attrB) {
                                comparison = 1;
                            } else if (attrA < attrB) {
                                comparison = -1;
                            }
                            return comparison;
                        } else { // attribute case, eg, status
                            const attrA = (a[sortAttribute] + '').toUpperCase();
                            const attrB = (b[sortAttribute] + '').toUpperCase();
                            let comparison = 0;
                            if (attrA > attrB) {
                                comparison = 1;
                            } else if (attrA < attrB) {
                                comparison = -1;
                            }
                            return comparison;
                        }
                    });
                } else { // descending
                    array().sort(function (a, b) {
                        if (sortAttribute.includes(".")) { // attribute.attribute case
                            let attrs = sortAttribute.split(".");
                            const attrA = (a[attrs[0]][attrs[1]] + '').toUpperCase();
                            const attrB = (b[attrs[0]][attrs[1]] + '').toUpperCase();
                            let comparison = 0;
                            if (attrA > attrB) {
                                comparison = 1;
                            } else if (attrA < attrB) {
                                comparison = -1;
                            }
                            return comparison * -1;
                        } else { // attribute case, eg, status
                            const attrA = (a[sortAttribute] + '').toUpperCase();
                            const attrB = (b[sortAttribute] + '').toUpperCase();
                            let comparison = 0;
                            if (attrA > attrB) {
                                comparison = 1;
                            } else if (attrA < attrB) {
                                comparison = -1;
                            }
                            return comparison * -1;
                        }

                    });
                };
                array.valueHasMutated();
            },
            // Custom component with oj-popup inside OR oj-popup - open by ID
            openPopup: function (id) {
                let myPopup = document.querySelector("#".concat(id) + "> oj-popup");
                (myPopup == null) ? document.querySelector("#".concat(id)).open() : myPopup.open();
            },
            // Custom component with oj-popup inside OR oj-popup - close by ID
            closePopup: function (id) {
                document.querySelector("#".concat(id)).close();
            },
            // Creates an observable text that gets translated with element #homepageLanguagePicker on (custom) translateEvent
            createText: function (translationString) {
                let textObs = ko.observable(oj.Translations.getTranslatedString(translationString));
                $('#homepageLanguagePicker').on('translateEvent', function () {
                    textObs(oj.Translations.getTranslatedString(translationString));
                });
                return textObs;
            },
            createInput: function (value) {
                return ko.observable(value);
            },
            createObs: function (value) {
                return ko.observable(value);
            },
            createArray: function (array) {
                return ko.observableArray(array);
            },
            createArrayDataProvider: function (observableArray, keyAttrString, sortAttrString, directionString) {
                if (!sortAttrString) {
                    return new oj.ArrayDataProvider(observableArray, {
                        keyAttributes: keyAttrString
                    });
                } else {
                    return new oj.ArrayDataProvider(observableArray, {
                        keyAttributes: keyAttrString,
                        implicitSort: [{
                            attribute: sortAttrString,
                            direction: directionString
                        }]
                    });
                };
            },
            createADP: function (observableArray, keyAttrString, sortAttrString, directionString) {
                if (!sortAttrString) {
                    return new oj.ArrayDataProvider(observableArray, {
                        keyAttributes: keyAttrString
                    });
                } else {
                    return new oj.ArrayDataProvider(observableArray, {
                        keyAttributes: keyAttrString,
                        implicitSort: [{
                            attribute: sortAttrString,
                            direction: directionString
                        }]
                    });
                };
            },
            createPagingTableDataSource: function (array, idAttribute) {
                return new oj.PagingTableDataSource(new oj.ArrayTableDataSource(array, {
                    idAttribute: idAttribute
                }));
            },
            createPTDS: function (array, idAttribute) {
                return new oj.PagingTableDataSource(new oj.ArrayTableDataSource(array, {
                    idAttribute: idAttribute
                }));
            },
            createAPDS: function (array) {
                return new oj.ArrayPagingDataSource(array);
            },
            createArrayPagingDataSource: function (array) {
                return new oj.ArrayPagingDataSource(array);
            },
            createJSONTreeDataSource: function (json) {
                return new oj.JsonTreeDataSource(json);
            },
            renderer: function (template) {
                return oj.KnockoutTemplateUtils.getRenderer(template, true);
            },
            getUserInfo: function () {
                return new ojUAParser().getResult();
            },
            callService: function (dataControlName, serviceName, payload, params) {
                let myDC = dataControlName.toLowerCase();
                return (ojDC[myDC])()[serviceName](payload, params);
            },
            translateTexts: function (arrayOfObservables) {
                $('#homepageLanguagePicker').on('translateEvent', function () {
                    $(arrayOfObservables).each(function (index) {
                        arrayOfObservables[index].value(oj.Translations.getTranslatedString(arrayOfObservables[index].translation));
                    })
                });
            },
            formatDate: function (timeText) {
                if (timeText === null || timeText === '' || timeText === undefined) {
                    return '';
                } else {
                    return ojTime(timeText, "YYYY-MM-DD").format('DD MMM YYYY').toUpperCase();
                }
            },
            formatTime: function (timeText) {
                if (timeText === null || timeText === '' || timeText === undefined) {
                    return '';
                } else {
                    return ojTime(timeText, "YYYY-MM-DD hh:mm:ss").format('DD MMM YYYY hh:mm').toUpperCase();
                }
            },
            setSessionContext: function (json) {
                sessionStorage.removeItem("atradius-context");
                sessionStorage.setItem("atradius-context", JSON.stringify(json));   
            },
            getSessionContext: function () {
                return JSON.parse(sessionStorage.getItem("atradius-context"));
            },
            // Sub Router Navigation to ID
            subRouterGoTo: function(id) {
                this.getSubRouter().stateId(id);
            },
            // Router Navigation to ID, leaves on atradius-nav-context['navigated-from'] the current page
            goTo: function (page, withSubRouter) {

                let sessionContext = sessionStorage.getItem('atradius-nav-context');
                sessionContext = sessionContext ? JSON.parse(sessionContext) : {'navigated-from': this.RouterCurrentPage()};
                sessionContext['navigated-from'] = this.RouterCurrentPage(); // adds navigated-from
                sessionStorage.setItem('atradius-nav-context', JSON.stringify(sessionContext));
                if (withSubRouter != undefined) {
                    if (withSubRouter == true) {
                        oj.Router.rootInstance.go(page, { historyUpdate: 'skip' });
                    } else {
                        oj.Router.rootInstance.go(page);
                    }
                } else {
                    oj.Router.rootInstance.go(page);

                }

            },
            // Router Navigation to previous page, leaves on atradius-nav-context['navigated-from'] the current page
            goBack: function () {
                let sessionContext = JSON.parse(sessionStorage.getItem('atradius-nav-context'));
                if (sessionContext['navigated-from'] != null) {
                    let myPreviousNavigation = sessionContext['navigated-from'];
                    sessionContext['navigated-from'] = this.RouterCurrentPage();
                    sessionStorage.setItem('atradius-nav-context', JSON.stringify(sessionContext));
                    oj.Router.rootInstance.go(myPreviousNavigation);
                }
            },
            disableScrolling: function () {
                var x = window.scrollX;
                var y = window.scrollY;
                window.onscroll = function () {
                    window.scrollTo(x, y);
                };
            },
            enableScrolling: function () {
                window.onscroll = function () {};
            },
            releaseScroll: function () {
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
                window.onscroll = function () {};
            },
            initializeStart: function (id) {
                window.onscroll = function () {
                    window.scrollTo(0,0);
                    
                };
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
                document.body.style.overflow = 'hidden';
                if (id) {
                    $('#' + id)[0].classList.add('atr-blur-content');
                }
            },
            initializeFinish: function (id) {
                if (id) {
                    $('#' + id)[0].classList.remove("atr-blur-content");
                    window.onscroll = function () {};
                    document.body.style.overflow = '';
                }
            },
            getProperty: function (propertyName, object) {
                var parts = propertyName.split("."),
                    length = parts.length,
                    i,
                    property = object || this;

                for (i = 0; i < length; i++) {
                    if (parts[i].endsWith(']') && parts[i].includes('[')) {
                        let atributes = parts[i].split("[");
                        property = property[atributes[0]];
                        property = property[atributes[1].split("]")[0]];
                    } else {
                        property = property[parts[i]];
                    }
                }
                return property;
            },
            ///////////////////
            // IMPORTS
            ///////////////////
            getNavData: function (ojNavData) {
                return ojNavData;
            },
            moduleUtils: function () {
                return moduleUtils;
            },
            ko: function () {
                return ko;
            },
            core: function () {
                return oj;
            },
            ojFetch: function () {
                return ojFetch;
            },
            ojTime: function (arg1, arg2) {
                return ojTime(arg1, arg2);
            },
            ojEncrypt: function () {
                return ojEncrypt;
            },
            stateManager: function () {
                return ojState;
            },
            ///////////////////
            // MAIN.JS ////////
            ///////////////////
            init: function (app) {
                oj.Router.sync().then(
                    function () {
                        app.loadModule();
                        app.loadModuleSubNav();
                        // Bind your ViewModel for the content of the whole page body.
                        ko.applyBindings(app, document.getElementById('atradius'));
                    },
                    function (error) {
                        oj.Logger.error('Error in root start: ' + error.message);
                    }
                );
            },
            ///////////////////
            // APPCONTROLLER.JS
            ///////////////////
            createComputed: function (func, scope) {
                return ko.computed(func, scope);
            },
            configureRouter: function (ojRouterConfigV2) {
                (oj.Router.rootInstance).configure(ojRouterConfigV2.MainRouter());
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
            },
            generateAndConfigureSubRouter: function(ojRouterConfigV2) {
                let subrouter = oj.Router.rootInstance.createChildRouter('subNavRouter');
                subrouter.configure(ojRouterConfigV2.SubNavRouter());
                return subrouter;
            },
            getMainRouter: function () {
                return oj.Router.rootInstance;
            },
            getSubRouter: function () {
                return oj.Router.rootInstance.getChildRouter('subNavRouter');
            },
            ///////////////////
            // OJ /////////////
            ///////////////////
            ojConfig: function () {
                return oj.Config;
            },
            ojTranslations: function () {
                return oj.Translations;
            },
            ojRouter: function () {
                return oj.Router;
            },
            getRouterInstance: function () {
                return oj.Router.rootInstance;
            },
            loadServices: function (services, loadedFlag, errorFlag, mainDivId) {
                return new Promise((resolve, reject) => {
                        Promise.all(services).then(function (messages) {
                            console.log(messages);
                            loadedFlag(true); // end of loading
                            ojet.initializeFinish(mainDivId);
                            resolve('Services loaded successfully');
                        }).
                        catch(function (error) {
                            console.log(error);
                            loadedFlag(true); // end of loading
                            errorFlag(true); // with error
                            ojet.initializeFinish();
                            reject({
                                status: 'Error',
                                message: error,
                                count: 0
                            });
                        });
                    })
            },
            updateCombo: function (target, domain, service, params, data, dataProvider, index, responseAttribute, keys, selectFirst, filter) {
                return new Promise((resolve, reject) => {
                    console.log('START UPDATING COMBO WITH ID ' + target);
                    let oldIndex = index();
                    index(0);
                    dataProvider.data.removeAll();
                    ojet.callService(domain, service, params, data).then(function (response) {
                            let resultsCount = 0;
                            if (response.data.message.data) {
                                const results = ojet.getProperty(responseAttribute, response.data);
                                if (results && results.length > 0) {
                                    resultsCount = results.length;
                                    if (filter && filter.field && filter.valid && filter.valid.length) {
                                        let firstPosition = true;
                                        let validValues = filter.valid;
                                        
                                        $.each(results, function (i) {
                                            let oldValue = results[i].value;
                                            function validateValues(element, index, array) {
                                                return results[i][filter.field] == element;
                                            }
                                            if (validValues.some(validateValues)) {
                                                results[i].value = results[i][keys.value];
                                                if (firstPosition) {
                                                    firstPosition = false;
                                                    if (keys.label == 'value') {
                                                        results[i].label = keys.cmbPrefix + oldValue;
                                                    } else {
                                                        results[i].label = keys.cmbPrefix + results[i][keys.label];
                                                    }
                                                    index(results[i].value);
                                                } else {
                                                    if (keys.label == 'value') {
                                                        results[i].label = oldValue;
                                                    } else {
                                                        results[i].label = results[i][keys.label];
                                                    }
                                                    if (results[i].value == oldIndex && !selectFirst) {
                                                        index(oldIndex);
                                                    }
                                                }
                                                dataProvider.data.push(results[i]);
                                            }
                                        });
                                    } else {
                                        $.each(results, function (i) {
                                            let oldValue = results[i].value;
                                            results[i].value = results[i][keys.value];
                                            if (i == 0) {
                                                if (keys.label == 'value') {
                                                    results[i].label = keys.cmbPrefix + oldValue;
                                                } else {
                                                    results[i].label = keys.cmbPrefix + results[i][keys.label];
                                                }
                                                index(results[i].value);
                                            } else {
                                                if (keys.label == 'value') {
                                                    results[i].label = oldValue;
                                                } else {
                                                    results[i].label = results[i][keys.label];
                                                }
                                                if (results[i].value == oldIndex && !selectFirst) {
                                                    index(oldIndex);
                                                }
                                            }
                                            dataProvider.data.push(results[i]);
                                        });
                                    }
                                    if (target) {
                                        $('#' + target)[0].refresh();
                                    }
                                    resolve({ status: 'Success', message: 'Update Combo ' + keys.cmbPrefix + resultsCount + ' items loaded', count: resultsCount, data: results });
                                } else {
                                    reject('Error Updating Combo ' + keys.cmbPrefix + ' no results returned');
                                }
                            } else {
                                // Nothing to do
                                reject('Error Updating Combo ' + keys.cmbPrefix + ' no results returned');
                            }
                        })
                        .catch(function (error) {
                            reject({
                                status: 'Error',
                                message: error,
                                count: 0
                            });
                        });
                    });
            },
            updateTable: function (eventElement, target, domain, service, params, data, dataProvider, responseAttribute, selectedRow) {
                return new Promise((resolve, reject) => {
                        console.log('START UPDATING TABLE');
                        if (selectedRow) {
                            selectedRow({});
                        }
                        var tableData;
                        if (dataProvider.constructor.name === 'ArrayDataProvider') {
                            tableData = dataProvider.data;  
                        } else {
                            tableData = dataProvider.dataSource.data;  
                        }
                        tableData.removeAll();
                        // dataProvider.dataSource.data.removeAll();
                        if (eventElement) {
                            eventElement.disabled = true;
                        }
                        ojet.callService(domain, service, params, data).then(function (response) {
                                let resultsCount = 0;
                                if (response.data.message.data) {
                                    const results = ojet.getProperty(responseAttribute, response.data);
                                    if (results) {
                                        resultsCount = results.length;
                                        var tableData;
                                        if (dataProvider.constructor.name === 'ArrayDataProvider') {
                                            tableData = dataProvider.data;  
                                        } else {
                                            tableData = dataProvider.dataSource.data;  
                                        }
                                        $.each(results, function (i) {
                                            tableData.push(results[i]);
                                        });
                                        if (target) {
                                            $('#' + target)[0].refresh();
                                        }
                                        if (eventElement) {
                                            eventElement.disabled = false;
                                        }
                                        resolve({
                                            status: 'Success',
                                            message: 'Update Table (' + resultsCount + ' items loaded)',
                                            count: resultsCount,
											data: results
                                        });
                                    } else {
                                        if (target) {
                                            $('#' + target)[0].refresh();
                                        }
                                        if (eventElement) {
                                            eventElement.disabled = false;
                                        }
                                        resolve({
                                            status: 'Success',
                                            message: 'Update Table (' + resultsCount + ' items loaded)',
                                            count: resultsCount
                                        });
                                    }
                                } else {
                                    // Nothing to do
                                    if (eventElement) {
                                        eventElement.disabled = false;
                                    }
                                    reject({
                                        status: 'Error',
                                        message: 'No results returned (please check response message)',
                                        count: 0
                                    });
                                }
                            })
                            .catch(function (error) {
                                if (eventElement) {
                                    eventElement.disabled = false;
                                }
                                reject({
                                    status: 'Error',
                                    message: error,
                                    count: 0
                                });
                            });
                    });
            },
            getServiceData: function (domain, service, params, data, responseAttribute, functionToRun) {
                let writeErrorToLoadingScreen = function(type, error) {
                    let errorLoading = document.getElementsByTagName('ojet-errorloading')[0];
                    switch (type) {
                        case 'error':
                        errorLoading.setAttribute("error", error);
    
                        break;
                        case 'errormessage':
                        errorLoading.setAttribute("errormessage", error);
    
                        break;
                        default:
                        errorLoading.setAttribute("errormessage", error);
                        break;
                    }
                };
                let r = functionToRun;
                return new Promise((resolve, reject) => {
                        console.log('GETTING SERVICE DATA');
                        ojet.callService(domain, service, params, data).then(function (response) {
                                if (response.data.message.data) {
                                    let resultData = ojet.getProperty(responseAttribute, response.data);
									if (r == 'undefined') {
										console.log("functionToRun not defined");
									};
                                    r(resultData);
                                    resolve(resultData);
                                } else {
                                    writeErrorToLoadingScreen('errormessage', 'Error getting data: no data attribute present in response');
                                    reject('Error getting data: no data attribute present in response');
                                }
                            })
                            .catch(function (error) {
                                writeErrorToLoadingScreen('errormessage', error);
                                reject({
                                    status: 'Error',
                                    message: error,
                                    count: 0
                                });
                            });
                    });
            }
        };

    });