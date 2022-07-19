import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc /*adds docs to collection*/, deleteDoc, doc/*gets refernce to a doc*/,
    onSnapshot /* realtine*/,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'
import Chatroom from './chat'
import ChatUI from './ui'
const firebaseConfig = {
    apiKey: "AIzaSyAkdTkYq9Ufjdbogy9W1k1kIYkBEmyXzFU",
    authDomain: "fir-9-dojo-108f7.firebaseapp.com",
    projectId: "fir-9-dojo-108f7",
    storageBucket: "fir-9-dojo-108f7.appspot.com",
    messagingSenderId: "202513070593",
    appId: "1:202513070593:web:4325ab9474d3d271c41e00",
    measurementId: "G-6WK8T2MNQM"
  };

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore();

//collection ref

const colRef = collection(db, 'chats')



// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')


// add new chat
newChatForm.addEventListener('submit', function(e){
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(function(){
        newChatForm.reset() })
    .catch(function(err){console.log(err)})
});

// update username
newNameForm.addEventListener('submit', function(e){
    e.preventDefault();
    const newName = newNameForm.name.value.trim()
    chatroom.updateName(newName);
    
    newChatForm.reset();
    // show update message
    updateMessage.innerText = `Your name was updated to ${newName}`;
    setTimeout(function(){updateMessage.innerText = ''}, 3000)


})
// update chat room
rooms.addEventListener('click', function(e){
    if (e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));

        chatroom.getChats(function(data){
            chatUI.render(data);
        })
    }
})
//check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';
// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username, colRef);

//get chats and render
chatroom.getChats(function(data){
    chatUI.render(data);
})

