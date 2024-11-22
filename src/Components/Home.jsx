import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import AddProduct from './AddProduct'
import ProductItem from './ProductItem'
import './Home.css'
import { useNavigate } from 'react-router-dom'
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
			console.log("hello");
			if(login["approval"]==="Verified"){
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
			else{
				fetch(process.env.REACT_APP_BACKEND+"business/getByEmail",{
					headers:{"content-type":"application/json"},
					body: login["ownerEmail"],
					method: "POST"
				})
				.then((res)=>res.json())
				.then((data)=>{
					setlogin(data)
				})
			}
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
	const removeProdFromList = (item)=>{
		setproducts(products.filter((element)=>{
			return element!==item
		}))
	}
	const navigate = useNavigate();
	return (
		<div className='super-nonflex-container'>
			{
				login===null? <p className="gateway-error">Unauthorized Access!</p>
				:
				login["approval"] === "Unchecked"?
				<p className="unverified">Please Wait while we Verify you business. This might take upto 48 hours from registration.</p>
				: <>
							<p className="your-prod-msg">Your Products</p>
			<div className="products-container">
				<div onClick={()=>navigate("/addProd")} className="goto-add-prod-container">
					<img id="addprod-icon" src={require("../images/icons/addIcon.png")} alt="add"/>
					<p className="add-prod-msg">Add</p>
				</div>
    		{
				products.map((product, index) => (
				<ProductItem key={index} product={product} removeProdFromList={removeProdFromList} />
				))
			}
            </div>
				</>
			}

		</div>
	)
}
