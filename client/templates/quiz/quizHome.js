Meteor.startup(function(){

})




// var interval = Meteor.setInterval(function() {
// console.log('setting interval', Session.get('counter'));
//     if(Session.get('counter') === 0){
//         Meteor.clearInterval(interval);
//         console.log('cleared interval');
//     }
//     if(Session.get('counter') <= 15){
//             var counter = Session.get('counter') - 1;
//             Session.set('counter',counter);
//             console.log(Session.get('counter')); 
//             if(counter <= 0){
//             Session.set('counter',0);
//             }
//     }
// //            Meteor.clearInterval(interval);
//             return;
//         }, 1000) 


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
        Session.set('counter',15);
        console.log('in europe', Session.get('counter'));
        Router.go('quizPlay',{continent:'europe'});
},
     'click #asia':function(){
        Session.set('counter',15);
        console.log('in asia', Session.get('counter'));        
        Router.go('quizPlay',{continent:'asia'});
},
     'click #africa':function(){
    console.log('in africa');
        Session.set('counter',15);
        Router.go('quizPlay',{continent:'africa'});
},
     'click #australia':function(){
    console.log('in australia');
        Session.set('counter',15);
        Router.go('quizPlay',{continent:'australia'});
},
     'click #north_america':function(){
    console.log('in north_america');
        Session.set('counter',15);
        Router.go('quizPlay',{continent:'nAmerica'});
},
     'click #south_america':function(){
    console.log('in south_america');
        Session.set('counter',15);
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
    
    // this.find('#continent-map')._uihooks = {
    //     insertElement: function(node, next) {
    //     console.log('inserting element');
    //         $(node)
    //             .hide()
    //             .insertBefore(next)
    //             .fadeIn();
    //     },
    //     removeElement : function(node, next){
    //     console.log('removing element');
    //         $(node).fadeOut(function(){
    //             console.log('faded out');
    //             this.remove();
    //         });
    //     }
    // };
    
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var ImageSurface = famous.surfaces.ImageSurface; 
var Surface = famous.core.Surface;
var Easing = famous.transitions.Easing;
var StateModifier = famous.modifiers.StateModifier;
var Transitionable = famous.transitions.Transitionable;
var SpringTransition = famous.transitions.SpringTransition;
Transitionable.registerMethod('spring', SpringTransition);

// create the main context
var mainContext = Engine.createContext();

// your app here
var logo = new ImageSurface({
    size: [100, 100],
    content: 'http://code.famo.us/assets/famous_logo.png',
    classes: ['double-sided']
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    // transform : function () {
    //     return Transform.rotateY(.002 * (Date.now() - initialTime));
    // }
});

// mainContext.add(centerSpinModifier).add(logo);
// mainContext.add(logo);
   
var statemodifier = new StateModifier({
    origin:[0.5,0],
    align:[0.5,0]
});

// statemodifier.setTransform(
//     Transform.translate(0,400,0),{duration:10000, curve:Easing.outBounce}
//     );

mainContext.add(statemodifier).add(logo);

// logo.on('click',function(){
//     statemodifier.halt();
//     statemodifier.setTransform(
//         Transform.translate(0,500,0),{duration:400, curve:Easing.outBounce}
//         );
// })

var spring = {
  method: 'spring',
  period: 500,
  dampingRatio: 0.4
};

logo.on('mouseover',function(){
statemodifier.setTransform(
    Transform.translate(0,500,0),spring
    ).setTransform(
    Transform.scale(2,2,1),{}
    );
    
})

}

  





