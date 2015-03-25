Template.quizPlay.events({
    'click .answer':function(e,template){
        e.preventDefault();
        var answer = $(e.target).val();
        console.log(answer);
    }
})