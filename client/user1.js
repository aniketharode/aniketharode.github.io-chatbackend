const socket = io('http://localhost:3000');


let authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImlNUXBZdTEweCIsImlhdCI6MTU0MTA3NjY5MTk4MCwiZXhwIjoxNTQxMTYzMDkxLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MjM3MjM4OCwiZW1haWwiOiJhbmlrZXQyMEBnbWFpbC5jb20iLCJsYXN0TmFtZSI6Ikhhcm9kZSIsImZpcnN0TmFtZSI6IiIsInVzZXJJZCI6IkdUUXVGWHhneiJ9fQ.KrkZYZIMaWFVLMEUzOLoBiBcUV9eFIyh1a1UZMBoLqU';
let userId = 'GTQuFXxgz';

let chatMessage = {
    createdOn: Date.now(),
    receiverId: 'ZXEu5mlW0',//putting user2's id here 
    receiverName: "Virat",
    senderId: userId,
    senderName: "Aniket"
  }
  


let chatSocket = () => {
    socket.on('verifyUser', (data) => {

        console.log("socket trying to verify user");
    
        socket.emit("set-user", authToken);

        console.log("user1 is verify successfully");
    })

   

    
}


$('#send').on('click',() => {
    let messageText = $('#messageToSend').val();
chatMessage.message = messageText;
socket.emit("chat-msg",chatMessage);
})

$('#messageToSend').on('keypress',()=>{
    socket.emit('typing','aniket');
})

socket.on('typing',(fullname) => {
    console.log(fullname+'is typing...');
})

socket.on('online-user-list', (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)
    
})

socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName);
    console.log(data.message);
    console.log(data)

  });



chatSocket();