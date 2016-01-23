	var http = require("http"),
		https = require("https");

	var geolocation = function (userInfos, callback) {
		var address = encodeURI(userInfos.street + " " + userInfos.city + " " + userInfos.postcode);
		var options = {
			    host: 'maps.google.com',
			    path: '/maps/api/geocode/json?key=AIzaSyB7dJ5WBzcvAeulxFnmD161qTOhNVaYbZ8&address=' + address,
			    port: 443,
			    method: 'GET',
			    headers: {
			        'Content-Type': 'application/json'
			    }
			};

		    var prot = options.port == 443 ? https : http;
		    var req = prot.request(options, function(res){
		        var output = '';
				var coord = false;
		        res.setEncoding('utf8');

		        res.on('data', function (chunk) {
		            output += chunk;
		        });

		        res.on('end', function() {
		            var obj = JSON.parse(output);
		            if (typeof obj.results[0] !== "undefined") {
		            	coord = obj.results[0].geometry.location;
		            }
		            callback.call(this, coord, userInfos);
		        });
		    });
		    req.end();		    
	};

	module.exports = geolocation;
