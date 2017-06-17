var	socket = io.connect(window.location.href);// gets location from window object

//listens for incomeing data named "message" from server
socket.on("message", addToChat );

socket.on("room", displayRoom );

//on click function
$('#message-form').submit(function(e){
	e.preventDefault();
	let message = $("#message").val().trim();	
	$("#message").val('');
	postMessage(message);
	
});

// handles log-in submit event.
$('#log-in').submit(function(e){
	e.preventDefault();
	let name = $("#log-in-name").val().trim();
	let room = $("#room").val().trim();
	postName(name, room);

	$("#log-in-name").val('');
	$('#log-in').hide();
	$('#message-form').css("display", "initial");

	
});

//function to sent to server
function postMessage(message)
{
	let data = {
		text: message
	};
	//this sends the data object to the server with the name "message"
	socket.emit('message', data);
}

function postName(name, room)
{
	//sends user input name to socket
	socket.emit('name', name);
	
	//sends user input room to socked
	socket.emit('room', room);
}


function addToChat(message)
{

	let p = $('<p>');
	p.html(message.name + "> "+ message.text);
	$("#chat-box").append(p);

	//this adjusts scroll to bottom of div.
 	let elem = document.getElementById('chat-box');
 	elem.scrollTop = elem.scrollHeight;

 	/*
	 	//Same as above but using Jquery.
	 	// .scrollHeight is a js property. so to get it in jquery we use .prop()
	 	let elem = $("#chat-box");
	 	elem.scrollTop(test.prop('scrollHeight'));
 	*/	
}

function displayRoom(room)
{
	console.log("room", room);

	let p = $('<p style="text-align: center">');
	p.html("You are in room: " + room);
	$("#chat-box").append(p);

	//this adjusts scroll to bottom of div.
 	let elem = document.getElementById('chat-box');
 	elem.scrollTop = elem.scrollHeight;

 
}