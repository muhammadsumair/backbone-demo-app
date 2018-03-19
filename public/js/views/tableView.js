define([
    'backbone'
], function(Backbone) {

    var TableView = Backbone.View.extend({
        el: "#app",
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html($('#tableTemplate').html());
        }
    });

    return TableView
});