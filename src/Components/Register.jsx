import React, { useEffect, useState } from 'react';
import './Register.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import RequestCity from './RequestCity';
import RequestCategory from './RequestCategory';

export default function BusinessRegistration() {
	useEffect(()=>{
		const cities = document.getElementById("selectcity")
		const categories = document.getElementById("selectcat")
		fetch(process.env.REACT_APP_BACKEND+"city/getAllStr",{
			method: "GET", headers: {"content-type":"application/json"}
		}).then((res)=>res.json())
		.then((data)=>{
			for(let i = 0; i<data.length; i++){
				let option = `<option value=${data[i]==="Unregistered"?"000000":data[i]}>${data[i]==="Unregistered"? "Not in the List" : data[i]}</option>`
				cities.insertAdjacentHTML("beforeend", option);
			}
		}).then(()=>{
			fetch(process.env.REACT_APP_BACKEND+"category/getAll",{
				method: "GET", headers: {"content-type":"application/json"}
			}).then((res)=>res.json()).then((data)=>{
				for(let i = 0; i<data.length; i++){
					let option = `<option value=${data[i]}>${data[i]==="uncategorized"? "Not in the List":data[i]}</option>`
					categories.insertAdjacentHTML("beforeend", option);
				}
			})
		})
	},[])

	const [showPass, setShowPass] = useState(false);
	const handleTogglePass = () => {
		setShowPass(!showPass);
	}

	const navigate = useNavigate();

	const handleRegister = async () => {
		const allInputs = document.querySelectorAll(".form-ip-input");
		for (let i = 0; i < allInputs.length; i++) {
			if (allInputs[i].value.trim() === "") {
				allInputs.forEach(input => {
					input.style.border = "none";
					input.style.borderBottom = "2px solid rgb(192, 133, 247)";
					input.style.borderRadius = "0";
				});
				toast.error("Please provide all the information!");
				allInputs[i].style.border = "2px solid red";
				allInputs[i].style.borderRadius = "7px";
				return;
			}
		}

		let regDetails = {
			businessOwnerName: '',
			ownerEmail: '',
			businessName: '',
			contactNo: '',
			address: '',
			gstin: '',
			approval: 'Unverified',
			password: ''
		};
		regDetails["businessOwnerName"] = document.getElementById("form-ip-name").value;
		regDetails["ownerEmail"] = document.getElementById("form-ip-email").value;
		regDetails["businessName"] = document.getElementById("form-ip-businessName").value;
		regDetails["contactNo"] = document.getElementById("form-ip-contact").value;
		regDetails["address"] = document.getElementById("form-ip-address").value;
		regDetails["gstin"] = document.getElementById("form-ip-gstin").value;
		regDetails["password"] = document.getElementById("form-ip-passwd").value;
		let form = new FormData();
		form.append("businessDet", JSON.stringify(regDetails));
		form.append("pinCode", document.getElementById("selectcity").value);
		form.append("categoryName", document.getElementById("selectcat").value);

		let result = await fetch(process.env.REACT_APP_BACKEND + "business/register", {
			body: form,
			method: "POST"
		});
		if(result.ok){
			const res = await result.text();
		
			if (res === "Exist") {
				toast.error("Business with this email ID already exists!");
				return;
			}
			toast.success("Registration Successful! Please log in to continue.");
			navigate("/businessLogin");
		}
		else{
			toast.error("Cannot Register Business!");
		}
		
	}

	const handleChangeInSelection = (e, type)=>{
		if(type==="city") {
			if(e.target.value==="000000")
				document.getElementsByClassName("request-city-btn")[0].style.display="block";
		}
		else{
			if(e.target.value==="uncategorized")
				document.getElementsByClassName("request-category-btn")[0].style.display="block";
		}
	}
	return (
		<div className='super-flex-container'>
			<div className="register-form">
				<p className="reg-head">Business Registration</p>
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" " id='form-ip-name' type="text" className="form-ip-input" />
						<label htmlFor='form-ip-name' className="form-ip-head">Name</label>
					</div>
					<div className="form-ip">
						<input placeholder=" " id="form-ip-email" type="email" className="form-ip-input" />
						<label htmlFor='form-ip-email' className="form-ip-head">Email</label>
					</div>
				</div>
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" " id="form-ip-businessName" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-businessName' className="form-ip-head">Business Name</label>
					</div>
					<div className="form-ip">
						<input placeholder=" " id="form-ip-contact" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-contact' className="form-ip-head">Contact Number</label>
					</div>
				</div>
				<div className="citycat">
				<div className="city-wrap">
					<div>
						{/* <p className="select-msg">Select City</p> */}
						<select id="selectcity" onChange={(e)=>handleChangeInSelection(e, "city")}>
						    <option disabled selected>Select City</option>
						</select>
					</div>
					<Popup trigger={<div className="wrapper"><button style={{display:"none"}} className='request-city-btn'> Request a City</button></div>} 
				modal
				nested
			>
				{
					close=>(
						<RequestCity close={close}/>
				)}
			</Popup>
				</div>
				<div className="category-wrap">
					<div>
						<select id="selectcat" onChange={(e)=>handleChangeInSelection(e, "category")}>
						<option disabled selected>Select Category</option>
						</select>
					</div>
					<Popup trigger={<div className="wrapper"><button style={{display:"none"}} className='request-category-btn'>Request a Category</button></div>} 
				modal
				nested
			>
				{
					close=>(
						<RequestCategory close={close}/>
				)}
			</Popup>
				</div>
				</div>
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" " id="form-ip-certificateId" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-certificateId' className="form-ip-head">Certificate Id</label>
					</div>
				</div>
				
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" " id="form-ip-address" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-address' className="form-ip-head">Address</label>
					</div>
				</div>
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" " id="form-ip-gstin" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-gstin' className="form-ip-head">GSTIN</label>
					</div>
					<div className="form-ip">
						<input placeholder=" " id="form-ip-passwd" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-passwd' className="form-ip-head">Password</label>
					</div>
				</div>
				<div className="wrapper">
					<button onClick={handleRegister} className="register-btn">Register</button>
				</div>
				<div className="wrapper">
					<p className="alry-reg">Already Registered?</p>
					<Link to="/businessLogin" className="goto-login">Log in</Link>
				</div>
			</div>
		</div>
	);
}
