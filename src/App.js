import { createHashRouter, RouterProvider } from 'react-router-dom';
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
import Footer from './Components/Footer';
import Orders from './Components/Orders';
function App() {
	const [login, setlogin] = useState(null)
	useEffect(()=>{
		if(localStorage.getItem("vastrikaBusiness")!==null){
			setlogin(localStorage.getItem("vastrikaBusiness"))
		}
	},[])
	const router = createHashRouter([
		{
			path:"/", element:<><Navbar/>{login===null?<LandingPage/>:<Home/>}<><Footer/></></>
		},
		{
			path:"/home", element: <><Navbar/><Home/><Footer/></>
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
		},
		{
			path: "/addProd", element: <AddProduct/>
		},
		{
			path: "/pendingOrders", element: <><Navbar/><Orders status={"Placed"}/><Footer/></>
		},
		{
			path: "/dispatchedOrders", element: <><Navbar/><Orders status={"Packed"}/><Footer/></>
		},
		{
			path: "cancelledOrders", element :<><Navbar/><Orders status={"Cancelled"}/><Footer/></>
		},
		{
			path: "completedOrders", element: <><Navbar/><Orders status={"Complete"}/><Footer/></>
		},
		{
			path: "cancelledOrders", element: <><Navbar/><Orders status={"Cancelled"}/><Footer/></>
		},
		{
			path: "/addProd", element: <><Navbar/><AddProduct/></>
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
