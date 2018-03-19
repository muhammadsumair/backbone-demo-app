define([
    'underscore',
    'backbone',
    '../views/tableView',
    '../collections/profilesCollection'
], function(_, Backbone, TableView, ProfileCollection) {

    var ProfileView = Backbone.View.extend({
        el: "#app",

        template: _.template($('#template').html()),

        events: {
            'click #loadMore': 'loadMore'
        },

        initialize: function() {
            var self = this;
            self.limit = 5;
            self.skip = 0;
            self.profiles = new ProfileCollection();
            var tableView = new TableView();

            self.profiles.fetch({
                success: function() {
                    self.render();
                }
            });
        },
        render: function() {
            var self = this;
            var profiles = this.profiles.models.slice(self.skip, self.skip + self.limit);
            if(profiles.length) {
                _.each(profiles, function(profile){
                    var json = profile.toJSON();
                    var profileTemplate = self.template(json);
                    $('#profiles').append(profileTemplate);
                });
                self.skip = self.skip + self.limit;
                $('#loadMore').removeClass("hide");
            }
            else $('#loadMore').addClass("hide");
        },

        loadMore: function() {
            this.render();
        }
    });

    return ProfileView
});