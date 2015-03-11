Template.questionsItem.helpers({
    'correct':function(opt){
        var option = Questions.findOne({_id: this._id});
        if(opt === option.answer){
            // console.log(option.answer);
            return 'list-group-item-success'
        }
    }
})