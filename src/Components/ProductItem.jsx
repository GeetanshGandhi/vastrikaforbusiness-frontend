import React from 'react'

export default function ProductItem(props) {
	return (
		<div className='prod-item-container'>
			<p className="prod-name">{props.item["productName"]}</p>
		</div>
	)
}
