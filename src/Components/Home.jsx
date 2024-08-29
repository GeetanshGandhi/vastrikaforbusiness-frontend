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
