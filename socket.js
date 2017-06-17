const Socket = require('socket.io');

let user = function(name, socketID)
{
	this.ID = socketID;
	this.name = name;
	this.room = null;
}

let users = [];


module.exports = function (server){

	//envokes socket.io
	const IO = Socket(server);

	//listens for connection then executes callback
	IO.on("connection", OnConnection );

	// callback function for IO.on
	function OnConnection(socket)
	{
		//listens for incoming data named "message" from client
		socket.on("message", getMessage);

		socket.on("name", saveName);

		socket.on("room", joinRoom)
		
		function getMessage(data)
		{
			console.log("join rooms", socket.rooms);

			// finds and saves user by socket.id
			let currentUser = getUserByID(socket.id);

			console.log("currentUser.room", currentUser.room);
			//get room user is
			let room = currentUser.room;
			data.name = currentUser.name;

			//this send the data globally (to everyone)
			IO.sockets.in(room).emit("message", data);

		}

		function saveName(name)
		{
			users.push(new user(name, socket.id));

		}

		function joinRoom(room)
		{

			if(room == "")
				room = "Main";
			socket.join(room);
			console.log(socket.id, "joined", room + ".");
			getUserByID(socket.id).room = room; 

			IO.sockets.in(socket.id).emit("room", room);

		}

		// maybe this should be outside
		// function leaveRoom()
		// {
		// 	socket.leave(getUserByID(socket.id).room);

		// }


	}



	function getUserByID(id)
	{
		for(var i = 0; i < users.length; i++)
		{
			if(users[i].ID == id)
				return users[i];
		}	
		return "Anonymous"
	}

	



}// END module.exports