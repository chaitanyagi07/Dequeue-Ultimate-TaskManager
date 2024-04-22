import {Home} from './assets/Home/Home'
import {Log} from './assets/Login/Log'
import { TaskAndList } from './assets/Components/TaskAndList/TaskAndList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {Projectcard} from './assets/Components/ManageProjects/ManageProjects'
import {Projectlist} from './assets/Components/ManageProjects/Projectlist'
import DemoApp from "./assets/Components/Googlecalendar/DemoApp.jsx";
import { Event } from './assets/Components/EventCreater/Event';
import { Reg } from './assets/Login/Register.jsx';
import { RoomPage } from './assets/Components/EventCreater/screens/Room.jsx';
import LobbyScreen from './assets/Components/EventCreater/screens/Lobby.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path='/register' element={<Reg/>}></Route>
       <Route path="/Login" element={<Log/>}></Route>
        <Route exact path="/TaskAndList" element={<TaskAndList/>}></Route>
        <Route exact path="/Projects" element={<Projectlist/>}></Route>
        <Route exact path="/TaskViewer" element={<DemoApp/>}></Route>
        <Route exact path="/Connect" element={<LobbyScreen/>}></Route>
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>  
    </BrowserRouter>
  )
}

export default App