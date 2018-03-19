define([
    'jquery',
    'backbone',
    './views/profileView',
    './views/searchView',
    './views/loginView',
    './views/headerView'
], function ($, Backbone, ProfileView, SearchView, LoginView, HeaderView) {
    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            'login': 'login',
            '': 'search',
            'list': 'list'
        },
        list: function(){
            var user = localStorage.getItem("user");
            if(!user) window.Router.navigate('#/login');
            else {
                new HeaderView();
                new ProfileView();
            }
        },

        search: function(){
            var user = localStorage.getItem("user");
            if(!user) window.Router.navigate('#/login');
            else {
                new HeaderView();
                new SearchView();
            }
        },

        login: function(){
            var user = localStorage.getItem("user");
            if(user) window.Router.navigate('#/');
            else new LoginView();
        }
    });

    return Router;
});