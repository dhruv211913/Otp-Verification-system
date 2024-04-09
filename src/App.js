import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dash from './Pages/Dash';
import Err from './Pages/Err';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserOtp from './Pages/UserOtp'


function App() {
  return (
    <div className="App">
      <Header/>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dash/>}/>
      <Route path='/otp' element={<UserOtp/>}/>

      <Route path='*' element={<Err/>}/>

     </Routes>
    </div>
  );
}

export default App;
