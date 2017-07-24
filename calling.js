var async=require('async');
var config=require("./config.json");
var request=require('request');
var msisdn=require('./msisdn.json');
var arrayMsisdn=[msisdn[0],msisdn[1],msisdn[2]];
async.each(arrayMsisdn,function(item,next)
 {
    async.waterfall(
        [
            callLegacy.bind(null,{msisdn:'59169365057'}),
            callBSS
        ],
        function(err,result)
        {
            if (err)
            {
                console.log("\nERROR\n");
                console.log(err);
                return;
            }
            else
            {
                console.log("\nFINALIZADO WATERFALL "+result+ "\n") ;
                next();
            }
        }
        );
}
,function (err,result2)
{
   console.log("Fin de la iteracion async series");
}
);
function callLegacy(opt,callback)
{
    request({url:'https://'+config['host']+config['path']+'/'+opt["msisdn"]+'/account',
             headers:{'Authorization':'Bearer '+config['token'],
                      'User-Agent':'testing/edge'}},
            function(error,response,body)
            {
                if(error) return callback(error);
                else
                {
                callback(null,opt.msisdn,body);
                }
           });
}
function callBSS(msisdn,arg1,callback)
{
    request({url:'https://'+config['hostQA']+config['pathAccount']+'/'+msisdn+'/account'},
             function(error,response,body)
            {
                 if (error) return callback(error);
                 else{
                     console.log("no error");
                     callback(null,'terminado la comparacion para '+msisdn+"\n"+arg1);
                 }
             });
}
