import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
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
    const toggleSubmenu = ()=> {
        document.getElementById("subMenuWrap").classList.toggle("submenu-open");
    }
    return (
        <nav>
            <div className="nav-left-wrapper">
                <img id="nav-logo" src={require("../images/logo.png")} alt="logo" />
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
                </>
            }
            {
                login === null &&
                <button onClick={()=>navigate("/businessLogin")} className='gotologin-btn'>Login</button>
            }
            {
                login!==null &&
                <>  
                    <div className="wrapper">
                        <Link to="/" className="goto-home">
                            <img src={require("../images/icons/homeIcon.png")} alt="home" />
                            <p>Home</p>
                        </Link>
                        <div onClick={toggleSubmenu} className="hamburger">
                            <img className='hambg-icn' src={require("../images/icons/hamburger.png")} alt="" />
                            <p className="dp-init">Options</p>
                        </div>
                    </div>
                    
                    <div className="submenu-wrap" id="subMenuWrap"><div className="submenu">
                <div className="profile">
                    <img className='dp' src={require("../images/icons/profilepic.png")} alt="dp" />
                    <div className="profile-info">
                        <p className="user-name">{login["businessName"]}</p>
                        <p className="user-add">{login["houseNumber"]+", "+login["streetBuildingName"]+", "+login["landmark"]+", "+login["city"]+", "+login["state"]}</p>
                    </div>
                </div>
                <hr style={{borderBottom:"1px solid rgb(223,223,223)"}}/>
                <Link className='submenu-link' to='/pendingOrders'>
                    <div className="submenu-link-in">
                    <img className='submenu-link-img' src={require("../images/icons/orderIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>Pending Orders</p>
                    </div>
                </Link>
                <Link className='submenu-link' to='/dispatchedOrders'>
                    <div className="submenu-link-in">
                    <img className='submenu-link-img' src={require("../images/icons/dispatchedOrderIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>Packed Orders</p>
                    </div>
                </Link>
                <Link className='submenu-link'to='/completedOrders'>
                    <div className="submenu-link-in">
                        <img className='submenu-link-img' src={require("../images/icons/completeOrderIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>Completed Orders</p>
                    </div>
                </Link>
                <Link className='submenu-link'to='/cancelledOrders'>
                    <div className="submenu-link-in">
                        <img className='submenu-link-img' src={require("../images/icons/cancelledOrderIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>Cancelled Orders</p>
                    </div>  
                </Link>
                <Link className='submenu-link' to='/'>
                    <div className="submenu-link-in">
                        <img className='submenu-link-img' src={require("../images/icons/userIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>View Full Profile</p>
                    </div>
                </Link>
                <div className="wrapper">
                    <button className='logout-btn' onClick={dologout}>Log Out</button>
                </div>
            </div></div>
                </>
                }
        </nav>
    )
}
