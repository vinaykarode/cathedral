Template.windmill.rendered = function(){
var windmill = Snap('#windmill'),
    base = windmill.select('#base'),
    sails=windmill.select('#sails')

	// Sun events
	millRotate();

	// Infinite animation for the sun rays
	function millRotate(){
		sails.stop().animate(
			{ transform: 'r180,50,50'}, // Basic rotation around a point. No frills.
			10000, // Nice slow turning rays
			function(){ 
				sails.attr({ transform: 'rotate(0 42 42)'}); // Reset the position of the rays.
				millRotate(); // Repeat this animation so it appears infinite.
			}
		);
	
	}
    
    
}