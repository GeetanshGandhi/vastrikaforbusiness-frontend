import React, { useEffect, useRef, useState } from 'react'
import './AddProduct.css'
export default function AddProduct(props) {
	const categoryList = ["Banarasi", "Kanjiwaram", "Maheshwari"]
	useEffect(()=>{
		const categorySelect = document.getElementById("category-select")
		categoryList.forEach((item, index)=>{
			let option = `<option ${index===0 && "selected"} value=${item}>${item}</option>`
			categorySelect.insertAdjacentHTML("beforeend", option)
		})
	},[])
	const inputRef = useRef(null)
	const handleImageUploadClick = ()=>{
		inputRef.current.click();
	}
	const [image, setImage] = useState(null)
	const handleImageUpload = (e) => {
		setImage(e.target.files[0]);
	}
	return (
		<div>
			<p className='add-prod-head'>Add Product</p>
			<div className="add-prod-form">
				<div className='ip-container'>
					<div className="ip-wrapper">
						<div className="form-ip">
							<input placeholder=' ' id='prod-name' type="text"  className='form-ip-input'/>
							<label htmlFor="prod-name" className="form-ip-head">Product Name</label>
						</div>
					</div>
					<div className="wrapper">
						<div className="ip-wrapper">
							<div className="form-ip">
								<input id="prod-price" placeholder=" " type="text" className="form-ip-input" />
								<label htmlFor="prod-price" className="form-ip-head">Price(₹)</label>
							</div>
						</div>
						<div className="ip-wrapper">
							<div className="form-ip">
								<input id="prod-discount" placeholder=" " type="text" className="form-ip-input" />
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
					<p className="upload-msg">Upload 1:1 ratio image of the product</p>
				</div>
			</div>
			<div className="cat-wrapper">
				<p className="cat-msg">Choose Category:</p>
				<select name="category" id="category-select"></select>
			</div>
			<div className="cat-wrapper">
				<p className="cat-msg">Available Quantity: </p>
				<input id="quantity-ip" type="number" min="1" max="100"/>
			</div>
			<p className="add-desc-msg">Add a small <b>Description</b> of the product in not more than 30 words:</p>
			<textarea name="desc" id="prod-desc" rows={4}></textarea>
			<div className="btn-wrapper">
				<button className='close-btn' onClick={()=>props.close()}>Close</button>
				<button className='add-prod-btn' >Add</button>
			</div>			
		</div>
	)
}
