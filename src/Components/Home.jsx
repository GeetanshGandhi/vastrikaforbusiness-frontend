import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import AddProduct from './AddProduct'

export default function Home() {
	const loggedInUser = {
		gstin:"22AAAAA0000A1Z5",email:"geetansh.gandhi2504@gmail.com",
		businessName: "Vastra Bhandar", businessOwnerName:"Abhigyan Sharma",
		contactNumber:"9879654939",cityId:"IDR", approval:true
	}
	return (
		<div>
			<p>home page</p>
			<Popup trigger={<div className="wrapper"><button>Add a Product</button></div>} 
				modal
				nested
			>
				{
					close=>(
						<AddProduct close={close}/>
				)}
			</Popup>
		</div>
	)
}
