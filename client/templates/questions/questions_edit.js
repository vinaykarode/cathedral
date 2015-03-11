Template.questionsEdit.events({
    'change .radio':function(e, template){
    e.preventDefault();
    var radio = template.find('input:radio[name=correct]:checked');
    Session.set("radioEditSelected", $(radio).val());
    // console.log($(radio).val());
    },
    'submit form': function(e){
        e.preventDefault();
        var currentQuestionId = this._id;
        var question = {
            question: $(e.target).find('[name=question]').val(),
            optA:$(e.target).find('[name=optA]').val(),
            optB:$(e.target).find('[name=optB]').val(),
            optC:$(e.target).find('[name=optC]').val(),
            optD:$(e.target).find('[name=optD]').val(),
            answer: $(e.target).find('[name=correct]:checked').val(),
            continent: $(e.target).find('[name="continent"]:selected').val(),
        }
        
        Questions.update(currentQuestionId, {$set:question}, function(error){
            if(error){
                alert(error.reason);
            }
            else{
                Router.go('questionsPage', {_id:currentQuestionId});
                Session.set('radioEditSelected', '');
            }
        })
    },
    'click .delete':function(e){
        e.preventDefault();
        
        if(confirm('Delete this Question?')){
            var currentQuestionId = this._id;
            Questions.remove(currentQuestionId);
            Router.go('questionsList');
        }
    }
});

Template.questionsEdit.helpers({
    'selectedContinent':function(continent){
        if(continent === this.continent){
            return "selected"
        }
    },
    'selectedEditClass':function(opt){
        if(opt === this.answer && !Session.get('radioEditSelected')){
            return "selected"
        }
        if(opt === Session.get('radioEditSelected')){
            return "selected"
        }
    },
    'checkedOpt':function(opt){
        if(opt === this.answer){
            return 'checked'
        }
    }
});