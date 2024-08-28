import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './Components/LandingPage';
import AddProduct from './Components/AddProduct';
import BusinessLogin from './Components/Login';
import 'reactjs-popup/dist/index.css'
import { useState } from 'react';
function App() {
	const [login, setlogin] = useState({
		gstin:"22AAAAA0000A1Z5",email:"geetansh.gandhi2504@gmail.com",
		businessName: "Vastra Bhandar", businessOwnerName:"Abhigyan Sharma",
		contactNumber:"9879654939",cityId:"IDR", approval:true
	});
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
