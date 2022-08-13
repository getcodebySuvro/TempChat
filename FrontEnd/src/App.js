
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Mainform from './Components/Mainform';
import Chatroom from './Components/Chatroom';
import Namesec from './Components/Namesec';


function App() {
  return (
    <div className="containe-fluid text-primary d-flex align-items-center justify-content-center app " style={{height: "100vh"}} >
      
           
      
      <Router>
        <Routes>
         <Route exact path='/' element={<Namesec/>}></Route> 
          <Route exact path='/chat/mainform' element={<Mainform/>}></Route>
          <Route exact path='/chat/:roomname' element={<Chatroom/>}></Route>
          <Route path='*' element={<h1>404 ERROR</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
