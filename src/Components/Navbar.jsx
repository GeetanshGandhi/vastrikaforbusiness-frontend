import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Navbar() {
    const navigate = useNavigate();
    const [login, setlogin] = useState(null);
	
    const cityOfBusiness = "Indore"
    useEffect(()=>{
        if(localStorage.getItem("vastrikaBusiness")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaBusiness")));
        }
    },[])
    const dologout = () => {
        setlogin(null)
        localStorage.removeItem("vastrikaBusiness");
        navigate("/landing")
        // window.location.reload();
        toast.success("You have been logged out!")
    }
    return (
        <nav>
            <div className="nav-left-wrapper">
                <img id="nav-logo" src={require("../images/logo.webp")} alt="logo" />
                <h1 className="title-bigletter">V</h1>
                <div style={{padding:"0"}}>
                    <h1 className="title">astrika</h1>
                    <h2 className="punchline">For Business</h2>
                </div>
            </div>
            {
                login===null ? <p className="bus-msg">Business Panel</p>
                :
                <>
                <p className="bus-name">{login["businessName"]}</p>
                <div className="wrapper">
                    <img id="locn-ico" src={require("../images/icons/locationIcon.png")} alt="locn" />
                    <p className="city-name">{cityOfBusiness}</p>
                </div>
                </>
            }
            <div className="right">
                {
                login===null?
                <>
                    <button onClick={()=>navigate("/businessLogin")} className='gotologin-btn'>Login</button>
                </>
                :<>
                    <button onClick={dologout} className="logout-btn">Log out</button>
                </>
                }
            </div>
        </nav>
    )
}
