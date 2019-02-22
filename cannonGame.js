//Stephen Green 11/28/2018
//Cannon Game


//Creating many global variables made the implementation of the game engine much simpler	
	var target;
	var ball;
	var cannon;
	var angle;
	var shots;
	var score;
	
	$(document).ready(function(){
		target = $("#target");
		ball = $("#ball");
		cannon = $("#cannon");
		shots = 10;
		score = 0;
		var audio = new Audio('RobloxDeathSoundEffect.mp3');
		
		
		var pos = 0;
		var goingRight = true;
		
		//Game Interval
		setInterval(function(){
		
		//Updates the textbox to dynamically change the score and shots respectively to give the user live updates
		$("#scoreTag").text("Score: " + score);
		$("#shotTag").text("Ice Cubes Remaining: " + shots);
		
		
		//Function to keep the target in a loop of going back and forth
		if(goingRight){
			pos+= 5;
		}
		else{
			pos -= 5;
		}
		if (pos > 1345){
			goingRight = false;
		}
		else if (pos < 15){
			goingRight = true;
		}
			updateTarget(pos);
		
		
		//Checks if you hit the target
		if (overlap(ball,target)){
			
			ball.animate({
			bottom: '95px',
			left: '50%',
			},10);
			
			//Changes the border to green to indicate direct hit and scoring shot
			//Also will update score and play sound effect
			target.css("borderColor", "lightgreen");
			score ++;
			audio.play();
			
			//Use a timeout to make the green highlight effect last long enough for the user to see
			setTimeout (function(){resetTarget();},1500);
			
		}
		
		//Will Display Victory Screen upon reach designated score
		if(score >= 25){
			var backPic = document.getElementById("scene");
			backPic.src = "penguins.jpg";
			$("#winBox").text("There's ICE in your FREEZER");
		}
		
		
		
		//Won't let the ball go off screen
		//Hasn't been helpful
		//The ball has to finish the animation before it can be reset and the first animation is set to fly off
		if (ball.left > '100'){
			console.log("going off screen");
			ball.animate({
				bottom: '95px',
				left: '50%',
			},10)
		}		
		
		//Game Interval
		},15)
		
		
		angle = 0;
		//All Three Arrow Key and user controls
		$(document).keydown(function(e){
			
			//Space Bar to shoot
			//No wait time if pressed multiple times it will queue shots up to number of times pressed
			//Waits until the ball returns before it can shoot again but if shots are in queue will auto shoot
			if ((e.which == 32) && (shots > 0)){
				shootBall()
			}
			
			
			//Rotate Left
			if (e.which == 37){
				rotateCannon(-15,angle);
			}
			
			//Rotate Right
			if (e.which == 39){
				rotateCannon(15,angle);
			}
			
		});
		
	
		
		
	
		
	//Document Ready Function
	})
	
	//Will Return the target to normal after a specific timeout
	//Indicates when target is ready to be hit again 
	function resetTarget(){
		target.css("borderColor", "black");
		
		
		
	}
	
	//Collision Function
	//Can take any two objects
	//Wasn't necassary to make it generic for this project since it only tests the ball and target
	//Wanted to see if I was able to make a generic function and test the limits of Javascript
	function overlap(a,b){
		
		//Starts off by declaring the six variables
		//Position by itself can get the top y and left values for the objects
		//But to get the bottom y and right x you can simply add the height or weight respectively to get the full shape and all 4 corners
		
		var posA, widthA, heightA, posB, widthB, heightB;
		posA = $(a).position();
		widthA = $(a).width();
		heightA = $(a).height();
		
		leftA = posA.left;
		rightA = posA.left + widthA;
		topA = posA.top;
		bottomA = posA.top + heightA;
		
		posB = $(b).position();
		widthB = $(b).width();
		heightB= $(b).height();
		
		leftB = posB.left;
		rightB = posB.left + widthB;
		topB = posB.top;
		bottomB = posB.top + heightB;
		
		
		
		//Checks if Object A is indeed inside of Object B
		if ((leftA > leftB) && (leftA < rightB) && (rightA > leftB) && (rightA < rightB) 
			&& (bottomA < bottomB) && ( topA > topB) && (bottomA > topA) ){
			return true;
		}
		
		
	}
	
	//Function that takes in a value to rotate the cannon by that many degrees
	function rotateCannon(rotation,start){
		start += rotation;
		cannon.css('transform','rotate('+start+'deg)');
		angle = start;
		
	}
	
	function updateTarget(left){
		target.css("left", left+"px");
		
		
	}
	
	
	//Most difficult function to implementation
	//Required a lot of trigonometry to get the angle to match up
	//Need to use sin and cos of the cannon angle to know which x and y values to add and they need to be added simultaneously
	//Both sin and cos operate only in radians so that conversion was a little tricky to figure out
	function shootBall(){
		var ball = $("#ball");
		var radAngle = ((angle * (Math.PI / 180) + (Math.PI/2)) * -1) + Math.PI;
		var y = 100 * Math.sin(radAngle);
		var x = 100 * Math.cos(radAngle);
		
		//Will shoot the ball all the way off screen
		//Needed to be shot that far to give it enough speed
		//The second animation will simply reset the ball back to neutral so it will be ready to shoot again
		ball.animate({
			bottom: "+="+y+"%",
			left: 	"+="+x+"%",
			
		}, 1200).animate({
			bottom: '95px',
			left: '50%',
		},10,function(){
			//Indicates if you did not reach desired score after 10 shots
			if ((shots <= 0) && (score < 25)){
				$("#gameOverBox").text("GAME OVER");
		}
		})
		shots--;
		
		

		
		
		
		
	}



	


//ball.fadeOut