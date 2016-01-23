var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');

var containsObject = function (object, json) {
   for (var i = 0; i < json.length; i++) {
        if (_.isEqual(object, json[i])) {
            return true;
        }
    }

    return false; 
};

var mergeObject = function (obj1, obj2) {
    for (var i in obj2) {
        obj1[i] = obj2[i];
    }
    return obj1;
}

var putAdressJSON = function (address, objectLatLng) {
    var adress = address || null;
    var jsonAdresses = JSON.parse(fs.readFileSync(__dirname + '/../public/json/addressBook.json', 'utf8'));
    var result = containsObject(adress, jsonAdresses);
    if (result) {
        for (var i = 0; i < jsonAdresses.length; i++) {
            if (_.isEqual(adress, jsonAdresses[i])) {
                jsonAdresses[i] = mergeObject(jsonAdresses[i], objectLatLng);
            }
        }
    } else {
        jsonAdresses.push(address);
    }
    
    jsonfile.writeFile(__dirname + '/../public/json/addressBook.json', jsonAdresses, function (err) {
        console.error(err);
    });
    
    return true;
};

module.exports = putAdressJSON;