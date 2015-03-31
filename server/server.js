//
//    function delayedMessage(message,callback) {
//        Meteor.setInterval(function() {
//            callback(null, message)
//            console.log('im inside too');
//        }, 2000)
//    }
//
//var wrappedDelayedMessage = Meteor.wrapAsync(delayedMessage);
//
//Meteor.methods({
//    abc:function(message){
//        return wrappedDelayedMessage(message);
//    }
//})