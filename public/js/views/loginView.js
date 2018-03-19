define([
    'underscore',
    'backbone',
    '../collections/usersCollection'
], function(_, Backbone, UsersCollection) {

    var LoginView = Backbone.View.extend({
        el: "#app",
        template: _.template($('#loginTemplate').html()),
        events: {
            "submit #login-form" : "login"
        },
        initialize: function() {
            var self = this;
            self.collection = new UsersCollection();
            self.collection.fetch({
                success: function() {
                    self.render();
                }
            });
        },
        render: function() {
            $('#header').empty();
            this.$el.html(this.template);
        },

        showError: function(msg) {
            this.$('.error-msg').empty();
            this.$('.error-msg').text(msg);
            this.$('.error-msg').removeClass("hide");
        },

        hideError: function() {
            this.$('.error-msg').addClass("hide");
        },

        login: function(e) {
            e.preventDefault();
            this.hideError();
            var email = this.$('.login input[name="email"]').val().toLowerCase();
            var password = this.$('.login input[name="password"]').val().toLowerCase();
            var user = this.collection.models.find(function(model) {
                return model.attributes.email === email;
            });
            if(!user || !user.attributes) return this.showError('User not found');
            if(user.attributes.password !== password) return this.showError('Password is not valid');
            localStorage.setItem("user", JSON.stringify({email: email, password: password}));
            window.Router.navigate('#/');
        }
    });

    return LoginView
});