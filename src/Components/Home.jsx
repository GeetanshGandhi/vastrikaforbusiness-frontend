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
	const refreshProducts = ()=> {
		setTimeout(()=>{
			fetch(process.env.REACT_APP_BACKEND+"product/getByOwner",{
				headers:{"content-type":"application/json"},
				body: login["ownerEmail"],
				method: "POST"
			})
			.then((res)=>res.json())
			.then((data)=>{
				setproducts(data)
			})
		}, 2000)
	}
	return (
		<div className='super-nonflex-container'>
			<p className="your-prod-msg">Your Products</p>
			<div className="products-container">
			<Popup
			trigger={
				<div className="goto-add-prod-container">
					<img id="addprod-icon" src={require("../images/icons/addIcon.png")} alt="add"/>
					<p className="add-prod-msg">Add</p>
				</div>
			} 
				modal
				nested
			>
				{
					close=>(
						<AddProduct close={close} refreshProducts={refreshProducts}/>
				)}
			</Popup>
    		{
				products.map((product, index) => (
				<ProductItem key={index} product={product} />
				))
			}
            </div>

		</div>
	)
}
