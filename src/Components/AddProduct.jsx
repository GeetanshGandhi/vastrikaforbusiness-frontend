import React, { useEffect, useRef, useState } from 'react'
import './AddProduct.css'
export default function AddProduct(props) {
	const [login, setlogin] = useState(null)
	const [categories, setCategories] = useState([])
	useEffect(()=>{
		if(localStorage.getItem("vastrikaBusiness")!==null){
			setlogin(JSON.parse(localStorage.getItem("vastrikaBusiness")))
		}
		fetch(process.env.REACT_APP_BACKEND+"category/getAll",{
			method: "GET",
			headers: {"content-type":"application/json"}
		}).then((res)=>res.json()).then((data)=>setCategories(data))
	},[])
	useEffect(()=>{
		const categorySelect = document.getElementById("category-select")
		categories.forEach((item, index)=>{
			let option = `<option ${index===0 && "selected"} value=${item}>${item}</option>`
			categorySelect.insertAdjacentHTML("beforeend", option)
		})
	},[categories])
	//defining product details
	const [product, setproduct] = useState({
		productName:'', description:'', price:-1, discount: -1, quantityAvailable:-1
	})
	const handleFieldChange = (e, field) => {
		setproduct({ ...product, [field]: e.target.value });
	}
	//product category
	const [productCategory, setProdCategory] = useState("")
	const handleCatChange = (e)=> {
		setProdCategory(e.target.value)
	}
	const inputRef = useRef(null)
	const handleImageUploadClick = ()=>{
		inputRef.current.click();
	}
	const [image, setImage] = useState(null)
	const handleImageUpload = (e) => {
		if(e.target.files[0].size>5242880){
			document.getElementById("5mb-msg").style.color = "red"
			document.getElementById("5mb-msg").style.fontWeight = "bold"
		}
		else{
			document.getElementById("5mb-msg").style.color = "green"
			document.getElementById("5mb-msg").style.fontWeight = "normal"
		}
		setImage(e.target.files[0]);
	}

	//submit to backend
	const handleAddProdClick = async()=> {
		let formdata = new FormData();
		formdata.append("productDet",JSON.stringify(product))
		formdata.append("businessDet", JSON.stringify(login))
		formdata.append("productImage", image)

		const res = await fetch(process.env.REACT_APP_BACKEND+"product/saveNew",{
			method: "POST",
			body: formdata
		})
		let response = await res.json()
		console.log("clicked");
	}
	return (	
		<div>
			<p className='add-prod-head'>Add Product</p>
			<div className="add-prod-form">
				<div className='ip-container'>
					<div className="ip-wrapper">
						<div className="form-ip">
							<input onChange={(e)=>handleFieldChange(e,"productName")} placeholder=' ' id='prod-name' type="text"  className='form-ip-input'/>
							<label htmlFor="prod-name" className="form-ip-head">Product Name</label>
						</div>
					</div>
					<div className="wrapper">
						<div className="ip-wrapper">
							<div className="form-ip">
								<input onChange={(e)=>handleFieldChange(e,"price")} id="prod-price" placeholder=" " type="text" className="form-ip-input" />
								<label htmlFor="prod-price" className="form-ip-head">Price(₹)</label>
							</div>
						</div>
						<div className="ip-wrapper">
							<div className="form-ip">
								<input onChange={(e)=>handleFieldChange(e,"discount")} id="prod-discount" placeholder=" " type="text" className="form-ip-input" />
								<label htmlFor="prod-discount" className="form-ip-head">Discount(%)</label>
							</div>
						</div>
					</div>
				</div>
				<div className="upload-container">
					<div className="wrapper">
						{
							image===null?
							<img onClick={handleImageUploadClick} id='upload-icon' src={require("../images/icons/uploadImage.png")} alt="upload" />
							:
							<img onClick={handleImageUploadClick} id='upload-icon' src={URL.createObjectURL(image)} alt="upload" />
						}
						</div>
					<input onChange={(e)=>handleImageUpload(e)} ref={inputRef} hidden id="image-ip" type="file" />
					<p className="upload-msg">
						Upload 1:1 ratio image of the product.<br/>
						<span id="5mb-msg" style={{color:"green"}}>
							Image must strictly be of .JPG format and less than 5MB
						</span>
					</p>
				</div>
			</div>
			<div className="cat-wrapper">
				<p className="cat-msg">Choose Category:</p>
				<select onChange={(e)=>handleCatChange(e)} name="category" id="category-select"></select>
			</div>
			<div className="cat-wrapper">
				<p className="cat-msg">Available Quantity: </p>
				<input onChange={(e)=>handleFieldChange(e,"quantityAvailable")} id="quantity-ip" type="number" min="1" max="100"/>
			</div>
			<p className="add-desc-msg">Add a small <b>Description</b> of the product in not more than 30 words:</p>
			<textarea onChange={(e)=>handleFieldChange(e,"description")} name="desc" id="prod-desc" rows={4}></textarea>
			<div className="btn-wrapper">
				<button className='close-btn' onClick={()=>props.close()}>Close</button>
				<button className='add-prod-btn' onClick={handleAddProdClick}>Add</button>
			</div>			
		</div>
	)
}
