var error,leadboardPlayersLength;
var ranks,final;

Template.lead.helpers({
    'score':function(){
        return Session.get('score');
    },
    'leaderboard':function(){
        if(Session.get('playerNameEntered') === 0){
//            ranks = [];
            var players = Leaderboard.find({continent:Session.get('selectedContinent')},{sort:{playerScore:-1},limit:5})
            var play =players.collection._docs._map
            leadboardPlayersLength = Object.keys(play).length;
            var keys = Object.keys(play)
            console.log(play[keys])
    //        console.log(Object.keys(play));
    //        console.log(play[keys[0]]);
            final =[];
            for(i = 0; i<leadboardPlayersLength;i++){
    //            play[keys[i]].playerRank = i+1;
                 final.push(play[keys[i]])
                 console.log(final);
            }
            final.sort(function(a,b){return b.playerScore - a.playerScore})
            for(i=0;i<leadboardPlayersLength;i++){
                final[i].playerRank = i+1;
            }
            console.log(final)
            return players   
        }
        
        if(Session.get('playerNameEntered') === 1){
            var playerCurrentScore = Session.get('score');
            var playersRankedHigher = Leaderboard.find({continent:Session.get('selectedContinent'), playerScore:{$gt:playerCurrentScore}}).count();
            console.log(playersRankedHigher);
            var playersRankedLower = Leaderboard.find({continent:Session.get('selectedContinent'), playerScore:{$lte:playerCurrentScore}},{sort:{playerScore:-1,submitted:-1}, limit:6}).fetch();
            console.log('playersranked low')
            console.log(playersRankedLower)
            
//            var play = playersRankedLower.collection._docs._map
//            console.log(play)
//            leadboardPlayersLength = Object.keys(play).length;
//            var keys = Object.keys(play)
//            final= [];
//            for(i=0;i<leadboardPlayersLength;i++){
//                final.push(play[keys[i]])
////                console.log(final);
//            }
            console.log(playersRankedLower.length)
            
            playersRankedLower.sort(function(a,b){return b.playerScore - a.playerScore})
            for(i=0;i<playersRankedLower.length;i++){
                playersRankedHigher += 1
                playersRankedLower[i].playerRank = playersRankedHigher;
                console.log(playersRankedLower)
            }
//            console.log(final)
            return playersRankedLower
        }
    },
    'playerNameEntered':function(){
        return Session.get('playerNameEntered') ? "playerNameEntered" : "css-input"
    },
    'disabled':function(){
        return Session.get('playerNameEntered') ? "disabled" : ""        
    },
    'btnlead':function(){
        return Session.get('playerNameEntered') ? "btnlead2" : "btnlead"
    },
    'error': function(){
        return Session.get('error');
    }
})


Template.leaderboard.events({
      'click .startQuizConquest':function(e,template){
        e.preventDefault();
        Session.set('counter',0);
        UI._globalHelpers['removeCountDown']();
        Meteor.call('quizReset', function(error,result){
            Session.set('score', 0);
            if(error)
                console.log(error);
            Router.go('quizHome');
        })
    },  
})

Template.lead.events({
    'submit form':function(e,template){
        e.preventDefault();
        
        var leaderboard = {
            playerName: $(e.target).find('[name=playerName]').val(),
            schoolCompanyName: $(e.target).find('[name=schoolCompanyName]').val(),
            continent: Session.get('selectedContinent'),
            playerScore:Session.get('score'),
        }
        
    Meteor.call('leaderboardInsert', leaderboard, function(err,result){
            if(err){
                console.log(err.reason);
                Session.set('error',err.reason);
                return error
            }
            if(result){
                 Session.set('playerNameEntered', 1);
                Session.set('error','');
                final.length = 0;
                console.log('from the metor callback final arry is');
                console.log(final)
//                console.log('player name is entered and session chagned'+Session.get('playerNameEntered'))
            }
        })
    }
})