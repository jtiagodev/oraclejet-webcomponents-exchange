define(['ojFetch', 'text!./../../varconfig.json'], function (ojfetch, vars) {

    const varconfig = JSON.parse(vars); 

    let baseUrl;
    switch (varconfig.connection_type.toUpperCase()) {
        case 'APIARY': 
                baseUrl = varconfig.rd_apiary;
                break;
        case 'OSB': 
                baseUrl = varconfig.osb_proxy;
                break;
        default:
                baseUrl = varconfig.osb_proxy;
                break; 
    };
    
    const buildPayload = function(payload) {
        
        let payloadStrucuture = {
            message: {
                header: {
                    user: {
                        name: "John",
                        id: "ptJohn01"
                    },
                    from: {
                        application: "BBT-FrontEnd",
                        service: "ProductCatalog",
                        idsession: "ABAD1D",
                        ip: "fe80::7981:d0:59be:305e%13"
                    },
                    communication: {
                        idmessageexternal: "4d3c8bdd-5379-4aeb-bc56-fcb01eb7cc33"
                    }
                }
            }
        };
        let payloadRequest = payloadStrucuture;
        // handle cases without data on payloadRequest
        if (payload) {
            payloadRequest.message.data = payload;
        };
        return payloadRequest;
    };

    return {
        getReferenceList: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/ReferenceList/referenceList/get?refname=' + params.refname, buildPayload(undefined));
        },
        getReferenceListDetails: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/ReferenceList/referenceList/getDetails?refname=' + params.refname, buildPayload(payload));
        },
        getReferenceData: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/ReferenceData/referenceList/' + params.referencelistid + '/get?langcode=' + params.langcode, buildPayload(undefined));
        },
        createReferenceData: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/ReferenceData/referenceList/' + params.referencelistid + '/create', buildPayload(payload));
/*            "defaulttranslation": {                
                "code": "NV",
                "value": "New Value",
                "description": "New Value Description",
                "language": {
                    "id": 1,
                    "code": "EN",
                    "value": "English"
                }
            },
            "regions": [
                { 
                    "regionid": 1,
                    "regioncode": "IT",
                    "regionvalue": "Italy"
                },
                { 
                    "regionid": 2,
                    "regioncode": "PT",
                    "regionvalue": "Portugal"
                }
            ],
            "translations": [
                {                
                    "code": "NV",
                    "value": "Nouveau Valeur",
                    "description": "Nouveau Valeur",
                    "language": {
                        "id": 4,
                        "code": "FR",
                        "value": "French"
                    }
                },
                {                
                    "code": "NV",
                    "value": "Nuevo Valor",
                    "description": "Nouveau Valeur",
                    "language": {
                        "id": 5,
                        "code": "ES",
                        "value": "Spanish"
                    }
                }
*/
        },
        getReferenceDataRegion: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/ReferenceDataRegion/referenceData/' + params.referencedataid + '/get', buildPayload(payload));
        },
        updateReferenceDataRegion: function (params, payload) {
            return ojfetch.put(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/ReferenceDataRegion/referenceData/' + params.referencedataid + '/update', buildPayload(payload));
            /*
            "regions": [
                {
                    "id": 1
                },
                {
                    "id": 2
                }
            ]
            */
        },    
        getTranslations: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Translation/referenceData/' + params.referencedataid + '/get', buildPayload(undefined));
        },
        updateTranslations: function (params, payload) {
            return ojfetch.put(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Translation/referenceData/' + params.referencedataid + '/update', buildPayload(payload));
            /*
            "translations": [
                    {   
                        "languageid": 4,
                        "code": "NV U",
                        "value": "Nouveau Valeur Update",
                        "description": "Nouveau Valeur Update"
                    }
                ]
            */
        },        
        createLanguage: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Language/language/create' + params.referencedataid + '/get', buildPayload(payload));
            /*
            "languages": {   
                    "code": "IT",
                    "value": "Italian"
                }
            */
        },
        getLanguage: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Language/language/get?langcode=' + params.langcode, buildPayload(undefined));
        },
        getLanguageDetails: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Language/language/' + params.languageid + '/get', buildPayload(payload));
        },
        updateLanguage: function (params, payload) {
            return ojfetch.put(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Language/language/' + params.languageid + '/update', buildPayload(payload));
            /*
            "languageid": 3,
                    "code": "IT",
                    "value": "Italian Update",
                    "creationuser": "Dummy",
                    "creationdate": "1900-01-01T00:00:00.000Z",
                    "updateuser": "Dummy",
                    "updatedate": "1900-01-01T00:00:00.000Z"
            */
        },
        deletLanguage: function (params, payload) {
            return ojfetch.delete(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Language/language/' + params.languageid + '/delete', buildPayload(payload));
        },
        getRegionsById: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Regions/regions/get?regioncode=' + params.regioncode, buildPayload(payload));
        },
        getRegionsAll: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTGetReferenceData/BBTReferenceDataDS/osb/util/api/v1/Regions/regions/get', buildPayload(undefined));
        }
    };
});