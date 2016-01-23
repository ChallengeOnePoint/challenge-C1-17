(function (global) {

    var chached = [];
    var isCacheOutDated = true;

    function reorder(col) {
        var column = col === undefined 
            ? "number"
            : col;
        chached.sort(function (a, b) {
            return a[column] - b[column];
        });        
    }

    users = {
        all: function () {
            if (isCacheOutDated) {
                // todo api call
                chached = dataSrc;
                isCacheOutDated = false;
                reorder();
            }
            return chached;
        },
        findById: function (id) {
            var i = 0, found = false;
            var baseArray = chached;
            id = id.toString();
            while (found === false) {
                if (baseArray.length === 1 && id.toString() !== baseArray[0]["number"]) {
                    break;
                }
                i = Math.floor(baseArray.length / 2);
                if (id.toString() === baseArray[i]["number"]) {
                    found = true;
                } else if (id > baseArray[i]["number"]) {
                    baseArray = baseArray.slice(i);
                } else {
                    baseArray = baseArray.slice(0, i);
                }
            }
            if (found) {
                return baseArray[i];
            } else {
                return null;
            }
        },
        save: function (data) {
            // todo : api call
            chached.push(data);
            reorder();
        }
    }

    global.users = users;

}(this));