Template.windmill.rendered = function(){
var windmill = Snap('#windmill'),
    base = windmill.select('#base'),
    sails=windmill.select('#sails')

	// Sun events
	millRotate();

	// Infinite animation for the sun rays
	function millRotate(){
		sails.stop().animate({ transform: 'r360,40,41.5'}, // Basic rotation around a point. No frills.
			25000, // Nice slow turning rays
			function(){ 
				sails.attr({ transform: 'rotate(0 40 41.5)'}); // Reset the position of the rays.
				millRotate(); // Repeat this animation so it appears infinite.
			}
		);
	
	}
    
    
}