var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function (req, res) {
    var allContacts = JSON.parse(fs.readFileSync(__dirname + '/../public/json/addressBook.json', 'utf8'));
    res.json({allContacts: allContacts});
});

router.post('/', function (req, res) {
    
});

router.put('/', function (req, res) {
    
});

router.delete('/:id', function (req, res) {
    
});

module.exports = router;