
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var ImageSurface = famous.surfaces.ImageSurface;
var RenderNode = famous.core.RenderNode;
var Quaternion = famous.math.Quaternion;
var Surface = famous.core.Surface;
var Easing = famous.transitions.Easing;
var Transitionable = famous.transitions.Transitionable;
var Timer = famous.utilities.Timer;

var transitionable, transitionable1, rotationModifier, unitsPlaceRotationModifier, createdBox, createdBox1, counter, transitioned, transitioned1, set;

 function startTimer() {
       counter -= 1;
     Session.set('counterForScore', counter);
    console.log(Session.get('counterForScore'));
    if(counter >= 10){
        createdBox._child[0]._child._object.setContent('1')
        var unitsValue = counter % 10;
        console.log(unitsValue)
        createdBox1._child[0]._child._object.setContent(unitsValue)
    }
    if(counter < 10 && transitioned == 1){
        createdBox._child[0]._child._object.setProperties({boxShadow:'0px 0px 0px #000'})
        createdBox._child[0]._child._object.setContent('')
        createdBox1._child[0]._child._object.setContent('')
        createdBox._child[3]._child._object.setContent('0')
        createdBox._child[3]._child._object.setProperties({backgroundColor:'#FF775E'})
        createdBox._child[3]._child._object.setProperties({boxShadow:'-10px 10px 40px #888888'})
        createdBox._child[5]._child._object.setProperties({backgroundColor:'#B22202'})
        createdBox._child[1]._child._object.setProperties({backgroundColor:'#B22202'})
        
        var x = transitionable.get() + Math.PI/2
        transitionable.set(x, {
          duration: 500, curve: Easing.outBounce
        });
        transitionable1.set(x, {
          duration: 500, curve: Easing.outBounce
        });
        
        transitioned = 0;
    }
       if(counter < 10 && transitioned1 == 1){
            createdBox1._child[0]._child._object.setProperties({boxShadow:'0px 0px 0px #000'})
           createdBox1._child[3]._child._object.setContent(counter)
            createdBox1._child[3]._child._object.setProperties({backgroundColor:'#FF775E'})
            createdBox1._child[3]._child._object.setProperties({boxShadow:'-5px 5px 40px #888888'})
            createdBox1._child[5]._child._object.setProperties({backgroundColor:'#B22202'})
            createdBox1._child[1]._child._object.setProperties({backgroundColor:'#B22202'})
       }
        
        if(counter <= 0){
            UI._globalHelpers['stopTimer']();
            UI._globalHelpers['startTimer'](15);
            var selectedContinent = Session.get('selectedContinent')
            Session.set('questionsDisplayed', Session.get('questionsDisplayed') +1); 
            var postattributes = {
                _id: Session.get('selectedID')
            }
            console.log('loading new question, timer expired' + selectedContinent+ postattributes._id);
            Meteor.call('quizCorrectAnswer', postattributes, function(error, result) {
              console.log('inside meteor call countdown timer')
                if (error)
                    console.log('method call error from countdowntimer'+error);
                if (result) {
                  console.log('got results from meteor call countdwn timer')
                    Session.set('questionEasyCounter',0);
                    Session.set('questionNormalCounter',0);
                    Session.set('questionDifficultCounter',0);
                    Session.set('quizDifficulty','easy');
                    //console.log(result);
                    if(Session.get('questionsDisplayed') >= 2){
                      UI._globalHelpers['removeCountDownWithoutScore']();
                      console.logI('going to leaderboard');
                      return Router.go('leaderboard');
                    }else{
                     return  Router.go('quizPlay', {continent: selectedContinent}); 
                    }
                }
            });
        }
    }



Template.registerHelper('startTimer', function(count){
       counter = count
     transitioned = 1;
     transitioned1 = 1;
      set = Timer.setInterval(startTimer, 1000);
})

