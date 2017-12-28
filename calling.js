var async=require('async');
var config=require("./config.json");
var request=require('request');
var msisdn=require('./msisdn1_1.json');
var arrayMsisdn=msisdn;
var compareLib=require('./compareLib');
var fs=require('fs');

//fs.writeFile("./write_file.xls","Msisdn\t\Diffs Fields\tValuesFields\n",function(err)
fs.writeFile("./write_file.xls","Msisdn"+"\t"+"Values"+"\t"+"PlanType"+"\n",function(err)
{
 console.log("cabeceras creadas");
});

async.each(arrayMsisdn,function(item,next)
 {
    async.waterfall(
        [
            callLegacy.bind(null,{msisdn:item}),
            callBSS
        ],
        function(err,result)
        {
            if (err)
            {
                console.log("\nERROR\n");
                console.log(err);
				next();
                return;
            }
            else
            {
                console.log("\nFinish waterfall: "+result+ "\n") ;
                next();
            }
        }
        );
}
,function (err,result2)
{
   console.log("[[[[=====================end iteration async series================]]]]");
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
    request({url:'https://'+config['hostQA']+config['pathAccount']+'/'+msisdn+'/account',
			headers:{'Authorization':'Bearer '+config['tokenBSS']}},
             function(error,response,body)
            {
                 if (error) console.log("[[[[[[[[[]]]]]]]]]]]]"+JSON.stringify(error));
                 if (error) return callback(error);
                 else{
                    // console.log("no error");
					// callback(null,'Comparing for:'+msisdn+"\n=====LEGACY\n="+arg1+"\nBSS=======\n="+body);
                       var legacyValues=compareLib.obtainArrayCritical(JSON.parse(arg1));
                       
                       
                       var bssValues=compareLib.obtainArrayCritical(JSON.parse(body));
                      /*  var headers=fs.createFile("./write_file.xlsx","msisdn\tfields\tValues",function(error)
						{
                          console.log("saved headers");
						});
*/
						var contents = fs.appendFile("./write_file.xls", generateRowFile(msisdn,legacyValues,bssValues),
 						function(error)	{
					
									if(error) console.log("error")
   									console.log("information save for: "+ msisdn);
									callback(null,'MSISDN: '+msisdn +"\n"+" BSS VALUES: "+ JSON.stringify(bssValues) + "\n LEGACY VALUES: " +JSON.stringify(legacyValues));
  										}
 									);
	
	
                      //  console.log(bssValues);
                      //  console.log(legacyValues);
                   //     callback(null,'MSISDN: '+msisdn +"\n"+" BSS VALUES: "+ JSON.stringify(bssValues) + "\n LEGACY VALUES: " +JSON.stringify(legacyValues));
                 }
             });
}

function generateRowFile(msisdn,dataLegacy,dataBss)
{
  var planTypeLegacy=null;
  var arrayNameFieldsDiff=[];
  var arrayObjectDifferentsValues=[];
  for (var el in dataLegacy)
{
  var valueLegacy=dataLegacy[el],
	  valueBSS=dataBss[el];
  var key=Object.keys(valueLegacy)[0];
  planTypeLegacy=valueLegacy["account.plan.planType"];		
    if (valueLegacy[key] != valueBSS[key])
  {
     arrayNameFieldsDiff.push(key);
	 var obj={};
      obj[key]={"bss":valueBSS[key]==null?"no-data-bss":valueBSS[key],"legacy":valueLegacy[key]}
     arrayObjectDifferentsValues.push(obj);
      
 }
  else
   {
   console.log("equals values "+key);
   }
}
 console.log(msisdn); 
//return msisdn+"\t"+arrayNameFieldsDiff.join("-")+"\t"+JSON.stringify(arrayObjectDifferentsValues)+"\n";
 return msisdn+"\t"+JSON.stringify(arrayObjectDifferentsValues)+"\t"+ planTypeLegacy + "\n";
}

