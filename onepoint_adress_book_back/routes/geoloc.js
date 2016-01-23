var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonfile = require('jsonfile');

router.get('/', function (req, res) {
    var allContacts = JSON.parse(fs.readFileSync(__dirname + '/../public/json/addressBook.json', 'utf8'));
    res.json({allContacts: allContacts});
});

router.post('/import/json', function (req, res) {
    jsonfile.writeFile(__dirname + '/../public/json/addressBook.json', req.body., function (err) {
        console.error(err);
    });
});

router.post('/', function (req, res) {
    require(__dirname + '/../my_modules/geolocation')({
    "number":"1",
    "street":"Rue Saint-Laurent",
    "city":"Paris 10e Arrondissement",
    "postcode":"75010",
    "firstname":"Aaron",
    "lastname":"Desamparo"
  }, function (coord, userInfos) {
      require(__dirname + '/../my_modules/putAddressJSON')(userInfos, coord);
  });
});

router.put('/', function (req, res) {
    
});

router.delete('/:id', function (req, res) {
    
});

module.exports = router;