Template.registerHelper('stopTimer', function(){
    Timer.clear(set);
    console.log(counter)
    createdBox1._child[0]._child._object.setContent('5')
    if(counter < 10 && transitioned == 0){
        var x = transitionable.get() - Math.PI/2
        transitionable.set(x, {
          duration: 500, curve: Easing.outBounce
        });
        transitionable1.set(x, {
          duration: 500, curve: Easing.outBounce
        });
        
        createdBox1._child[0]._child._object.setContent('5')
        createdBox._child[0]._child._object.setContent('1')
        createdBox1._child[3]._child._object.setProperties({backgroundColor:'#008BB2'})
        createdBox1._child[5]._child._object.setProperties({backgroundColor:'#008BB2'})    
        createdBox._child[3]._child._object.setProperties({backgroundColor:'#008BB2'})
        createdBox._child[5]._child._object.setProperties({backgroundColor:'#008BB2'})
        createdBox._child[3]._child._object.setProperties({boxShadow:'0px 0px 0px #000'})
        createdBox1._child[3]._child._object.setProperties({boxShadow:'0px 0px 0px #000'})
        createdBox._child[0]._child._object.setProperties({boxShadow:'-10px 10px 40px #888888'})
        createdBox1._child[0]._child._object.setProperties({boxShadow:'-10px 10px 40px #888888'})
    }  
})

Template.registerHelper('removeCountDown',function(){
    Timer.clear(set);
    UI._globalHelpers['removeScoreRenderer']();
    createdBox.render = function () { return null;}
    createdBox1.render = function () { return null;}
})

Template.registerHelper('removeCountDownWithoutScore',function(){
    Timer.clear(set);
    UI._globalHelpers['moveScoreForLeaderboard']();
    createdBox.render = function () { return null;}
    createdBox1.render = function () { return null;}
})


Template.countDownTimer.rendered = function () {
    console.log('countdown tiemr rendereing')
// create the main context
var mainContext = Engine.createContext();

    
    //render box

  // var mainContext = Engine.createContext();
  mainContext.setPerspective(5000);
  
  var quaternion = new Quaternion(1, 0, 0, 0);
  var moveQuaternion = new Quaternion(185, 0, 0, 0);

  // This is where the rotation is created
  Engine.on('prerender', function() {
    // You combine rotations through quaternion multiplication
    quaternion = quaternion.multiply(moveQuaternion);
    // console.log('quaternion', quaternion);
  });
    
  
   transitionable = new Transitionable(0);
   transitionable1 = new Transitionable(0);
    
   rotationModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.7, 0.2],
    transform: function() {
        // cache the value of transitionable.get()
        // to optimize for performance
        var x = transitionable.get();
        return Transform.rotateX(x);
    },
  });

     unitsPlaceRotationModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.8, 0.2],
    transform: function() {
        // cache the value of transitionable.get()
        // to optimize for performance
        var x1 = transitionable1.get();
        return Transform.rotateX(x1);
    },
  });
  // rotationModifier.transformFrom(rotate);
  
  // var x =0;
  // function rotate(){
  //   x+=-Math.PI * 0.01;
  //   if(x <= -1.5)
  //   {
  //     rotationModifier.setTransform(
  //       Transform.rotateX(x)
  //       );
  //   }
  //   console.log(x)
  //   return Transform.rotateX(x);
    
  // }

//  
//    Engine.on('click',function(){
//        console.log('clicked 3d box');
//        var x = transitionable.get() + Math.PI*2
//        transitionable.set(x, {
//          duration: 1000, curve: Easing.outBounce
//        });
//    })

 createdBox = createBox(130,130,130)
 createdBox1 = createBox(130,130,130)
