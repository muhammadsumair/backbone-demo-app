define([
    'underscore',
    'backbone',
    '../models/profileModel'
], function(_, Backbone, profileModel) {

    var ProfileCollection = Backbone.Collection.extend({
        model: profileModel,
        url: './json/sample.json'
    });

    return ProfileCollection
});