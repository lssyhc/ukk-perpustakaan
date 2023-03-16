import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>     
    </div>
  );
}

export default App;
