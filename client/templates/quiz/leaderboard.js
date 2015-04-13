Template.lead.helpers({
    'score':function(){
        return Session.get('score');
    }
})

Template.lead.events({
    'click .leaderboardQuizReset':function(e,template){
        e.preventDefault();
        Session.set('counter',0);
        UI._globalHelpers['removeCountDown']();
        Meteor.call('quizReset', function(error,result){
            Session.set('score', 0);
            if(error)
                console.log(error);
            Router.go('quizHome');
        })
    }
})