var https = require('https');

var APIs = [ 'last-day', 'last-week', 'last-month' ];

describe('Asynchronous loop testing', function(){

    it.each(APIs, 'Testing code of %s', ['element'], function(element, next){
        https.get({
            hostname: 'api.npmjs.org',
            path: '/downloads/point/' + element + '/it-each'
        }, function(res){
            // Check res code
            if(res.statusCode != 200){
                throw new Error('Found none 200 response code at ' + element + '!');
            }

            // annoyingly you can't fire 'end' without 'data'
            res.on('data', new Function()).on('end', next);
        });
    });

});
