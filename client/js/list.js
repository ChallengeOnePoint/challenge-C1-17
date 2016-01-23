(function (global) {

    var hasInit = false,
        ul,
        list;

    global.list = {
        init: function () {
            if (hasInit)
                return;

            list = document.querySelector('.list'); 
            ul = list.querySelector('.list ul');

            var self = this;

            ul.addEventListener("click", function (e) {
                if (e.target.classList.contains('people')) {
                    self.gotoCard(e.target.getAttribute('data-id'));
                }
            });

            users.all().forEach(function (u) {
                var li = document.createElement('li');
                li.innerHTML = "" + u.firstname + " " + u.lastname;
                li.setAttribute('data-id', u.id);
                li.classList.add("people");
                ul.appendChild(li);
            }, this);

            hasInit = true;
        },

        hide: function () {
            list.style.display = 'none';
        },
        show: function () {
            list.style.display = "block";
        },
        gotoCard: function (id) {
            this.hide();
            card.init();
            card.setData(users.findBy('id', parseInt(id, 10)));
            card.show();
        }

    }

}(this))