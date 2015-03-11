Template.questionsItem.helpers({
    'ownPost':function(){
        return this.userId === Meteor.userId();
    }
})