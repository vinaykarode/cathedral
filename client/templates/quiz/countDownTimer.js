Template.countDownTimer.rendered = function () {
    console.log('countdown tiemr rendereing')
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


// create the main context
var mainContext = Engine.createContext();

    
    //render box

  // var mainContext = Engine.createContext();
  mainContext.setPerspective(3000);
  
  var quaternion = new Quaternion(1, 0, 0, 0);
  var moveQuaternion = new Quaternion(185, 0, 0, 0);

  // This is where the rotation is created
  Engine.on('prerender', function() {
    // You combine rotations through quaternion multiplication
    quaternion = quaternion.multiply(moveQuaternion);
    // console.log('quaternion', quaternion);
  });
    
  
  var transitionable = new Transitionable(0);
  var transitionable1 = new Transitionable(0);
    
  var rotationModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.7, 0.2],
    transform: function() {
        // cache the value of transitionable.get()
        // to optimize for performance
        var x = transitionable.get();
        return Transform.rotateX(x);
    },
  });

    var unitsPlaceRotationModifier = new Modifier({
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

  
    Engine.on('click',function(){
        console.log('clicked 3d box');
        var x = transitionable.get() + Math.PI*2
        transitionable.set(x, {
          duration: 1000, curve: Easing.outBounce
        });
    })

var createdBox = createBox(130,130,130)
var createdBox1 = createBox(130,130,130)
mainContext.add(rotationModifier).add(createdBox);
mainContext.add(unitsPlaceRotationModifier).add(createdBox1);
    
    var counter = 15;
    var transitioned = 1;
    var transitioned1 = 1;
   Timer.setInterval(function() {
       counter -= 1;
    console.log(counter);
    if(counter >= 10){
        createdBox._child[0]._child._object.setContent('1')
        var unitsValue = counter % 10;
        console.log(unitsValue)
        createdBox1._child[0]._child._object.setContent(unitsValue)
    }
    if(counter < 10 && transitioned == 1){
        createdBox._child[3]._child._object.setContent('0')
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
           createdBox1._child[3]._child._object.setContent(counter)
       }
//        createdBox._child[0]._child._object.setContent( --counter)
    }, 1000);
    


    
    
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
        backgroundColor: '#ddd',
        overflow: 'hidden',
        color: '#777',
        fontSize:'100px',
        fontFamily:'Raleway',
        fontWeight:'200'
        },
        transform:Transform.translate(0,0,depth/2)
      });
      //back
      createSide({
        size:[width,height],
        content:'back',
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
        content:'top',
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
        content:'bottom',
        properties:{
        lineHeight: depth + 'px',
        textAlign: 'center',
        backgroundColor: '#ddd',
        overflow: 'hidden',
        color: '#777',
        fontSize:'100px',
        fontFamily:'Raleway',
        fontWeight:'200'
        },
        transform:Transform.multiply(Transform.translate(0,height/2,0), Transform.multiply(Transform.rotateX(-Math.PI/2),Transform.rotateZ(Math.PI*2)))
      });
      
      //right
      createSide({
        size:[depth,height],
        content:'right',
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
        content:'left',
        properties:{
        lineHeight: height + 'px',
        textAlign: 'center',
        backgroundColor: '#333',
        overflow: 'hidden',
        color: '#777'          
        },
        transform:Transform.multiply(Transform.translate(-width/2,0,0), Transform.rotateY(-Math.PI/2))
      });
      
      return box;
      
    }
console.log(createdBox._child)

};
