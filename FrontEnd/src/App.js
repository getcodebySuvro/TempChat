
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Mainform from './Components/Mainform';
import Chatroom from './Components/Chatroom';

function App() {
  return (
    <div className="containe-fluid bg-light text-primary d-flex align-items-center justify-content-center" style={{height: "100vh"}} >
      <Router>
        <Routes>
          <Route index element={<Mainform/>}></Route>
          <Route path='/chat/:roomname' element={<Chatroom/>}></Route>
          <Route path='*' element={<h1>404 ERROR</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
