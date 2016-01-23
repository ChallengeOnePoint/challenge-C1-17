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
                // todo api call // localhost:3000/geoloc/ GET api sent you : [{firstname: "...", lastname: "..."}];
                chached = dataSrc;
                isCacheOutDated = false;
            }
            return chached;
        },
        findBy: function (col, val) {
            var i = 0, found = false;

            this.all();

            var baseArray = chached;
            //val = parseInt(val, 10);
            reorder(col);
            while (found === false) {
                if (baseArray.length === 1 && val !== baseArray[0][col]) {
                    break;
                }
                i = Math.floor(baseArray.length / 2);
                if (val === baseArray[i][col]) {
                    found = true;
                } else if (val > baseArray[i][col]) {
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
            // todo : api call // not implemented at the moment localhost:3000/geoloc POST you send : {firstname: ..., lastname: ...}
            chached.push(data);
            reorder();
        }
    }

    global.users = users;

}(this));