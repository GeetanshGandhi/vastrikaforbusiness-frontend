import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import AddProduct from './AddProduct'
import ProductItem from './ProductItem'

export default function Home() {
	const loggedInUser = {
		gstin:"22AAAAA0000A1Z5",email:"geetansh.gandhi2504@gmail.com",
		businessName: "Vastra Bhandar", businessOwnerName:"Abhigyan Sharma",
		contactNumber:"9879654939",cityId:"IDR", approval:true
	}
	const products = [
		{
			productId:"1",
			productName: "Saree 1",
			price: 4959.99,
			discount: 10.0,
			category: "Banarasi",
			description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae dolores omnis, minus ea facilis cumque culpa cupiditate quia. Veniam porro iusto ab repellat magni sed eaque quisquam error ad, consectetur incidunt molestiae omnis animi assumenda, asperiores aperiam reiciendis sequi accusantium est distinctio necessitatibus corrupti quod delectus consequatur? Corporis eos aspernatur recusandae, quia labore est hic beatae, laborum suscipit architecto veniam iure tempora eum voluptas asperiores eaque? Consectetur laborum soluta reprehenderit maiores hic vel possimus doloribus animi quos corporis ea incidunt placeat ducimus totam eveniet unde est tempore temporibus tempora perferendis excepturi voluptas, ipsam porro? Odio facilis deserunt reiciendis quae magni."
		}
	]
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
			{
				products.map((item)=>{
					return <><ProductItem item={item}/></>
				})
			}
		</div>
	)
}
