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

Template.banner2.rendered = function(){
	var snap = Snap('#banner2'),
		all = snap.select('#all');

	// airfly();

	function airfly() {
		all.stop().animate({transform:'t-500 0 12'}, 5000)
	}


var fview = FView.from(this);

// fview.modifier.setAlign([0.5,.5]);


function move(){

  fview.modifier.setTransform(
  	  Transform.translate(-100, 0, 0),
  { duration : 10000 }, function(){
console.log('im done')
	Transform.translate(100,0,0)
  }
  );
}

// Timer.setInterval(move(),30000);

}