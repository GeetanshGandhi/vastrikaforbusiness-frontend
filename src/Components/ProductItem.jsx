import React, { useState,useEffect } from 'react';
import './ProductItem.css';
import img from '../images/logo.webp';
import Popup from 'reactjs-popup';

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
				<img src={`data:image/png;base64,${product.productImage}`} alt="" />
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
							    <div className="discounted_price">
									{discount > 0 && (
										<span>₹{discountedPrice.toFixed(2)}</span>
									)}
								</div>
								<div className="originalprice">
								    <span>₹{parseFloat(newPrice).toFixed(2)}</span>
								</div>
							
							
							
						</>
					)}
				</div>
			</div>
			
			<div className="product-actions">
			<Popup
          trigger={<button className="edit-price-button">Edit</button>}
          modal
          nested
        >
          {close => (
            <div className="modal-content">
              <h2>Edit Product</h2>
              <div className="modal-body">
				<div className="price_discount">
				
                 <p>Price</p> 
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                  <p>Discount</p>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="Discount %"
                  />
                </div>
                <div className="desc">
				<p>Description</p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                  />
				</div>
                
              </div>
              <div className="modal-footer">
                <button onClick={() => { handleSavePrice(); close(); }}>Save</button>
                <button onClick={close}>Cancel</button>
              </div>
            </div>
          )}
        </Popup>

				<Popup
                    trigger={<button className="delete-button">Delete</button>}
                    modal
                    nested
                >
                    {close => (
                        <div className="modal-content">
                            <h2>Confirm Deletion</h2>
                            <div className="modal-body">
                                <p className='delp'>Are you sure you want to delete this product?</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => { handleDeleteClick(); close(); }}>Yes, Delete</button>
                                <button onClick={close}>Cancel</button>
                            </div>
                        </div>
                    )}
                </Popup>	
			</div>
		</div>
	);
};

export default ProductItem;
