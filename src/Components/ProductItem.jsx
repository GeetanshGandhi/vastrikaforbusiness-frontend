import React, { useState,useEffect } from 'react';
import './ProductItem.css';
import img from '../images/logo.webp';

const ProductItem = ({ product }) => {
	const { productId, productName, description:initialDescription, price,discount:fetchedDiscount } = product || {};

	const [isEditing, setIsEditing] = useState(false);
	const [newPrice, setNewPrice] = useState(price);
	const [discount, setDiscount] = useState(fetchedDiscount || 0);
	const [description, setDescription] = useState(initialDescription || '');
	const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

	useEffect(() => {
		setDiscount(fetchedDiscount || 0);
	}, [fetchedDiscount]);
	
	const handleEditPriceClick = () => {
		setIsEditing(!isEditing);
		setIsDescriptionEditing(false);};


	const handleSavePrice = () => {
		const updatedPrice = parseFloat(newPrice);
		if (!isNaN(updatedPrice)) {
			console.log(`Saving new price: $${updatedPrice.toFixed(2)}`);
			setIsEditing(false);
		} else {
			console.error('Invalid price value');
		}
	};
	const handleSaveDescription = () => {
		if (description.trim() !== '') {
			console.log(`Saving new description: ${description}`);
			setIsDescriptionEditing(false);
		} else {
			console.error('Description cannot be empty');
		}
	};

	const discountedPrice = parseFloat(newPrice) * (1 - parseFloat(discount) / 100);

	const handleDeleteClick = () => {
		console.log(`Deleting product with ID: ${productId}`);
	};

	return (
		<div className="product-tile">
			<div className="product-image">
				<img src={require("../../../backend/product_images/"+product["productId"]+".jpg")} alt="" />
			</div>
			<div className="product-info">
				<h3>{productName}</h3>
				<p>{description}</p>
				<div className="price-display">
					{isEditing ? (
						<div className="price-edit">
							<input
								type="number"
								value={newPrice}
								onChange={(e) => setNewPrice(e.target.value)}
								min="0"
								step="0.01"
							/>
							<input
								type="number"
								value={discount}
								onChange={(e) => setDiscount(e.target.value)}
								min="0"
								max="100"
								step="0.01"
								placeholder="Discount %"
							/>
							<button className="edit-price-button" onClick={handleSavePrice}>Save</button>
						</div>
					) : (
						<>
							<div className="price-display-info">
								<span>Price: ${parseFloat(newPrice).toFixed(2)}</span>
								{discount > 0 && (
									<span>Discounted Price: ${discountedPrice.toFixed(2)}</span>
								)}
								<div className="editbutton">
									<button className="edit-price-button" onClick={handleEditPriceClick}>Edit</button>
								</div>
							</div>
							
							
						</>
					)}
				</div>
			</div>
			<div className="product-actions">
				<button className="delete-button" onClick={handleDeleteClick}>Delete</button>
			</div>
		</div>
	);
};

export default ProductItem;
