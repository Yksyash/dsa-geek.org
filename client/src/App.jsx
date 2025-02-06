import { BrowserRouter as Router,Route, Routes,Link, BrowserRouter} from 'react-router-dom'
import './App.css'


import Home from './components/user/Home';
import SignupPage from './components/user/SignupPage';
import LoginPage from './components/user/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLoginPage from './components/admin/AdminLoginPage';
import SubmitSolution from './components/user/SubmitSolution';
import ViewSubmissions from './components/user/ViewSubmissions';
import Header from './components/user/Head'

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if the token is present
};


function App() {
  
return (
 
         <BrowserRouter>
           <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/user/signup" element={!isLoggedIn()?<SignupPage />:<Home />}></Route>
              <Route path="/user/login" element={!isLoggedIn()?<LoginPage />:<Home />}></Route>
              <Route path="/user/adminDashboard" element={<AdminDashboard/>}></Route>
              <Route path="/login/admin" element={!isLoggedIn()?<AdminLoginPage />:<AdminDashboard />}></Route>
              <Route path="/user/submitSolution/:title" element={<SubmitSolution />}></Route>
              <Route path="/user/viewSubmissions/:title" element={<ViewSubmissions/>}></Route>
           </Routes>
        </BrowserRouter> 
       
       )
      }

export default App
