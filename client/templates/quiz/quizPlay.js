Template.quizPlay.events({
    'click .answer': function(e, template) {
        e.preventDefault();
        var quizAnswer = $(e.target).val();
        console.log(template.data[this.answer]);
        if (quizAnswer === template.data[this.answer]) {
            console.log('correct answer');
            var postattributes = {
                _id: template.data._id
            }
            Meteor.call('quizCorrectAnswer', postattributes, function(error, result) {
                if (error)
                    console.log(error);
                if (result) {
                    //console.log(result);
                    Router.go('quizPlay', {continent: template.data.continent});
                }
            });
        } else {
            console.log('incorrect answer');
            var postattributes = {
                _id: template.data._id
            }
            Meteor.call('quizCorrectAnswer', postattributes, function(error, result) {
                if (error)
                    console.log(error);
                if (result) {
                    //console.log(result);
                    Router.go('quizPlay', {continent: template.data.continent});
                }
            });
        }
    },
    
    'click .quizReset':function(e,template){
        e.preventDefault();
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
            answer: this.answer
        }
    }
});

// Template.quizPlay.rendered= function(){
//     console.log(Session.get('selectedContinent'));
//     var quizQuestion = $('.quizQuestion').text();
//     console.log(quizQuestion);
//     if(!quizQuestion){
//         Router.go('quizPlay',{continent:Session.get('selectedContinent')});
//     }

// };