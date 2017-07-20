var expect  = require('chai').expect;
var request = require('request');
var config= require('../config.json');
console.log(JSON.stringify(config));
var https=require('https');
var msisdn=require('../msisdn.json');
require('it-each')({ testPerIteration: true });


console.log(JSON.stringify(config));
describe('Iterar llamadas al BSS',function()
{
var msisdnArray=[msisdn[0],msisdn[1],msisdn[2]];

var options = {
  url: 'https://api.github.com/repos/request/request',
  headers: {
    'User-Agent': 'request'
  }
};

   it.each(msisdnArray,'Utilizing msisdn %s',['element'],function(element,next)
{
  request({url:'https://'+config['host']+config['path']+'/'+element+'/account',
				headers:{'Authorization':'Bearer '+config['token'],'User-Agent':'testing/edge' }},function(error,response,body)
{

 console.log(JSON.stringify(body));
 expect(JSON.parse(body)).to.equals({
    "account": {
        "accountId": "77657144",
        "accountName": "unknown",
        "billingAddress": {},
        "billingInfo": {},
        "clientCode": "13873834",
        "contract": "77657144",
        "contractType": null,
        "creationDate": "",
        "csn": null,
        "line": {
            "imei": null,
            "imsi": null,
            "msisdn": ""
        },
        "partNum": null,
        "plan": {
            "planName": "FN all day 10",
            "planType": "prepaid",
            "planCode": null,
            "planDescription": null,
            "planSource": null,
            "dataPlanOnly": null
        },
        "portability": null,
        "scoring": null,
        "startDate": "2015-10-02T21:47:09.000Z",
        "status": "active",
        "telephonyType": null,
        "msisdn": "77657144"
    }
}); 
next();

});

});
});
