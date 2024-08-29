import React, { useState } from 'react';
import './ProductItem.css';
import img from '../images/logo.webp';

const ProductItem = ({ product }) => {
	const { id, name = 'Saree1', description = 'This is a sample product description.', price = 29.99, imageUrl = img } = product || {};


	const [isEditing, setIsEditing] = useState(false);
	const [newPrice, setNewPrice] = useState(price);
	const [discount, setDiscount] = useState(0);


	const handleEditPriceClick = () => setIsEditing(!isEditing);


	const handleSavePrice = () => {
		const updatedPrice = parseFloat(newPrice);
		if (!isNaN(updatedPrice)) {
			console.log(`Saving new price: $${updatedPrice.toFixed(2)}`);
			setIsEditing(false);
		} else {
			console.error('Invalid price value');
		}
	};

	const discountedPrice = parseFloat(newPrice) * (1 - parseFloat(discount) / 100);

	const handleDeleteClick = () => {
		console.log(`Deleting product with ID: ${id}`);
	};

	return (
		<div className="product-tile">
			<div className="product-image">
				<img src={imageUrl} alt={name} />
			</div>
			<div className="product-info">
				<h3>{name}</h3>
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
							</div>
							<button className="edit-price-button" onClick={handleEditPriceClick}>Edit</button>
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

