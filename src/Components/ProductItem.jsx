import React from 'react'
import './ProductItem.css'
export default function ProductItem(props) {
	return (
		<div className='prod-item-container'>
			<p className="prod-name">{props.item["productName"]}</p>
			<img id='prod-item-img' src={require("../images/logo.webp")} alt="prod" />
		</div>
	)
}
