import React, {useEffect, useState} from "react";
import "./Chat.css";
import {Avatar, IconButton,} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import {useParams} from "react-router-dom";
import db from "../Common/firebase";
import {useStateValue} from "../Common/StateProvider";
import firebase from "firebase/compat/app";

export default function Chat() {
    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));
            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                ))
        }
    }, [roomId])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

    }, [roomId])

    const sendMessage = (e) => {

        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages')
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        console.log(input)
        setInput('')
    }
    return <div className={"chat"}>
        <div className={"chat-header"}>
            <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
            <div className={"chat-header-info"}>
                <h3>{roomName}</h3>
                <p>Last seen{" "}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
            </div>
            <div className={"chat-header-right"}>
                <IconButton>
                    <SearchOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
        <div className={"chat-body"}>
            {
                messages.map((message) => {
                    return <p className={`chat-message ${message.name===user.displayName && "chat-receiver"}`}>
                        <span className={"chat-name"}>{message.name}</span>
                        {message.message}
                        <span className={"chat-timestamp"}>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                })
            }


        </div>
        <div className={"chat-footer"}>
            <InsertEmoticonIcon/>
            <form>
                <input type={"text"}
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       placeholder={"Type a message"}/>

                <button type={"submit"}
                        onClick={sendMessage}>
                    Send a message
                </button>
            </form>
            <MicIcon/>
        </div>
    </div>
}