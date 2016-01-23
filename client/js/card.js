(function (global) {

    var instance = {};
    var hasInit = false;

    global.card = {
        setData: function (data) {
            instance = data;
        },
        render: function () {
            for(var p in instance) {
                document.querySelector('.field-' + p).innerHTML = instance[p];
            }
        },
        
        renderForm: function () {
            for(var p in instance) {
                document.querySelector('#field-' + p).value = instance[p];
            }
        },

        switchToEditMode: function () {
            this.renderForm();
            
            this.card.style.display = 'none';
            this.form.style.display = 'block';
        },

        switchToDisplayMode: function () {
            this.render();

            this.card.style.display = 'block';
            this.form.style.display = 'none';
        },        

        init: function () {
            if (hasInit) {
                return;
            }


            this.form = document.querySelector('.cardForm');
            this.card = document.querySelector('.card');

            var self = this;

            function clickCallback (e) {
                if (e.target.classList.contains('edit')) {
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

            hasInit = true;
        }
    };

}(this));