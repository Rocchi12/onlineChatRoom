import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc /*adds docs to collection*/, deleteDoc, doc/*gets refernce to a doc*/,
    onSnapshot /* realtine*/,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc, DocumentChange
} from 'firebase/firestore'

// render chat templates to the DOM
// clear list of chats whenever we switch rooms

class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at && data.created_at.toDate(),
            {addSuffix: true}
        );
        const html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
        </li>`;
        this.list.innerHTML += html
    }
}

export default ChatUI