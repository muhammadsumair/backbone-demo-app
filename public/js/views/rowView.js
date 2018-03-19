define([
    'backbone'
], function(Backbone) {

    var RowView = Backbone.View.extend({

        render: function() {

            this.$el.html('<p>' + this.model.get('id') + '</p><p>' + this.model.get('name') + '</p><p>' + this.model.get('title') + '</p>');
            return this;
        }
    });

    return RowView
});