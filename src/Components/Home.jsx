import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import AddProduct from './AddProduct'
import ProductItem from './ProductItem'
import './Home.css'
export default function Home() {
	const [login, setlogin] = useState(null)
	useEffect(()=>{
		if(localStorage.getItem("vastrikaBusiness")!==null){
			setlogin(JSON.parse(localStorage.getItem("vastrikaBusiness")))

		}
	},[])
	const [products, setproducts] = useState([])
	useEffect(()=>{
		if(login!==null){
			fetch(process.env.REACT_APP_BACKEND+"product/getByOwner",{
				headers:{"content-type":"application/json"},
				body: login["ownerEmail"],
				method: "POST"
			})
			.then((res)=>res.json())
			.then((data)=>{
				setproducts(data)
			})

		}
	},[login])
	// const products = [
	// 	{
	// 		productId:"1",
	// 		productName: "Saree 1",
	// 		price: 4959.99,
	// 		discount: 10.0,
	// 		category: "Banarasi",
	// 		description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae dolores omnis, minus ea facilis cumque culpa cupiditate quia. Veniam porro iusto ab repellat magni sed eaque quisquam error ad, consectetur incidunt molestiae omnis animi assumenda, asperiores aperiam reiciendis sequi accusantium est distinctio necessitatibus corrupti quod delectus consequatur? Corporis eos aspernatur recusandae, quia labore est hic beatae, laborum suscipit architecto veniam iure tempora eum voluptas asperiores eaque? Consectetur laborum soluta reprehenderit maiores hic vel possimus doloribus animi quos corporis ea incidunt placeat ducimus totam eveniet unde est tempore temporibus tempora perferendis excepturi voluptas, ipsam porro? Odio facilis deserunt reiciendis quae magni."
	// 	}
	// ]
	return (
		<div className='super-nonflex-container'>
			<p>{JSON.stringify(login)}</p>
			<p>{JSON.stringify(products)}</p>
			<Popup trigger={<div className="wrapper"><button>Add a Product</button></div>} 
				modal
				nested
			>
				{
					close=>(
						<AddProduct close={close}/>
				)}
			</Popup>
			<p className="your-prod-msg">Your Products</p>
			<div className="products-container">
			{
				products.map((item)=>{
					return <><ProductItem item={item}/></>
				})
			}
			</div>
		</div>
	)
}
