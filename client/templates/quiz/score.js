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

var timer;
var rotHun1 = 0;
var score =0;
var minus = 0;
var  rotHun =0;
function scoreChangefn(){
     timer = Timer.setInterval(scoreinc, 50);

    function scoreinc(){
        if(score < Session.get('score')){
             score += 1;
             minus += 1;
             if(minus >= 10){
                 console.log('minus');
                 minus = 0;
                rotHun1 += 1;
                 if(rotHun1 >3){
                     rotHun1 = 0;
                 }
                 if(rotHun1 === 0){
                     rotHun = 3
                 }
                 if(rotHun1 === 1){
                     rotHun = 0
                 }
                 if(rotHun1 === 2){
                     rotHun = 1
                 }
                 if(rotHun1 === 3){
                     rotHun = 2
                 }
                 
                 
                 console.log('rothun' + rotHun1)
                    var x = transitionableScore2.get() - Math.PI/2
                    transitionableScore1.set(x, {
                      duration: 300, curve: Easing.outBounce
                    });
                    transitionableScore2.set(x, {
                      duration: 300, curve: Easing.outBounce
                    });
                 transitionableScore0.set(x, {
                      duration: 300, curve: Easing.outBounce
                    });
                 
                    createdBoxScore0._child[rotHun]._child._object.setProperties({boxShadow:'0px 0px 0px #000'})
                    createdBoxScore1._child[rotHun]._child._object.setProperties({boxShadow:'0px 0px 0px #000'})
                    createdBoxScore2._child[rotHun]._child._object.setProperties({boxShadow:'0px 0px 0px #000'})
//                    
                    createdBoxScore0._child[rotHun1]._child._object.setProperties({boxShadow:'10px 10px 40px #888888'})
                    createdBoxScore1._child[rotHun1]._child._object.setProperties({boxShadow:'10px 10px 40px #888888'})
                    createdBoxScore2._child[rotHun1]._child._object.setProperties({boxShadow:'10px 10px 40px #888888'})
             }    
             console.log(score);
         }
        if(score >= Session.get('score')){
            Timer.clear(timer);
            minus = 0;
        }
        
        if(score <= 99){
         var scoreUnits = score % 10;
         var scoreTens = Math.floor(score/10);    
         console.log(scoreTens+scoreUnits);
            for(var i = 0; i<=3; i++){
                 createdBoxScore0._child[i]._child._object.setContent('0');
                 createdBoxScore1._child[i]._child._object.setContent(scoreTens);
                 createdBoxScore2._child[i]._child._object.setContent(scoreUnits);
            }

     }
     if(score >= 100){
         var scoreUnits = score % 10;
         var scoreTens = Math.floor((score/10) % 10);
         var scoreHundreds = Math.floor(score/100);
         console.log(scoreHundreds+scoreTens+scoreUnits);
         for(var i = 0; i<=3; i++){
             createdBoxScore0._child[i]._child._object.setContent(scoreHundreds)
             createdBoxScore1._child[i]._child._object.setContent(scoreTens)
             createdBoxScore2._child[i]._child._object.setContent(scoreUnits)
         }
     }   
    }

}

Template.registerHelper('scoreChange',function(){
    scoreChangefn();
})

Template.registerHelper('removeScoreRenderer',function(){
    createdBoxScore0.render = function () { return null;}
    createdBoxScore1.render = function () { return null;}
    createdBoxScore2.render = function () { return null;}
})



