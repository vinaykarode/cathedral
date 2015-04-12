
Template.quizPlay.events({
    'click .answer': function(e, template) {
        e.preventDefault();
        var quizAnswer = $(e.target).val();
        console.log(template.data[this.answer]);
        if (quizAnswer === template.data[this.answer]) {
            Session.set('counter',15);
//            run(Session.get('counter')/100); /* reset the counter to start from 15 sec */
            UI._globalHelpers['stopTimer']();
            UI._globalHelpers['startTimer'](15);
            console.log('correct answer');
            var postattributes = {
                _id: template.data._id
            }
            Meteor.call('quizCorrectAnswer', postattributes, function(error, result) {
                if (error)
                    console.log(error);
                if (result) {
                    var easyCounter = Session.get('questionEasyCounter') + 1;
                    Session.set('questionEasyCounter', easyCounter);
                    console.log('easy counter' + Session.get('questionEasyCounter'));
                    if(Session.get('questionEasyCounter') >= 2){
                        Session.set('quizDifficulty','normal');
                        var normalCounter = Session.get('questionNormalCounter') + 1;
                        Session.set('questionNormalCounter', normalCounter);
                        console.log('Normal counter' + Session.get('questionNormalCounter'));
                        if(Session.get('questionNormalCounter') >= 3){
                            Session.set('quizDifficulty','difficult');
                            console.log('difficult counter' + Session.get('quizDifficultCounter'));
                            return Router.go('quizPlay', {continent: template.data.continent});
                        }
                        return Router.go('quizPlay', {continent: template.data.continent});
                    }
                    Router.go('quizPlay', {continent: template.data.continent});
                }
            });
        }
            else {
            Session.set('counter',15);
//            run(Session.get('counter')/100); /* reset the counter to start from 15 sec */
                UI._globalHelpers['stopTimer']();
                UI._globalHelpers['startTimer'](15);
            console.log('incorrect answer');
            var postattributes = {
                _id: template.data._id
            }
            Meteor.call('quizCorrectAnswer', postattributes, function(error, result) {
                if (error)
                    console.log(error);
                if (result) {
                    Session.set('questionEasyCounter',0);
                    Session.set('questionNormalCounter',0);
                    Session.set('questionDifficultCounter',0);
                    Session.set('quizDifficulty','easy');
                    //console.log(result);
                    Router.go('quizPlay', {continent: template.data.continent});
                }
            });
        } 
    },
    
    'click .quizReset':function(e,template){
        e.preventDefault();
        Session.set('counter',0);
        UI._globalHelpers['removeCountDown']();
        Meteor.call('quizReset', function(error,result){
            if(error)
                console.log(error);
            Router.go('quizHome');
        })
    }
});

Template.quizPlay.helpers({
    'questionWith': function() {
        return {
            question: this.question,
            optA: this.optA,
            optB: this.optB,
            optC: this.optC,
            optD: this.optD,
            answer: this.answer,
            difficult:this.difficult
        }
    }
});

