import React, { useEffect, useRef, useState } from 'react'
import './AddProduct.css'
import { toast } from 'react-toastify'

function checkImageExtension(file) {
	const allowedExtensions = [".jpg", ".jpeg", ".png"]; // Add more if needed
  
	const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  
	return allowedExtensions.includes(fileExtension);
}
function descriptionLength(str) {
    const array = str.trim().split(/\s+/);
    return array.length;
}
export default function AddProduct(props) {
	
	const [login, setlogin] = useState(null)
	useEffect(()=>{
		if(localStorage.getItem("vastrikaBusiness")!==null){
			setlogin(JSON.parse(localStorage.getItem("vastrikaBusiness")))
		}
	},[])

	//defining product details
	const [product, setproduct] = useState({
		productName:'', description:'', price:-1, discount: -1, quantityAvailable:-1
	})
	const handleFieldChange = (e, field) => {
		setproduct({ ...product, [field]: e.target.value });
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
		//checking correctness of image
		if(image===null){
			toast.error("Please Upload an Image")
			return;
		}
		if(!checkImageExtension(image)){
			toast.error("Image must be of Valid formats")
		}
		if(image.size>5242880){
			document.getElementById("5mb-msg").style.color = "red"
			document.getElementById("5mb-msg").style.fontWeight = "bold"
			toast.error("Image size must be less than 5MB!")
			return;
		}
		else{
			document.getElementById("5mb-msg").style.color = "green"
			document.getElementById("5mb-msg").style.fontWeight = "normal"
		}
		//checking correctness of data:
		if(product["productName"].trim()===""){
			toast.error("Please Enter a name")
			return;
		}
		if(product["description"].trim()===""){
			toast.error("Please Enter a description")
			return;
		}
		if(descriptionLength(product["description"])>20){
			toast.error("Description must not exceed 20 words.")
			return;
		}
		if(product["price"]==-1){
			toast.error("Please Enter a price")
			return;
		}
		if(product["quantityAvailable"]==-1){
			toast.error("Please Enter available quantity")
			return;
		}
		if(product["discount quantityAvailable"]==-1){
			toast.error("Please Enter a discount (Enter 0 if no discount)")
			return;
		}
		let formdata = new FormData();
		formdata.append("productDet",JSON.stringify(product))
		formdata.append("businessDet", JSON.stringify(login))
		formdata.append("productImage", image)

		const res = await fetch(process.env.REACT_APP_BACKEND+"product/saveNew",{
			method: "POST",
			body: formdata
		})
		let response = await res.json()
		console.log(response)
		if(response["fileName"]===null){
			if(response["message"]==="Invalid product"){
				toast.error("Could Not Add product due to invalid Details")
				return;
			}
			if(response["message"]==="Invalid image"){
				toast.error("Could not add Product due to invalid Image!")
			}
		}
		toast.success("product Added Successfully!")
		props.refreshProducts()
		props.close()
		
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
					<div className="cat-wrapper">
						<p className="cat-msg">Available Quantity: </p>
						<input onChange={(e)=>handleFieldChange(e,"quantityAvailable")} id="quantity-ip" type="number" min="1" max="100"/>
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
						Upload 1:1 ratio image of the product for the best experience.<br/>
						<span id="5mb-msg" style={{color:"green"}}>
							Image must strictly be of <b>.jpg or .png</b> format and less than 5MB
						</span>
					</p>
				</div>
			</div>
			<p className="add-desc-msg">
				Add a small <b>Description</b> of the product in not more than 20 words:<br/>
				Write a good description to attract more customers
			</p>
			<textarea onChange={(e)=>handleFieldChange(e,"description")} name="desc" id="prod-desc" rows={4}></textarea>
			<div className="btn-wrapper">
				<button className='close-btn' onClick={()=>props.close()}>Close</button>
				<button className='add-prod-btn' onClick={handleAddProdClick}>Add</button>
			</div>			
		</div>
	)
}
