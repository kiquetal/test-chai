var _=require('lodash');
var propertiesToCompare={
    "critical":["account.accountId","account.clientCode","account.contract","account.plan.planName"]
    ,"warning":[]

}
var toSearch="accountId";
var bssObj={"account":{"accountId":"59178824720","accountName":"WILFREDO MAX VERA CHUQUIMIA","billingAddress":{},"billingInfo":{},"clientCode":"12090968","contract":"78824720","contractType":null,"creationDate":"2015-01-04T00:49:56.000Z","csn":null,"line":{"imei":null,"imsi":null,"msisdn":"59178824720"},"partNum":null,"plan":{"planName":"TIGO_PREPAGO_LTE","planType":"prepaid","planCode":null,"planDescription":null,"planSource":null,"dataPlanOnly":null},"portability":null,"scoring":null,"startDate":"2015-01-04T00:49:56.000Z","status":"active","telephonyType":null}};
var legacyObj={
  "account": {
    "accountId": "78875690                    ",
    "accountName": "IVR",
    "billingAddress": {
      "address": "LPZ - AGENCIA PRINCIPAL (CALLE LOAYZA)",
      "city": 0,
      "department": null,
      "zone": null
    },
    "billingInfo": {
      "billingCycle": "F",
      "codeBillingCycle": "F"
    },
    "clientCode": 1501554,
    "contract": 1132,
    "contractType": null,
    "creationDate": "2014-04-01T00:00:00.000-04:00",
    "csn": null,
    "cycle": "F",
    "line": {
      "imei": null,
      "imsi": null,
      "msisdn": "78875690                    "
    },
    "partNum": null,
    "plan": {
      "planName": "Plan 189 - LTE Prepago Handset          ",
      "planType": "PRE",
      "planCode": 189,
      "planDescription": "Plan 189 - LTE Prepago Handset          ",
      "planSource": null,
      "dataPlanOnly": false
    },
    "portability": null,
    "scoring": null,
    "startDate": "2014-04-01T00:00:00.000-04:00",
    "status": "AC",
    "telephonyType": null
  }
};

/*function getDescendantProp (obj, desc) {
  var arr = desc.split('.');
  while (arr.length && (obj = obj[arr.shift()]));
  return obj;
}
*/
//myVal = getDescendantProp(objToSearch, propertiesToCompare["critical"][0]);
      

const getDescendantProp = (obj, path) => (
    path.split('.').reduce((acc, part) => acc && acc[part], obj)
);
const consumerProperties=(p) =>  {  return (getDescendantProp(objToSearch,p)) };
const consumerPropetiesObject=(obj) =>{ return function (p) {
        var reduceObj= getDescendantProp(obj,p);
        if (typeof reduceObj =="string") {
          reduceObj=reduceObj.trim();
} 
        return reduceObj;
              }
}

var legacyValueCritical= propertiesToCompare["critical"].map(consumerPropetiesObject(legacyObj));
var bssValueCritical=propertiesToCompare["critical"].map(consumerPropetiesObject(bssObj));

