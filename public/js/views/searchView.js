define([
    'underscore',
    'backbone',
    '../views/rowView',
    '../collections/profilesCollection'
], function(_, Backbone, RowView, ProfileCollection) {

    var SearchView = Backbone.View.extend({
        el: "#app",
        initialize: function() {
            this.collection = new ProfileCollection();
            this.collection.fetch();
            this.render();
        },

        events: {
            'click #onSearch': 'search'
        },

        // Returns array subset of models that match search.
        search: function() {

            var search = this.$('.search').val().toLowerCase();
            this.$('#insert').empty();
            this.hideRecord();
            this.notFound(false);
            if(!search) return;

            var collection = this.collection.filter(function(model) {
                return model.id === search;
            });
            this.showRecord();
            if(collection.length) this.addOne(collection[0]);
            else {
                this.hideRecord();
                this.notFound(true);
            }
        },

        notFound: function(isShowing) {
            if(isShowing) {
                return this.$('#notFound').removeClass("hide");
            }
            this.$('#notFound').addClass("hide");
        },

        showRecord: function() {
            this.$('#record').removeClass("hide");
        },

        hideRecord: function() {
            this.$('#record').addClass("hide");
        },

        addOne: function(model) {
            var view = new RowView({ model: model });
            this.$('#insert').append(view.render().el);
        },

        render: function() {
            this.$el.html($('#searchTemplate').html());
        }
    });


    return SearchView
});