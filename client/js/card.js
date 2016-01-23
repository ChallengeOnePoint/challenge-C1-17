(function (global) {

    var instance = {};
    var hasInit = false;
    var card, form, map;

    global.card = {
        setData: function (data) {
            instance = data;
            this.render();
        },
        render: function () {
            for(var p in instance) {
                if (document.querySelector('.field-' + p)) {
                    document.querySelector('.field-' + p).innerHTML = instance[p];        
                }
            }

            // map.center(instance['lat'], instance['lng']);
        },
        
        renderForm: function () {
            for(var p in instance) {
                document.querySelector('#field-' + p).value = instance[p];
            }
        },

        switchToEditMode: function () {
            this.renderForm();
            
            card.style.display = 'none';
            form.style.display = 'block';
        },

        switchToDisplayMode: function () {
            this.render();

            card.style.display = 'block';
            form.style.display = 'none';
        },        

        init: function () {
            if (hasInit) {
                return;
            }

            form = document.querySelector('.cardForm');
            card = document.querySelector('.card');

            var self = this;

            function clickCallback (e) {
                if (e.target.classList.contains('back')) {
                    self.gotoList();
                } else if (e.target.classList.contains('edit')) {
                    this.switchToEditMode();
                } else {
                    if (e.target.classList.contains('save')) {
                        var data = {};
                        form.querySelectorAll('.field').forEach(function (field, key) {
                            data[field.id.substring(6)] = field.value;
                        });
                        users.save(data);
                    }
                    this.switchToDisplayMode();
                }
            }

            var nodes = Array.prototype.slice.call(document.querySelectorAll('.buttons'));
            nodes.forEach(function (buttonZone) {
                buttonZone.addEventListener('click', function (e) {
                    clickCallback.call(self, e);
                });
            });

        var mapProp = {
            center:new google.maps.LatLng(48.859733, 2.341947),
            zoom:12,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);


            hasInit = true;
        },

        hide: function () {
            card.style.display = 'none';
        },
        show: function () {
            card.style.display = "block";
        },
        gotoList: function () {
            this.hide();
            list.show();
        }

    };

}(this));