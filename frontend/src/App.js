import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Memories from './components/Memory';
import GetSpecificMemory from './components/GetSpecificMemory'
import UpdateMemory from './components/UpdateMemory';
import GetEmotionalMemory from './components/GetEmotionalMemory'
import GetFavoriteMemory from './components/GetFavoriteMemory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/memories' element={<Memories />}/>
        <Route path='/updateMemory/:id' element={<UpdateMemory />}/>
        <Route path='/getSpecificMemory' element={<GetSpecificMemory/>}/>
        <Route path='/getEmotionalMemories' element={<GetEmotionalMemory/>}/>
        <Route path='/getFavoriteMemory' element={<GetFavoriteMemory/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
