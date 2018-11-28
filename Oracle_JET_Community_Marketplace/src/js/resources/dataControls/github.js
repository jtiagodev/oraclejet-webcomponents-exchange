define(['ojFetch', 'text!./../../varconfig.json'], function (ojfetch, vars) {

    const varconfig = JSON.parse(vars); 
    let baseUrl;
    switch (varconfig.connection_type.toUpperCase()) {
        case 'APIARY': 
                baseUrl = varconfig.pr_apiary;
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
        getAttributeFormats: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=attributeFormats', buildPayload(payload));
        },

        getAttributeTypes: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=attributeTypes', buildPayload(payload));
        },

        getActivities: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-Activities/ActivitiesDS/osb/pr/api/v1/Activities/product/' + params.productid + '/activities/get', buildPayload(payload));
        },

        getBeneficiaryTypes: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=beneficiaryTypes', buildPayload(payload));
        },

        getReferenceData: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=' + params.key, buildPayload(payload));
        },

        getCountries: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=countries', buildPayload(payload));
        },

        createComments: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-Comments/CommentsDS/osb/pr/api/v1/Comments/comments/create?listId=1', buildPayload(payload));
        },

        getComments: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-Comments/CommentsDS/osb/pr/api/v1/Comments/comments/' + params.prodId + '/' + params.prodVersion + '/get', buildPayload(payload));
        },

        getGeneralAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-GeneralAttributes/GeneralAttributesDS/osb/pr/api/v1/GeneralAttributes/generalAttributes/' + params.localProdId + '/' + params.localProdVersion + '/get', buildPayload(payload));
        },

        getKeywords: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-Keywords/KeywordsDS/osb/pr/api/v1/Keywords/keywords/' + params.keywordsListId + '/get', buildPayload(payload));
        },

        createKeywords: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-Keywords/KeywordsDS/osb/pr/api/v1/Keywords/keywords/' + params.keywordsListId + '/create', buildPayload(payload));
        },

        deleteKeywords: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-Keywords/KeywordsDS/osb/pr/api/v1/Keywords/keywordsList/' + params.keywordsListId + '/keywords/' + params.keywordId + '/delete', buildPayload(payload));
        },

        getLevels: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=levels', buildPayload(payload));
        },

        getSearchLocalProducts: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProducts/LocalProductsDS/osb/pr/api/v1/LocalProducts/localProducts/search', buildPayload(payload));
        },

        getLocalProducts: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProducts/LocalProductsDS/osb/pr/api/v1/LocalProducts/localProducts/get', buildPayload(payload));
        },

        getLocalProductsById: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProducts/LocalProductsDS/osb/pr/api/v1/LocalProducts/localProducts/' + params.localprodid + '/' + params.localprodversion + '/get', buildPayload(payload));
        },

        createLocalProducts1: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProducts/LocalProductsDS/osb/pr/api/v1/LocalProducts/localProducts/create', buildPayload(payload));
        },

        createLocalProducts2: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProducts/LocalProductsBPS/osb/pr/process/v1/LocalProducts/create', buildPayload(payload));
        },

        updateLocalProducts1: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProducts/LocalProductsDS/osb/pr/api/v1/LocalProducts/localProducts/' + params.localProdId + '/update', buildPayload(payload));
        },

        updateLocalProducts2: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProducts/LocalProductsBPS/osb/pr/process/v1/LocalProducts/' + params.localProdId + '/update', buildPayload(payload));
        },

        createLocalProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProductAttributes/LocalProductAttributesDS/osb/pr/api/v1/LocalProdAttrDef/localProducts/' + params.localProdId + '/' + params.localProdVersion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/localProdAttrDef/create', buildPayload(payload));
        },

        getLocalProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProductAttributes/LocalProductAttributesDS/osb/pr/api/v1/LocalProdAttrDef/localProdAttrDef/' + params.localprodid + '/' + params.localprodversion + '/get', buildPayload(payload));
        },

        updateLocalProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProductAttributes/LocalProductAttributesDS/osb/pr/api/v1/LocalProdAttrDef/localProducts/' + params.localProdId + '/' + params.localProdVersion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/localProdAttrDef/update', buildPayload(payload));
        },

        deleteLocalProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProductAttributes/LocalProductAttributesDS/osb/pr/api/v1/LocalProdAttrDef/localProducts/' + params.localProdId + '/' + params.localProdVersion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/localProdAttrDef/delete', buildPayload(payload));
        },

        getLocalProductsAttributesLabel: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProductAttributeLabel/LocalProductAttributeLabelDS/osb/pr/api/v1/AttrLocalManagement/productAttributes/' + params.attrId + '/' + params.attrVersion + '/attrLocalManagement/get', buildPayload(payload));
        },

        createLocalProductAttributesLabel: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProductAttributeLabel/LocalProductAttributeLabelDS/osb/pr/api/v1/AttrLocalManagement/attrLocalManagement/create', buildPayload(payload));
        },

        updateLocalProductAttributesLabel: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProductAttributeLabel/LocalProductAttributeLabelDS/osb/pr/api/v1/AttrLocalManagement/productAttributes/' + params.attrId + '/' + params.attrVersion + '/regions/{regionCode}/attrLocalManagement/update', buildPayload(payload));
        },

        createMasterProducts1: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProducts/MasterProductsDS/osb/pr/api/v1/MasterProducts/masterProducts/create', buildPayload(payload));
        },

        createMasterProducts2: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProducts/MasterProductsBPS/osb/pr/process/v1/MasterProducts/create', buildPayload(payload));
        },

        getSearchMasterProducts: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProducts/MasterProductsDS/osb/pr/api/v1/MasterProducts/masterProducts/search', buildPayload(payload));
        },

        getMasterProducts: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProducts/MasterProductsDS/osb/pr/api/v1/MasterProducts/masterProducts/get', buildPayload(payload));
        },

        getMasterProductsById: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProducts/MasterProductsDS/osb/pr/api/v1/MasterProducts/masterProducts/' + params.masterProdId + '/' + params.masterProdVersion + '/get', buildPayload(payload));
        },

        updateMasterProducts1: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProducts/MasterProductsDS/osb/pr/api/v1/MasterProducts/masterProducts/' + params.masterProdId + '/update', buildPayload(payload));
        },

        updateMasterProducts2: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProducts/MasterProductsBPS/osb/pr/process/v1/MasterProducts/' + params.masterProdId + '/update', buildPayload(payload));
        },

        getMasterProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProductAttributes/MasterProductAttributesDS/osb/pr/api/v1/MasterProductAttributes/masterProducts/' + params.masterprodid + '/' + params.masterprodversion + '/masterProductAttributes/get', buildPayload(payload));
        },

        createMasterProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProductAttributes/MasterProductAttributesDS/osb/pr/api/v1/MasterProductAttributes/masterProducts/' + params.masterProdId + '/' + params.masterProdVersion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/masterProductAttributes/create', buildPayload(payload));
        },

        updateMasterProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProductAttributes/MasterProductAttributesDS/osb/pr/api/v1/MasterProductAttributes/masterProducts/' + params.masterProdId + '/' + params.masterProdVersion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/masterProductAttributes/update', buildPayload(payload));
        },

        deleteMasterProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProductAttributes/MasterProductAttributesDS/osb/pr/api/v1/MasterProductAttributes/masterProducts/' + params.masterProdId + '/' + params.masterProdVersion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/masterProductAttributes/delete', buildPayload(payload));
        },

        getAllProducts: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductDS/osb/pr/api/v1/Product/' + params.productId + '/Atributes/getAll?productType=masterproduct&regionCode=3&attributeid=1&attributeversion=1&levelcode=1&formatcode=1&commentslistid=1&typecode=1&grouplabel=grouplabel&attributedescription=description&attributelength=1&attributedecimalposition=1&attributekeywords=keywords&lastupdatedate=2018-07-09T15:27:20.285Z&lastupdateuser=1&closedate=2018-07-09T15:27:20.285Z&suspensiondate=2018-07-09T15:27:20.285Z&keywordlistid=1', buildPayload(payload));
        },

        getSearchProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesDS/osb/pr/api/v1/ProductAttributes/productAttributes/search', buildPayload(payload));
        },

        getProductAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesDS/osb/pr/api/v1/ProductAttributes/productAttributes/get', buildPayload(payload));
        },

        getProductAttributesById: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesDS/osb/pr/api/v1/ProductAttributes/productAttributes/' + params.attrId + '/' + params.attrVersion + '/get', buildPayload(payload));
        },

        getProductAttributesByRegion: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesDS/osb/pr/api/v1/ProductAttributes/attrLocalManagement/' + params.regionCode + '/productAttributes/get', buildPayload(payload));
        },

        updateProductAttributes1: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesDS/osb/pr/api/v1/ProductAttributes/productAttributes/' + params.attrId + '/update', buildPayload(payload));
        },

        updateProductAttributes2: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesBPS/osb/pr/process/v1/ProductAttributes/' + params.attrId + '/update', buildPayload(payload));
        },

        createProductAttributes1: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesDS/osb/pr/api/v1/ProductAttributes/productAttributes/create', buildPayload(payload));
        },

        createProductAttributes2: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesBPS/osb/pr/process/v1/ProductAttributes/create', buildPayload(payload));
        },

        getSearchProductClasses: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesDS/osb/pr/api/v1/ProductClasses/productClasses/search', buildPayload(payload));
        },

        getProductClasses: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesDS/osb/pr/api/v1/ProductClasses/productClasses/get', buildPayload(payload));
        },

        getProductClassesById: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesDS/osb/pr/api/v1/ProductClasses/productClasses/' + params.prodclassid + '/' + params.prodclassversion + '/get', buildPayload(payload));
        },

        createProductClasses1: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesDS/osb/pr/api/v1/ProductClasses/productClasses/create', buildPayload(payload));
        },

        createProductClasses2: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesBPS/osb/pr/process/v1/ProductClasses/create', buildPayload(payload));
        },

        sendForApprovalProductClasses: function(params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-SendForApprovalProductClasses/SendForApprovalProductClassesBPS/osb/pr/api/v1/SendForApprovalProductClasses/ProductClasses/create', buildPayload(payload));
        },

        updateProductClasses1: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesDS/osb/pr/api/v1/ProductClasses/productClasses/' + params.prodClassid + '/update', buildPayload(payload));
        },

        updateProductClasses2: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesBPS/osb/pr/process/v1/ProductClasses/' + params.prodClassid + '/update', buildPayload(payload));
        },

        getProductClassAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClassAttributes/ProductClassAttributesDS/osb/pr/api/v1/ProductClassAttributes/productClasses/' + params.prodclassid + '/' + params.prodclassversion + '/productClassAttributes/get', buildPayload(payload));
        },

        createProductClassAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClassAttributes/ProductClassAttributesDS/osb/pr/api/v1/ProductClassAttributes/productClasses/' + params.prodclassid + '/' + params.prodclassversion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/productClassAttributes/create', buildPayload(payload));
        },

        updateProductClassAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClassAttributes/ProductClassAttributesDS/osb/pr/api/v1/ProductClassAttributes/productClasses/' + params.prodClassid + '/' + params.prodClassVersion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/productClassAttributes/update', buildPayload(payload));
        },

        deleteProductClassAttributes: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClassAttributes/ProductClassAttributesDS/osb/pr/api/v1/ProductClassAttributes/productClasses/' + params.prodClassid + '/' + params.prodClassVersion + '/productAttributes/' + params.attrId + '/' + params.attrVersion + '/productClassAttributes/delete', buildPayload(payload));
        },

        getPartnerships: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=partnerships', buildPayload(payload));
        },

        getRegions: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=regions', buildPayload(payload));
        },

        getStatus: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=status', buildPayload(payload));
        },

        getUnderlyingObligations: function (params, payload) {
            return ojfetch.post(baseUrl + '/UTIL-BBT-OSB-BBTReferenceData/BBTReferenceDataDS/osb/util/api/v1/BBTReferenceData/bBTReferenceData/get?domain=' + params.domain + '&subDomain=' + params.subDomain + '&key=underlyingObligations', buildPayload(payload));
        },

        getProductVersions: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductVersions/ProductVersionsDS/osb/pr/api/v1/ProductVersions/product/' + params.prodId + '/productversions/get?productType=masterproduct', buildPayload(payload));
        },

        upsertMasterProduct: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-MasterProducts/MasterProductsDS/osb/pr/api/v1/MasterProducts/masterProducts/' + params.masterprodid + '/' + params.masterprodversion + '/upsert/', buildPayload(payload));
        },

        sendForApprovalMasterProductCreate: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-SendForApprovalMasterProducts/SendForApprovalMasterProductsBPS/osb/pr/api/v1/SendForApprovalMasterProducts/MasterProducts/create',  buildPayload(payload))
        },

        upsertProductClass: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesDS/osb/pr/api/v1/ProductClasses/productClasses/' + params.prodclassid + '/' + params.prodclassversion + '/upsert/', buildPayload(payload));
        },

        upsertLocalProduct: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-LocalProducts/LocalProductsDS/osb/pr/api/v1/LocalProducts/localProducts/' + params.localprodid + '/' + params.localprodversion + '/upsert', buildPayload(payload));
        },
      
        upsertProductAttributes: function (params, payload){
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductAttributes/ProductAttributesDS/osb/pr/api/v1/ProductAttributes/productAttributes/' + params.attrid + '/' + params.attrversion + '/upsert' , buildPayload(payload));
        },

        deleteProductClass: function (params, payload) {
            return ojfetch.post(baseUrl + '/PR-BBT-OSB-ProductClasses/ProductClassesDS/osb/pr/api/v1/ProductClasses/productClasses/' + params.prodclassid + '/' + params.prodclassversion + '/delete', buildPayload(payload));
        }
    };
});