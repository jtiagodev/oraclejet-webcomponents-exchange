define(['ojFetch', 'text!./../../varconfig.json'], function (ojfetch, vars) {

    const varconfig = JSON.parse(vars); 

    let baseUrl;
    switch (varconfig.connection_type.toUpperCase()) {
        case 'APIARY': 
                baseUrl = varconfig.audit_apiary;
                break;
        case 'OSB': 
                baseUrl = varconfig.osb_proxy;
                break;
        default:
                baseUrl = varconfig.osb_proxy;
                break; 
    };


    const buildPayload = function (payload) {
        
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
        if (payload && Object.keys(payload).length !== 0) {
            payloadRequest.message.data = payload;
        }
        return payloadRequest;
    };

    return {
        getAuditFilters: function (params, payload) {
            return ojfetch.post(baseUrl + '/Auditing/filters/get', buildPayload(payload));
        },
        getAuditResults: function (params, payload) {
            return ojfetch.post(baseUrl + '/Auditing/results/get', buildPayload(payload));
        }
    };
});