
Template.quizPlay.events({
    'click .answer': function(e, template) {
        e.preventDefault();
        var quizAnswer = $(e.target).val();
        console.log(template.data[this.answer]);
        if (quizAnswer === template.data[this.answer]) {
            Session.set('counter',15);
            Session.set('questionsDisplayed', Session.get('questionsDisplayed') +1); 
        
            if(Session.get('quizDifficulty') === 'easy'){
                var timeBonus = Session.get('counterForScore')
                Session.set('score', Session.get('score')+10 + timeBonus);
                console.log('score' + Session.get('score'));
            }  
            if(Session.get('quizDifficulty') === 'normal'){
                var timeBonus = Session.get('counterForScore')
                Session.set('score', Session.get('score')+20 + timeBonus);
                console.log('score' + Session.get('score'));
            } 
            if(Session.get('quizDifficulty') === 'difficult'){
                var timeBonus = Session.get('counterForScore')                
                Session.set('score', Session.get('score')+30 + timeBonus);
                console.log('score' + Session.get('score'));
            }
//            run(Session.get('counter')/100); /* reset the counter to start from 15 sec */
            
            UI._globalHelpers['stopTimer']();
            UI._globalHelpers['startTimer'](15);
            UI._globalHelpers['scoreChange']();
            
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
                                if(Session.get('questionsDisplayed') >= 10){
                                    UI._globalHelpers['removeCountDownWithoutScore']();
                                    console.log('going to leaderboard');
                                    return Router.go('leaderboard');
                                }
                                  return Router.go('quizPlay', {continent: template.data.continent});  
                        }
                        if(Session.get('questionsDisplayed') >= 10){
                            UI._globalHelpers['removeCountDownWithoutScore']();
                            console.log('going to leaderboard');
                            return Router.go('leaderboard');
                        }
                          return Router.go('quizPlay', {continent: template.data.continent});  
                    }
                    if(Session.get('questionsDisplayed') >= 10){
                        UI._globalHelpers['removeCountDownWithoutScore']();
                        console.log('going to leaderboard');
                        return Router.go('leaderboard');
                    }
                      return Router.go('quizPlay', {continent: template.data.continent});  
                }
            });
        }
            else {
            Session.set('counter',15);
//            run(Session.get('counter')/100); /* reset the counter to start from 15 sec */
                Session.set('questionsDisplayed', Session.get('questionsDisplayed') +1); 
                
                var timeBonus = Session.get('counterForScore')
                Session.set('score', Session.get('score')+ timeBonus);
                console.log('score' + Session.get('score'));
                
                UI._globalHelpers['stopTimer']();
                UI._globalHelpers['startTimer'](15);
                UI._globalHelpers['scoreChange']();
                
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
                    if(Session.get('questionsDisplayed') >= 10){
                        UI._globalHelpers['removeCountDownWithoutScore']();
                        return Router.go('leaderboard');                            
                    }
                      return Router.go('quizPlay', {continent: template.data.continent});  
                }
            });
        } 
    },
    
    'click .restartQuizBanner':function(e,template){
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

