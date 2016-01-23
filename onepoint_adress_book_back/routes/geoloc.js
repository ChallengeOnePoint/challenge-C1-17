var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonfile = require('jsonfile');
var request = require('request');

router.get('/', function (req, res) {
    var allContacts = JSON.parse(fs.readFileSync(__dirname + '/../public/json/addressBook.json', 'utf8'));
    res.json({allContacts: allContacts});
});

<<<<<<< HEAD
/*router.post('/import/json', function (req, res) {
    jsonfile.writeFile(__dirname + '/../public/json/addressBook.json', req.body., function (err) {
        console.error(err);
=======
router.post('/import/json', function (req, res) {
    request(req.body.jsonFile, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonfile.writeFile(__dirname + '/../public/json/addressBook.json', JSON.parse(body), function (err) {
                console.error(err);
            });
            
        }
>>>>>>> b79c12632ef5cc8b7ccef101b4d4da354ffde50b
    });
});*/

router.post('/', function (req, res) {
    require(__dirname + '/../my_modules/geolocation')(req.body, function (coord, userInfos) {
      require(__dirname + '/../my_modules/putAddressJSON')(userInfos, coord);
    });
});

router.put('/', function (req, res) {
    console.log(req.body.update);
    console.log('-----');
    require(__dirname + '/../my_modules/geolocation')(req.body.update, function (coord, userInfos) {
        var json = {};
        console.log(coord);
        console.log(userInfos);
        json = JSON.parse(userInfos);
        if (coord !== false){
            json.push(JSON.parse(coord));
        }
        console.log(json);
      //require(__dirname + '/../my_modules/putAddressJSON')(req.body.last, json);
    });
});

router.delete('/:id', function (req, res) {
    
});

module.exports = router;