Template.score.rendered = function(){
    console.log('rendering score');
    
    var mainContext = Engine.createContext();
    mainContext.setPerspective(5000);

    transitionableScore0 = new Transitionable(0);
    transitionableScore1 = new Transitionable(0);
    transitionableScore2 = new Transitionable(0);
    
    rotationModifierScore0 = new Modifier({
    origin: [0.5, 0.5],
    align: [0.1, 0.2],
    transform: function() {
        // cache the value of transitionable.get()
        // to optimize for performance
        var x0 = transitionableScore0.get();
        return Transform.rotateX(x0);
    },
    });
    
    rotationModifierScore1 = new Modifier({
    origin: [0.5, 0.5],
    align: [0.2, 0.2],
    transform: function() {
        // cache the value of transitionable.get()
        // to optimize for performance
        var x1 = transitionableScore1.get();
        return Transform.rotateX(x1);
    },
    });
    
    rotationModifierScore2 = new Modifier({
    origin: [0.5, 0.5],
    align: [0.3, 0.2],
    transform: function() {
        // cache the value of transitionable.get()
        // to optimize for performance
        var x2 = transitionableScore2.get();
        return Transform.rotateX(x2);
    },
    });
    
    createdBoxScore0 = createBox(130,130,130)
    createdBoxScore1 = createBox(130,130,130)
    createdBoxScore2 = createBox(130,130,130)
    mainContext.add(rotationModifierScore0).add(createdBoxScore0);
    mainContext.add(rotationModifierScore1).add(createdBoxScore1);
    mainContext.add(rotationModifierScore2).add(createdBoxScore2);
  
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
        content:'0',
        properties:{
        lineHeight: depth + 'px',
        textAlign: 'center',
        backgroundColor: '#26CFFF',
        overflow: 'hidden',
        color: '#fff',
        fontSize:'130px',
        fontFamily:'Raleway',
        fontWeight:'300',
        boxShadow:'10px 10px 40px #888888'
        },
        transform:Transform.translate(0,0,depth/2)
      });
              
      //top
      createSide({
        size:[width,depth],
        content:'',
        properties:{
        lineHeight: depth + 'px',
         backgroundColor: '#26CFFF',
        overflow: 'hidden',
        color: '#fff',
        fontSize:'130px',
        fontFamily:'Raleway',
        fontWeight:'300',
//        boxShadow:'10px 10px 40px #888888'          
        },
        transform:Transform.multiply(Transform.translate(0,-height/2,0), Transform.rotateX(Math.PI/2))
      })
      //back
      createSide({
        size:[width,height],
        content:'',
        properties:{
        lineHeight: depth + 'px',
        backgroundColor: '#26CFFF',
        overflow: 'hidden',
        color: '#fff',
        fontSize:'130px',
        fontFamily:'Raleway',
        fontWeight:'300',
//        boxShadow:'10px 10px 40px #888888'
        },
        transform: Transform.multiply(Transform.translate(0, 0, - depth / 2), Transform.multiply(Transform.rotateZ(Math.PI*2), Transform.rotateX(Math.PI))),
        // transform: Transform.multiply(Transform.translate(0, 0, - depth / 2), Transform.multiply(Transform.rotateZ(Math.PI), Transform.rotateX(Math.PI))),
        
      });

      //bottom
      createSide({
        size:[width,depth],
        content:'',
        properties:{
        lineHeight: depth + 'px',
        backgroundColor: '#26CFFF',
        overflow: 'hidden',
        color: '#fff',
        fontSize:'130px',
        fontFamily:'Raleway',
        fontWeight:'300',
//        boxShadow:'10px 10px 40px #888888'
        },
        transform:Transform.multiply(Transform.translate(0,height/2,0), Transform.multiply(Transform.rotateX(-Math.PI/2),Transform.rotateZ(Math.PI*2)))
      });
      
      //right
      createSide({
        size:[depth,height],
        content:'',
        properties:{
        lineHeight: depth + 'px',
        backgroundColor: '#26CFFF',
        overflow: 'hidden',
        color: '#fff',
        fontSize:'130px',
        fontFamily:'Raleway',
        fontWeight:'300',
//        boxShadow:'10px 10px 40px #888888'         
        },
        transform:Transform.multiply(Transform.translate(width/2,0,0), Transform.rotateY(Math.PI/2))
      });
      
      //left
      createSide({
        size:[depth,height],
        content:'',
        properties:{
        lineHeight: depth + 'px',
        backgroundColor: '#26CFFF',
        overflow: 'hidden',
        color: '#fff',
        fontSize:'130px',
        fontFamily:'Raleway',
        fontWeight:'300',
//        boxShadow:'10px 10px 40px #888888'         
        },
        transform:Transform.multiply(Transform.translate(-width/2,0,0), Transform.rotateY(-Math.PI/2))
      });
      
      return box;
      
    }
    
}