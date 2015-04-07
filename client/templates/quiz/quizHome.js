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
    },
    
    'click #europe':function(){
    console.log('in europe');
        Router.go('quizPlay',{continent:'europe'});
},
     'click #asia':function(){
    console.log('in asia');
        Router.go('quizPlay',{continent:'asia'});
},
     'click #africa':function(){
    console.log('in africa');
        Router.go('quizPlay',{continent:'africa'});
},
     'click #australia':function(){
    console.log('in australia');
        Router.go('quizPlay',{continent:'australia'});
},
     'click #north_america':function(){
    console.log('in north_america');
        Router.go('quizPlay',{continent:'nAmerica'});
},
     'click #south_america':function(){
    console.log('in south_america');
        Router.go('quizPlay',{continent:'sAmerica'});
}
    
});

//(function(){
Template.quizHome.rendered=function(){
  var continentSvg = Snap('#continent-map'),
    europe = continentSvg.select('#europe'),
    asia=continentSvg.select('#asia'),
    north_america = continentSvg.select('#north_america'),
    south_america = continentSvg.select('#south_america'),
    africa = continentSvg.select('#africa'),
    australia = continentSvg.select('#australia');


    europe.hover(inContinent,outContinent);
    asia.hover(inContinent,outContinent);
    australia.hover(inContinent,outContinent);
    africa.hover(inContinent,outContinent);
    north_america.hover(inContinent,outContinent);
    south_america.hover(inContinent,outContinent);
    
    function inContinent(){
        this.attr({fill:'green'})
    }
    function outContinent(){
        this.attr({fill:'#cccccc',stroke:'#ffffff',strokewidth:'0.1'})
    }
}

  





