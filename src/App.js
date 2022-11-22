import './App.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./Components/Login/Login";
import {useStateValue} from "./Components/Common/StateProvider";

function App() {
    const [{user}, dispatch] = useStateValue();

    return <BrowserRouter>
        <div className={"app"}>
            {
                !user ? (
                    <Login/>
                ) : (
                    <div className={"app_body"}>
                        <Sidebar/>
                        <Routes>
                            <Route path={"/rooms/:roomId"} element={<Chat/>}/>

                            {/*<Route path={"/"} element={ <Chat/>}/>*/}
                        </Routes>


                    </div>
                )
            }

        </div>
    </BrowserRouter>
}

export default App;
