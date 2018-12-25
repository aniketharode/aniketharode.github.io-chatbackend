const socket = io('http://localhost:3000');

let authToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ijd6UE9Kd2ptNiIsImlhdCI6MTU0MTA3NjU2NjUxNiwiZXhwIjoxNTQxMTYyOTY2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MjM3MjM4OCwiZW1haWwiOiJ2aXJhdDIwQGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiS29obGkiLCJmaXJzdE5hbWUiOiIiLCJ1c2VySWQiOiJaWEV1NW1sVzAifX0._YazHDBjwrqrJEkI04_exAbPIKrgTO3fUw3QqZY9eDs';
let userId = 'ZXEu5mlW0';

let chatMessage = {
    createdOn: Date.now(),
    receiverId: 'GTQuFXxgz',//putting user2's id here 
    receiverName: "Aniket",
    senderId: userId,
    senderName: "Virat"
  }

  let chatSocket = () => {
    socket.on('verifyUser', (data) => {

        console.log("socket trying to verify user");
    
        socket.emit("set-user", authToken);

        console.log("user2 is verify successfully");
    })

   
}

$('#send').on('click',() => {
  let messageText = $('#messageToSend').val();
chatMessage.message = messageText;
socket.emit("chat-msg",chatMessage);
})


socket.on('online-user-list', (data) => {

  console.log("Online user list is updated. some user can online or went offline")
  console.log(data)
})


$('#messageToSend').on('keypress',()=>{
  socket.emit('typing','aniket');
})

socket.on('typing',(fullname) => {
  console.log(fullname+'is typing...');
})

socket.on(userId, (data) => {

console.log("you received a message"+data.senderName)
console.log(data)

});

chatSocket();