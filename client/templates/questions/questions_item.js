Template.questionsItem.helpers({
    'ownPost':function(){
        return this.userId === Meteor.userId();
    }
    // 'commentsCount':function(){
    //     return Questions.find({postId: this._id}).count();
    // }
})