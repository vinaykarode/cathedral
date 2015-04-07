
Template.quizPlay.events({
    'click .answer': function(e, template) {
        e.preventDefault();
        var quizAnswer = $(e.target).val();
        console.log(template.data[this.answer]);
        if (quizAnswer === template.data[this.answer]) {
            Session.set('counter',15);
            run(Session.get('counter')/100); /* reset the counter to start from 15 sec */
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
            run(Session.get('counter')/100); /* reset the counter to start from 15 sec */
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

Template.quizPlay.rendered = function(){

         canvasSize = 200,
        centre = canvasSize/2,
        radius = canvasSize*0.8/2,
        s = Snap('#svgCountDown'),
        path = "",
        arc = s.path(path),    
        startY = centre-radius,
        // runBtn = document.getElementById('run'),
        percDiv = document.getElementById('time'),
        input = document.getElementById('input');

        run(Session.get('counter')/100);
        
       this.find('.wrapperquizquestions')._uihooks = {
            insertElement: function(node, next) {
            console.log('inserting element');
                $(node)
                    .hide()
                    .insertBefore(next)
                    .fadeIn();
            },
            removeElement : function(node, next){
            console.log('removing element');
                $(node).fadeOut(function(){
                    console.log('faded out');
                    this.remove();
                });
            }
        };
    
};

var canvasSize, centre, radius, s, path, arc, startY, percDiv, input;

function run(time) {
    var endpoint = (time*360)+(360-(time*360));

    Snap.animate(endpoint, 0,   function (val) {
        arc.remove();

        var d = val,
            dr = d-90;
            radians = Math.PI*(dr)/180,
            endx = centre + radius*Math.cos(radians),
            endy = centre + radius * Math.sin(radians),
            largeArc = d>180 ? 1 : 0;  
            path = "M"+centre+","+startY+" A"+radius+","+radius+" 0 "+largeArc+",1 "+endx+","+endy;
  
        arc = s.path(path);
        arc.attr({
          stroke: '#3da08d',
          fill: 'none',
          strokeWidth: 12
        });
/*        percDiv.innerHTML =    Math.round(val/360*100) +'s';
*/      percDiv.innerHTML =    Math.round(val/(360/(time*100))) +'s';
		console.log(360/(time*100));
    }, (time * 100000), mina.linear);  
};


// Template.quizPlay.rendered= function(){
//     console.log(Session.get('selectedContinent'));
//     var quizQuestion = $('.quizQuestion').text();
//     console.log(quizQuestion);
//     if(!quizQuestion){
//         Router.go('quizPlay',{continent:Session.get('selectedContinent')});
//     }

// };

// var EVENTS, OFFSCREEN_CLASS, hooks;

// Template.quizPlay.rendered = function(){
//     return this.find('.wrapper-quiz-questions')._uihooks = {
//         insertElement : function(node, next){
//           $(node).addClass('off').insertBefore(next);
//           return Tracker.afterFlush(function() {
//             return $(node).removeClass('off');
//           });
//         }
//     }
// }

