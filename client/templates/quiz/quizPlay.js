Template.quizPlay.events({
    'click .answer':function(e,template){
        e.preventDefault();
        var quizAnswer = $(e.target).val();
        console.log(template.data[template.data.answer]);
        console.log(template);
        if(quizAnswer === template.data[template.data.answer]){
                console.log('correct answer');
                var postattributes = {
                        _id:template.data._id
                }
                Meteor.call('quizCorrectAnswer', postattributes, function(error,result){
                        if(error)
                                console.log(error);
                        Router.go('quizPlay', {continent:template.data.continent});        
                })
                
        }
    }
});

Template.quizPlay.helpers({
    'question':function(){
        console.log('hi');
        // var ids = Session.get('ids');
        // console.log(ids);
        // console.log(ids.length);
        // var randomId = Math.floor(Math.random()*ids.length)+1;
        // console.log(randomId)
        // var question = Questions.findOne({_id:ids[randomId]});
        // console.log(question);
        // return question;
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