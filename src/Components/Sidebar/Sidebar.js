import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import {Avatar, IconButton} from "@mui/material";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from "./SidebarChat/SidebarChat";
import db from "../Common/firebase";
import {useStateValue} from "../Common/StateProvider";

export default function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
     const unsubscribe=  db.collection('rooms').onSnapshot((snapshot) => (
            setRooms(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
        return ()=>{
         unsubscribe();
        }
    }, [])
    return <div className={"sidebar"}>
        <div className={"sidebar-header"}>
            <Avatar src={user?.photoURL}/>
            <div className={"sidebar-header-right"}>
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>

            </div>
        </div>
        <div className={"sidebar-search"}>
            <div className={"search-container"}>
                <SearchOutlinedIcon/>
                <input placeholder={"Search or start new chat"}
                       type={"text"}/>
            </div>

        </div>
        <div className={"sidebar-chats"}>
            <SidebarChat addNewChat/>
            {
                rooms.map((room) => {
                    return <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}/>
                })
            }
        </div>
    </div>
}