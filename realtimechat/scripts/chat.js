import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc /*adds docs to collection*/, deleteDoc, doc/*gets refernce to a doc*/,
    onSnapshot /* realtine*/,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc, DocumentChange
} from 'firebase/firestore'
// adding new chat documents

// setting up a real time listener to get new chats

// updating username

// updating the room

class Chatroom{
    constructor(room, username, chats){
        this.room = room;
        this.username = username;
        this.chats = chats;
        this.unsub;
    }
    async addChat(message){
        // format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: serverTimestamp(now)
        };
        // save the chat document
        const responce = await addDoc(this.chats, chat);
        return(responce);
    }

    getChats(callback){
        const q = query(this.chats, where('room', '==', this.room), orderBy('created_at'))
        this.unsub = onSnapshot(q, function(snapshot){
            snapshot.docChanges().forEach((change) => {
                if(change.type === 'added'){
                    // update the ui
                    callback(change.doc.data());
                }
            });
        })
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated')
        if(this.unsub){
            this.unsub();
        }

    }
    
}

export default Chatroom
