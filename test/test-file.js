var expect  = require('chai').expect;
var request = require('request');
var config= require('../config.json');
var https=require('https');
var msisdn=require('../msisdn.json');
require('it-each')({ testPerIteration: true });
//require('it-each')();

describe('Iterar llamadas al BSS',function()
{
    var msisdnArray=[msisdn[0],msisdn[1],msisdn[2]];
    it.each(msisdnArray,'Utilizing msisdn %s',['element'],function(element,next)
            {
        request({url:'https://'+config['host']+config['path']+'/'+element+'/account',
				         headers:{'Authorization':'Bearer '+config['token'],'User-Agent':'testing/edge' }},
                function(error,response,body)
                {
                    if (error) console.log("ERROR");
                    console.log(JSON.stringify(body));
                    console.log("call the other endpoint");
                    generateRequest("https://"+config['hostQA']+config["pathAccount"]+"/"+element+"/account",{},function(error,response,body)
                     {
                        console.log(body);
                        next();
                    });
                });

});
});//end of describe suite test.

function generateRequest(url,headers, callback)
{
    request({url:url,headers:headers},callback);

};
