Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        return Meteor.subscribe('notifications');
    }
});
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
    waitOn:function(){
      return [
          Meteor.subscribe('comments',this.params._id),
          Meteor.subscribe('singleQuest', this.params._id)
    ]
    },
    data: function(){
        return Questions.findOne(this.params._id);
    }
});

Router.route('/admin/:_id/edit', {
    name:'questionsEdit',
    waitOn:function(){
      return Meteor.subscribe('singleQuest', this.params._id)  
    },
    data:function(){
        return Questions.findOne(this.params._id);
    }
});

QuestionsListController = RouteController.extend({
    template:'questionsList',
    increment: 5,
    questionsLimit:function(){
        return parseInt(this.params.questionsLimit) || this.increment;
    },
    findOptions: function(){
        return {sort: this.sort, limit: this.questionsLimit()};
    },
    // waitOn: function(){
    //     return Meteor.subscribe('questions', this.findOptions());
    // },
    subscriptions: function(){
      this.questsSub = Meteor.subscribe('questions', this.findOptions());  
    },
    questions: function(){
        return  Questions.find({}, this.findOptions())
    },
    data:function(){
        
        var hasMore =this.questions().count() === this.questionsLimit();
        // var nextPath = this.route.path({questionsLimit: this.questionsLimit()+ this.increment});
        
        return{
            questions:this.questions(),
            ready: this.questsSub.ready,
            nextPath : hasMore ? this.nextPath() : null
        }
    }
});

NewQuestionsController = QuestionsListController.extend({
    sort:{submitted:-1, _id:-1},
    nextPath:function(){
        return Router.routes.newQuestions.path({questionsLimit:this.questionsLimit()+ this.increment})
    }
});
BestQuestionsController = QuestionsListController.extend({
    sort:{votes:-1,submitted:-1,_id:-1},
    nextPath:function(){
        return Router.routes.bestQuestions.path({questionsLimit: this.questionsLimit()+ this.increment})
    }
});

Router.route('/',{
    name:'home',
    controller:NewQuestionsController
});


Router.route('/new/:questionsLimit?', {name: 'newQuestions'});
Router.route('/best/:questionsLimit?',{name:'bestQuestions'});

// Router.route('/:questionsLimit?',{
//     name:'questionsList'
//     // waitOn:function(){
//     //     var limit = parseInt(this.params.questionsLimit) || 5;
//     //     return Meteor.subscribe('questions', {sort:{submitted:-1}, limit : limit});
//     // },
//     // data:function(){
//     //     var limit = parseInt(this.params.questionsLimit) || 5;
//     //             // Session.set('radioSelected', '');
//     //             // Session.set('radioEditSelected','');
//     //     return {
//     //         questions:Questions.find({}, {sort:{submitted:-1}, limit: limit})
//     //     }
//     // }
    
// });

var requireLogin = function(){
    if(! Meteor.user()){
        this.render('accessDenied')
    }else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound',{only:'questionsPage'});
Router.onBeforeAction(requireLogin,{only:'questionsSubmit'});