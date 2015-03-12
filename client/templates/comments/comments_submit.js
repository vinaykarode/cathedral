Template.commentsSubmit.created = function(){
    Session.set('commentSubmitErrors', '');
}

Template.commentsSubmit.events({
    'submit form': function(e, template){
        e.preventDefault();
        
        var $body = $(e.target).find('[name=body]');
        var comment = {
            body:$body.val(),
            postId:template.data._id
        };
        
        Meteor.call('commentInsert', comment, function(error, result){
            if(error){
                alert(error.reason);
            }else{
                $body.val('');
            }
        });
    }
})