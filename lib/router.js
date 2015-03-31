Router.configure({
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        return Meteor.subscribe('notifications');
    }
});

Router.route('/admin/submit', {name: 'questionsSubmit',
    layoutTemplate: 'layout',});

Router.route('/admin/:_id', {
    name:'questionsPage',
    layoutTemplate: 'layout',
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
    layoutTemplate: 'layout',
    waitOn:function(){
      return Meteor.subscribe('singleQuest', this.params._id)  
    },
    data:function(){
        return Questions.findOne(this.params._id);
    }
});

QuestionsListController = RouteController.extend({
    template:'questionsList',
    layoutTemplate: 'layout',
    increment: 50,
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
        // console.log(Questions.find({}, this.findOptions()));
        return  Questions.find(this.query, this.findOptions());
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
    query:{},
    sort:{submitted:-1, _id:-1},
    nextPath:function(){
        return Router.routes.newQuestions.path({questionsLimit:this.questionsLimit()+ this.increment})
    }
});
BestQuestionsController = QuestionsListController.extend({
    query:{},
    sort:{votes:-1,submitted:-1,_id:-1},
    nextPath:function(){
        return Router.routes.bestQuestions.path({questionsLimit: this.questionsLimit()+ this.increment})
    }
});
AsiaQuestionsController = QuestionsListController.extend({
    query:{continent:'asia'},
    sort:{submitted:-1,_id:-1},
    nextPath:function(){
        return Router.routes.asiaQuestions.path({questionsLimit:this.questionsLimit() + this.increment})
    }
});
NAmericaQuestionsController = QuestionsListController.extend({
    query:{continent:'namerica'},
    sort:{submitted:-1,_id:-1},
    nextPath:function(){
        return Router.routes.nAmericaQuestions.path({questionsLimit:this.questionsLimit() + this.increment})
    }
});
SAmericaQuestionsController = QuestionsListController.extend({
    query:{continent:'samerica'},
    sort:{submitted:-1,_id:-1},
    nextPath:function(){
        return Router.routes.sAmericaQuestions.path({questionsLimit:this.questionsLimit() + this.increment})
    }
});
AustraliaQuestionsController = QuestionsListController.extend({
    query:{continent:'australia'},
    sort:{submitted:-1,_id:-1},
    nextPath:function(){
        return Router.routes.australiaQuestions.path({questionsLimit:this.questionsLimit() + this.increment})
    }
});
AfricaQuestionsController = QuestionsListController.extend({
    query:{continent:'africa'},
    sort:{submitted:-1,_id:-1},
    nextPath:function(){
        return Router.routes.africaQuestions.path({questionsLimit:this.questionsLimit() + this.increment})
    }
});
EuropeQuestionsController = QuestionsListController.extend({
    query:{continent:'europe'},
    sort:{submitted:-1,_id:-1},
    nextPath:function(){
        return Router.routes.europeQuestions.path({questionsLimit:this.questionsLimit() + this.increment})
    }
});

Router.route('/',{
    name:'home',
    controller:NewQuestionsController
});


Router.route('/new/:questionsLimit?', {name: 'newQuestions'});
Router.route('/best/:questionsLimit?',{name:'bestQuestions'});

Router.route('/asia/:questionsLimit?',{
    name:'asiaQuestions'
});
Router.route('/namerica/:questionsLimit?',{
    name:'nAmericaQuestions'
});
Router.route('/samerica/:questionsLimit?',{
    name:'sAmericaQuestions'
});
Router.route('/australia/:questionsLimit?',{
    name:'australiaQuestions'
});
Router.route('/africa/:questionsLimit?',{
    name:'africaQuestions'
});
Router.route('/europe/:questionsLimit?',{
    name:'europeQuestions'
});

// =======================================================================================
// =======================================================================================
// =======================================================================================


// AsiaQuestionscontroller = RouteController.extend({
//     template:'questionsList',
//     sort:{submitted:-1, _id:-1},
//     findContinentOptions:function(){
//         return {sort:this.sort};
//     },
//     subscriptionsContinent:function(){
//         this.questsContSub = Meteor.subscribe('questions',this.findContinentOptions());
//         // console.log(this.questsContSub);
//     },
//     questionsContinent:function(){
//         // console.log(Questions.find({}, this.findContinentOptions()));
//         return Questions.find({}, this.findContinentOptions());
//     },
//     data:function(){
//         console.log(this.questionsContinent());
//         return{
//             questions:this.questionsContinent(),
//             ready:this.questsContSub.ready
//         }
//     }
// })




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


// =======================================================================================
// =======================================================================================
// =======================================================================================


Router.route('/quiz/:continent', {
    name:'quizPlay',
    waitOn:function(){
      return Meteor.subscribe('quizQuestion', this.params.continent);  
    },
    data:function(){
//        var questionsCount = Questions.find({quizQuestionDisplayed:false,continent:this.params.continent}).count();
//        console.log(questionsCount);
//        var r = Math.floor(Math.random()*questionsCount);
//        console.log(r);        
        var rand = Math.random();
        var difficult = Session.get('quizDifficulty');
        console.log('from router' + Session.get('quizDifficulty'));
        var questions = Questions.findOne({quizQuestionDisplayed:false,continent:this.params.continent,difficult:difficult, random:{$gte : rand}});
        if(questions == null){
            var questions = Questions.findOne({quizQuestionDisplayed:false,continent:this.params.continent,difficult:difficult, random:{$lte : rand}});
        }
//        console.log(questions);
        return questions;
    }
    
});


Router.route('/quiz',{
    name:'quizHome',
    data:function(){
        Session.set('quizDifficulty','easy');
        Session.set('questionEasyCounter',0);
        Session.set('questionNormalCounter',0);
        Session.set('questionDifficultCounter',0);
//        console.log(Session.get('quizDifficulty'));
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