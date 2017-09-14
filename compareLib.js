var _=require('lodash');
var propertiesToCompare={
    "critical":["account.accountId","account.clientCode","account.contract","account.plan.planName","account.plan.planCode","account.accountName","account.plan.planType"]
    ,"warning":[]

}
const getDescendantProp = (obj, path) => (
    path.split('.').reduce((acc, part) => acc && acc[part], obj)
);
const consumerProperties=(p) =>  {  return (getDescendantProp(objToSearch,p)) };
const consumerPropetiesObject=(obj) =>{ return function (p) {
        var reduceObj= getDescendantProp(obj,p);
        if (typeof reduceObj =="string") {
          reduceObj=reduceObj.trim();
}
       var obj4={}; 
         obj4[p]=reduceObj;
         return obj4;
}
}
function obtainCriticalValuesArray(source)
{
 
  return propertiesToCompare["critical"].map(consumerPropetiesObject(source));

}

//console.log(obtainCriticalValuesArray({"account":{"accountId":12321,"clientCode":32312,"contract": 23213123,"plan":{"planName":"kiquetal"}}}));


module.exports={

  obtainArrayCritical:obtainCriticalValuesArray
}



