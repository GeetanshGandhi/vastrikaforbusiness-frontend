import React, { useEffect, useState } from 'react';
import './Register.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function BusinessRegistration() {
	let regDetails = {
		name: '',
		email: '',
		businessName: '',
		contactNumber: '',
		city: '',
		requestCity: '',
		address: '',
		bankAccountNumber: '',
		gstin: ''
	};

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

		regDetails["name"] = document.getElementById("form-ip-name").value;
		regDetails["email"] = document.getElementById("form-ip-email").value;
		regDetails["businessName"] = document.getElementById("form-ip-businessName").value;
		regDetails["contactNumber"] = document.getElementById("form-ip-contact").value;
		regDetails["city"] = document.getElementById("selectCity").value;
		regDetails["requestCity"] = document.getElementById("form-ip-requestCity").value;
		regDetails["address"] = document.getElementById("form-ip-address").value;
		regDetails["bankAccountNumber"] = document.getElementById("form-ip-bankAccount").value;
		regDetails["gstin"] = document.getElementById("form-ip-gstin").value;

		// Add validation for GSTIN and Bank Account Number as needed

		let res = await fetch(process.env.REACT_APP_BACKEND + "business/registerBusiness", {
			headers: { "content-type": "application/json" },
			body: JSON.stringify(regDetails),
			method: "POST"
		});
		res = await res.text();

		if (res === "Exist") {
			toast.error("Business with this email ID already exists!");
			return;
		} else {
			toast.success("Registration Successful! Please log in to continue.");
			navigate("/businessLogin");
		}
	}

	return (
		<div className='wrapper register-container'>
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
				<div className="form-row-wrap">
					<div className="form-ip">
						<p className="select-msg">Select City</p>
						<select id="selectCity">
							<option value="Delhi">Delhi</option>
							<option value="Mumbai">Mumbai</option>
							<option value="Indore">Indore</option>
						</select>
					</div>
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
					<div className="form-ip">
						<input placeholder=" " id="form-ip-bankAccount" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-bankAccount' className="form-ip-head">Bank Account Number</label>
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
