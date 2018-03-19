define([
    'backbone',
    '../models/userModel'
], function(Backbone, UserModel) {

    var UsersCollection = Backbone.Collection.extend({
        model: UserModel,
        url: './json/credentials.json'
    });

    return UsersCollection
});