mainContext.add(rotationModifier).add(createdBox);
mainContext.add(unitsPlaceRotationModifier).add(createdBox1);
    

    
//    timer();
    UI._globalHelpers['startTimer'](15);
 createdBox._child[0]._child._object.setContent('1')
 createdBox1._child[0]._child._object.setContent('5')
    
    Engine.on('keyup', function(e) {
    console.log('keyEvent',e.keyIdentifier);
    var x = quaternion.x;
    var y = quaternion.y;
    var z = quaternion.z;
    switch (e.keyIdentifier) {
      case 'Up':
        x = -1; y = 0; z = 0;
        break;
      case 'Down':
        x = 1; y = 0; z = 0;
        break;
      case 'Left':
        x = 0; y = 1; z = 0;
        break;
      case 'Right':
        x = 0; y = -1; z = 0;
        break;
      case 'Home':
        x = -1; y = 1; z = 0;
        break;
      case 'PageUp':
        x = -1; y = -1; z = 0;
        break;
      case 'End':
        x = 1; y = 1; z = 0;
        break;
      case 'PageDown':
        x = 1; y = -1; z = 0;
        break;
      case 'Clear':
        x = 0; y = 0; z = 0;
        break;
      default:
        x = 1; y = 1; z = 1;
    }
    moveQuaternion = new Quaternion(185, x, y, z);
  });
  
      

var boxsurface, box, frontSide;

    function createBox(width, height, depth){
       box = new RenderNode();
      
    function createSide(params){
       boxsurface = new Surface({
        size: params.size,
        content: params.content,
        classes: params.classes,
        properties: params.properties
      });

      var modifier = new Modifier({
        transform: params.transform
      });

      box.add(modifier).add(boxsurface);
    }
      
      //front
     frontSide = createSide({
        size:[width,height],
        content:'',
        properties:{
        lineHeight: depth + 'px',
        textAlign: 'center',
        backgroundColor: '#26CFFF',
        overflow: 'hidden',
        color: '#fff',
        fontSize:'130px',
        fontFamily:'Raleway',
        fontWeight:'300',
        boxShadow:'-10px 10px 40px #888888'
        },
        transform:Transform.translate(0,0,depth/2)
      });
      //back
      createSide({
        size:[width,height],
        content:'',
        properties:{
        lineHeight: height + 'px',
        textAlign: 'center',
        backgroundColor: '#ff0',
        fontSize: '18px',
        overflow: 'hidden',
        color: '#777'
        },
        transform: Transform.multiply(Transform.translate(0, 0, - depth / 2), Transform.multiply(Transform.rotateZ(Math.PI), Transform.rotateX(Math.PI))),
        // transform: Transform.multiply(Transform.translate(0, 0, - depth / 2), Transform.multiply(Transform.rotateZ(Math.PI), Transform.rotateX(Math.PI))),
        
      });
      
      //top
      createSide({
        size:[width,depth],
        content:'',
        properties:{
        lineHeight: depth + 'px',
        textAlign: 'center',
        backgroundColor: '#0cf',
        overflow: 'hidden',
        color: '#600'          
        },
        transform:Transform.multiply(Transform.translate(0,-height/2,0), Transform.rotateX(Math.PI/2))
      })
      
      //bottom
      createSide({
        size:[width,depth],
        content:'',
        properties:{
        lineHeight: depth + 'px',
        textAlign: 'center',
        backgroundColor: '#008BB2',
        overflow: 'hidden',
        color: '#fff',
        fontSize:'130px',
        fontFamily:'Raleway',
        fontWeight:'300'
        },
        transform:Transform.multiply(Transform.translate(0,height/2,0), Transform.multiply(Transform.rotateX(-Math.PI/2),Transform.rotateZ(Math.PI*2)))
      });
      
      //right
      createSide({
        size:[depth,height],
        content:'',
        properties:{
        lineHeight: height + 'px',
        textAlign: 'center',
        backgroundColor: '#555',
        overflow: 'hidden',
        color: '#777',          
        },
        transform:Transform.multiply(Transform.translate(width/2,0,0), Transform.rotateY(Math.PI/2))
      });
      
      //left
      createSide({
        size:[depth,height],
        content:'',
        properties:{
        lineHeight: height + 'px',
        textAlign: 'center',
        backgroundColor: '#008BB2',
        overflow: 'hidden',
        color: '#777'          
        },
        transform:Transform.multiply(Transform.translate(-width/2,0,0), Transform.rotateY(-Math.PI/2))
      });
      
      return box;
      
    }
console.log(createdBox._child)

};
