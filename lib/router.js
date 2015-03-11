Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        return Meteor.subscribe('questions');
    }
});

Router.route('/admin',{name:'questionsList'});
Router.route('/admin/asia',{name:'questionsListAsia'});
Router.route('/admin/europe',{name:'questionsListEurope'});
Router.route('/admin/namerica',{name:'questionsListNAmerica'});
Router.route('/admin/samerica',{name:'questionsListSAmerica'});
Router.route('/admin/australia',{name:'questionsListAustralia'});
Router.route('/admin/africa',{name:'questionsListAfrica'});
Router.route('/admin/antartica',{name:'questionsListAntartica'});

Router.route('/admin/submit', {name: 'questionsSubmit'});

Router.route('/admin/:_id', {
    name:'questionsPage',
    data: function(){
        return Questions.findOne(this.params._id);
    }
});

Router.route('/admin/:_id/edit', {
    name:'questionsEdit',
    data:function(){
        return Questions.findOne(this.params._id);
    }
});

var requireLogin = function(){
    if(! Meteor.user()){
        this.render('accessDenied')
    }else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound',{only:'questionsPage'});
Router.onBeforeAction(requireLogin,{only:'questionsSubmit'});