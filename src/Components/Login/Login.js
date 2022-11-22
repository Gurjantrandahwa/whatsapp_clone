import React from "react";
import "./login.css";
import {Button} from "@mui/material";
import {auth, provider} from "../Common/firebase";
import {useStateValue} from "../Common/StateProvider";
import {actionTypes} from "../Common/reducer";

export default function Login() {
    const [{user}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch((error) => alert(error.message))

    }
    return <div className={"login"}>
        <div className={"login_container"}>
            <img src={"https://i.pinimg.com/564x/13/2d/78/132d78edc1a425708d0d9c5abda26d01.jpg"}
                 alt={""}/>
            <div className={"login-text"}>
                <h1>Sign in to Whatsapp</h1>
            </div>
            <Button type={"submit"} onClick={signIn}>
                Sign in with Google
            </Button>
        </div>
    </div>
}