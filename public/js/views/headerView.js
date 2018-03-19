define([
    'backbone'
], function(Backbone) {

    var HeaderView = Backbone.View.extend({
        el: '#header',
        template: _.template($('#headerTemplate').html()),
        events: {
            "click #logout" : "logout"
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template);
        },

        logout: function() {
            localStorage.removeItem("user");
            window.Router.navigate('#/login');
            return false;
        }
    });

    return HeaderView
});