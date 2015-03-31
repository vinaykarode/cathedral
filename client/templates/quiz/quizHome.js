var interval = Meteor.setInterval(function() {

    if(Session.get('counter') === 0){
        Meteor.clearInterval(interval);
    }
    if(Session.get('counter') <= 15){
            var counter = Session.get('counter') - 1;
            Session.set('counter',counter);
            console.log(Session.get('counter')); 
            if(counter <= 0){
            Session.set('counter',0);
            }
    }
//            Meteor.clearInterval(interval);
            return;
        }, 1000) 

Template.quizHome.events({
    'click .btn':function(){
        console.log('inside start');
        var message = 'hi this is your client'
        Session.set('counter',15);
//        Meteor.call('abc',message,function(error, response){
//            var timeup = response;
//            
//            console.log(response);
//            return;
//        })
        
//        interval();  
//        
//        var counter = 0;
//        var interval = Meteor.setInterval(function() {
//            counter = counter + 1;
//            console.log(counter);
////            Meteor.clearInterval(interval);
//            return;
//        }, 1000)
    }
})