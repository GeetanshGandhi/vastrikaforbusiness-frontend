import React, { useState,useEffect } from 'react';
import './ProductItem.css';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductItem = ({ product , removeProdFromList}) => {
	const { productId, productName, description:initialDescription, price,discount:fetchedDiscount } = product || {};

	const [isEditing, setIsEditing] = useState(false);
	const [newPrice, setNewPrice] = useState(price);
	const [discount, setDiscount] = useState(fetchedDiscount || 0);
	const [description, setDescription] = useState(initialDescription || '');

	useEffect(() => {
		setDiscount(fetchedDiscount || 0);
	}, [fetchedDiscount]);
	
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
		console.log(`Deleting product with ID: ${productId}`);
		fetch(process.env.REACT_APP_BACKEND+'product/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productId }), 
		})
		.then(response => {
			if (response.ok) {
				removeProdFromList(product)
				toast.success(`Product ${productName} deleted successfully.`);
				
			} else {
				toast.error('Failed to delete the product');
			}
		})
		.catch(error => toast.error('Error: ' + error.message));
	};

	return (
		<div className="product-tile">
			<div className="prod-top">
			<div className="product-image">
				<img src={`data:image/png;base64,${product.productImage}`} alt="" />
			</div>
			<div className="product-info">
				<h3>{productName}</h3>
				<p className='prodinfo-desc'>{description}</p>
				<div className="price-display">
					{isEditing ?(
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
			  <div className="save_btn"><button onClick={() => { handleSavePrice(); close(); }}>Save</button></div>
                <div className="close_btn"><button onClick={close}>Cancel</button></div>
                
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
                               <div className="save_btn"><button onClick={() => { handleDeleteClick(); close(); }}>Yes, Delete</button></div> 
                               <div className="close_btn"><button onClick={close}>Cancel</button></div> 
                            </div>
                        </div>
                    )}
                </Popup>	
			</div>
		</div>
	);
};

export default ProductItem;
