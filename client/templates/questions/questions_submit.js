Template.questionsSubmit.events({
    'submit form': function(e){
        e.preventDefault();
        
        var question = {
            question: $(e.target).find('[name=question]').val(),
            optA:$(e.target).find('[name=optA]').val(),
            optB:$(e.target).find('[name=optB]').val(),
            optC:$(e.target).find('[name=optC]').val(),
            optD:$(e.target).find('[name=optD]').val(),
            answer: $(e.target).find('[name=correct]:checked').val(),
            continent: $(e.target).find('[name="continent"]:selected').val(),
        }
        
        // question._id = Questions.insert(question);
        // Router.go('questionsPage', question)
        
        // console.log(question);
        
        Meteor.call('questionsInsert', question, function(error, result){
            //display error
            if(error)
                return alert(error.reason);
            Router.go('questionsPage', {_id:result._id});
        })
        
    }
})