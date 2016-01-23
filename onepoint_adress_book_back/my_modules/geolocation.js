	var http = require("http"),
		https = require("https");

	var geolocation = function (userInfos, callback) {
		var address = encodeURI(userInfos.street + " " + userInfos.city + " " + userInfos.postcode);
		var options = {
			    host: 'maps.google.com',
			    path: '/maps/api/geocode/json?address=' + address,
			    port: 443,
			    method: 'GET',
			    headers: {
			        'Content-Type': 'application/json'
			    }
			};

		    var prot = options.port == 443 ? https : http;
		    var req = prot.request(options, function(res){
		        var output = '';
				var coord = {};
		        res.setEncoding('utf8');

		        res.on('data', function (chunk) {
		            output += chunk;
		        });

		        res.on('end', function() {
		            var obj = JSON.parse(output);
		            coord = obj.results[0].geometry.location;
		            callback.call(this, coord, userInfos);
		        });
		    });/*

		    req.on('error', function(err) {
		        //res.send('error: ' + err.message);
		    });*/

		    req.end();		    
	};

	module.exports = geolocation;
