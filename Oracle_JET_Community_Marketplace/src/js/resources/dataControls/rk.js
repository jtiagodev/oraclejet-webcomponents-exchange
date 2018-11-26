define(['ojFetch', 'text!./../../varconfig.json'], function (ojfetch, vars) {

    const varconfig = JSON.parse(vars); 

    let baseUrl;
    switch (varconfig.connection_type.toUpperCase()) {
        case 'APIARY': 
                baseUrl = varconfig.rk_apiary;
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
                        idSession: "ABAD1D",
                        ip: "fe80::7981:d0:59be:305e%13"
                    },
                    communication: {
                        idMessageExternal: "4d3c8bdd-5379-4aeb-bc56-fcb01eb7cc33"
                    }
                }
            }
        };
        let payloadRequest = payloadStrucuture;
        // handle cases without data on payloadRequest
        if ("message" in payload) {
            payloadRequest.message.data = payload.message.data;
        }
        return payloadRequest;
    };


    return {
        getRequests: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Requests/RequestsDS/osb/rk/api/v1/Requests/requests/' + params.requestid + '/get', buildPayload(payload));
        },

        getCustomers: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Customers/CustomersDS/osb/rk/api/v1/Customers/customers/' + params.requestid + '/get', buildPayload(payload));
        },

        getParties: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Parties/PartiesDS/osb/rk/api/v1/Parties/parties/' + params.requestid + '/get', buildPayload(payload));
        },

        getBondlines: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Bondlines/BondlinesDS/osb/rk/api/v1/Bondlines/bondlines/' + params.requestid + '/get', buildPayload(payload));
        },

        updateBondLines: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Bondlines/BondlinesBPS/osb/rk/api/v1/Bondlines/bondlines/' + params.bondlineid + '/update{?q}', buildPayload(payload));
        },

        getBondLineSublimits: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-BondlineSublimits/BondlineSublimitsDS/osb/rk/api/v1/BondlineSublimits/bondlineSublimits/' + params.requestid + '/get{?q}', buildPayload(payload));
        },

        createBondLineSublimits: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-BondlineSublimits/BondlineSublimitsBPS/osb/rk/api/v1/BondlineSublimits/bondlineSublimits/create', buildPayload(payload));
        },

        getBondLineSublimitsDetailes: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-BondlineSublimits/BondlineSublimitsDS/osb/rk/api/v1/BondlineSublimitsDetails/bondlineSublimitsDetails/' + params.requestid + '/get', buildPayload(payload));
        },

        updateBondLinesublimits: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-BondlineSublimits/BondlineSublimitsBPS/osb/rk/api/v1/BondlineSublimits/bondlineSublimits/' + params.bondlinesublimitid + '/update{?q}', buildPayload(payload));
        },

        getReviewLimits: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-ReviewLimits/ReviewLimitsDS/osb/rk/api/v1/ReviewLimits/reviewlimits/' + params.requestid + '/get{?q}', buildPayload(payload));
        },

        updateReviewLimits: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-ReviewLimits/ReviewLimitsDS/osb/rk/api/v1/ReviewLimits/reviewlimits/' + params.reviewlimitid + '/' + params.reviewlimitversion + '/update{?q}', buildPayload(payload));
        },

        getCodesByCodeType: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Codes/CodesDS/osb/rk/api/v1/Codes/code/' + params.codetype + '/get', buildPayload(payload));
        },

        getGroups: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Groups/GroupsDS/osb/rk/api/v1/Groups/groups/' + params.requestid + '/get', buildPayload(payload));
        },

        updateTasks: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Tasks/TasksDS/osb/rk/api/v1/Tasks/tasks/' + params.taskID + '/update', buildPayload(payload));
        },

        getTasksByUser: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Tasks/TasksDS/osb/rk/api/v1/Tasks/users/' + params.userID + '/tasks/get', buildPayload(payload));
        },

        getUsers: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Users/UsersDS/osb/rk/api/v1/Users/users/get', buildPayload(payload));
        },

        getUsersExcludingID: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Users/UsersDS/osb/rk/api/v1/Users/users/' + params.userID + '/get', buildPayload(payload));
        },

        getCommentsByID: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Comments/CommentsDS/osb/rk/api/v1/Comments/comments/' + params.commentid + '/get', buildPayload(payload));
        },

        getComments: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Comments/CommentsDS/osb/rk/api/v1/Comments/reviewLimits/' + params.requestid + '/comments/get', buildPayload(payload));
        },

        createComments: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Comments/CommentsDS/osb/rk/api/v1/Comments/comments/create', buildPayload(payload));
        },

        updateComments: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Comments/CommentsDS/osb/rk/api/v1/Comments/comments/' + params.commentid + '/update', buildPayload(payload));
        },

        getDecisions: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Decisions/DecisionsDS/osb/rk/api/v1/Decisions/decisions/' + params.requestid + '/get{?q}', buildPayload(payload));
        },

        createDecisions: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Decisions/DecisionsDS/osb/rk/api/v1/Decisions/decisions/create', buildPayload(payload));
        },

        updateDecisions: function (params, payload) {
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-Decisions/DecisionsDS/osb/rk/api/v1/Decisions/decisions/' + params.decisionid + '/update', buildPayload(payload));
        },

        getApplicationText: function (params, payload) { //como substituo o 'q'?
            return ojfetch.post(baseUrl + '/RK-BBT-OSB-ApplicationText/ApplicationTextDS/osb/rk/api/v1/ApplicationText/applicationText/get{?q}', buildPayload(payload));
        },

        requestedCustomerReviewLimit: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/CustomerReviewLimitRequested', buildPayload(payload));
        },

        proposedCustomerReviewLimit: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/CustomerReviewLimitProposed', buildPayload(payload));
        },

        requestCustomerBondLine: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/CustomerBondLineRequested', buildPayload(payload));
        },

        proposedCustomerBondLine: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/CustomerBondLineProposed', buildPayload(payload));
        },

        requestSubBondLine: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/SubBondLineRequested', buildPayload(payload));
        },

        proposedSubBondLine: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/SubBondLineProposed', buildPayload(payload));
        },

        requestedBondAmount: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/BondAmountRequested', buildPayload(payload));
        },

        proposedBondAmount: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/BondAmountProposed', buildPayload(payload));
        },

        customerAmounts: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/CustomerAmounts', buildPayload(payload));
        },

        groupAmounts: function (params, payload) {
            return ojfetch.post(baseUrl + '/osb/util/api/v1/CalculationRules/GroupAmounts', buildPayload(payload));
        }
    };
});