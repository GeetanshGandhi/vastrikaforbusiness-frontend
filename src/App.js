import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './Components/LandingPage';
import AddProduct from './Components/AddProduct';
import BusinessLogin from './Components/Login';
import BuisnessRegister from './Components/Register';
import 'reactjs-popup/dist/index.css'
import { useEffect, useState } from 'react';
function App() {
	const [login, setlogin] = useState(null)
	useEffect(()=>{
		if(localStorage.getItem("vastrikaBusiness")!==null){
			setlogin(localStorage.getItem("vastrikaBusiness"))
		}
	},[])
	const router = createBrowserRouter([
		{
			path:"/", element:<><Navbar/>{login===null?<LandingPage/>:<Home/>}</>
		},
		{
			path:"/home", element: <><Navbar/><Home/></>
		},
		{
			path:"/addProd", element: <><Navbar/><AddProduct/></>
		},
		{
		    path: "/businessLogin",  element: <><Navbar/><BusinessLogin /></>
		},
		{
            path: "/businessRegister",  element: <><Navbar/><BuisnessRegister /></>
        },
		{
			path: "/landing", element:<><Navbar/><LandingPage/></>
		}
	])
	return (
		<div className="App">
			<RouterProvider router={router}/>
			<ToastContainer position="top-right"
                        autoClose={2500}
                        hideProgressBar={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                        theme="light"
                        transition= {Slide}/>
		</div>
	);
}

export default App;
