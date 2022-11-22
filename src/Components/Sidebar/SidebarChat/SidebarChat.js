import React, {useEffect, useState} from "react";
import "./SidebarChat.css";
import {Avatar} from "@mui/material";
import db from "../../Common/firebase";
import {Link} from "react-router-dom";


export default function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState("")


    useEffect(()=>{
        if (id){
            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                ))
        }
    },[id])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

    }, [])
    const createChat = () => {
        const roomName = prompt("PLease enter name for chat")
        if (roomName) {
            db.collection("rooms").add({
                name:roomName,
            })
        }
    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className={"sidebar-chat"}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className={"chat-info"}>
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div
            onClick={createChat}
            className={'sidebar-chat'}>
            <h2>Add new Chat</h2>
        </div>
    )
}