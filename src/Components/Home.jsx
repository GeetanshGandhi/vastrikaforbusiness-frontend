import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Home() {
	const displayUpdateCityCat = ()=> {
		const updatesblock = document.getElementById("waitforcitycat");
		updatesblock.style.display = "block";
		const cities = document.getElementById("selectcity")
		const categories = document.getElementById("selectcat")
		fetch(process.env.REACT_APP_BACKEND+"city/getAll",{
			method: "GET", headers: {"content-type":"application/json"}
		}).then((res)=>res.json())
		.then((data)=>{
			for(let i = 0; i<data.length; i++){
				let option = `<option value=${data[i].pinCode}>${data[i].pinCode==="000000"? "Not in the List" : data[i].cityName}</option>`
				cities.insertAdjacentHTML("beforeend", option);
			}
		}).then(()=>{
			fetch(process.env.REACT_APP_BACKEND+"category/getAll",{
				method: "GET", headers: {"content-type":"application/json"}
			}).then((res)=>res.json()).then((data)=>{
				for(let i = 0; i<data.length; i++){
					let option = `<option value=${data[i]}>${data[i]==="uncategorized"? "Not in the List":data[i]}</option>`
					categories.insertAdjacentHTML("beforeend", option);
				}
			})
		})
	}
	useEffect(()=>{
		if(localStorage.getItem("vastrikaBusiness")!==null){
			setlogin(JSON.parse(localStorage.getItem("vastrikaBusiness")))
			let login = JSON.parse(localStorage.getItem("vastrikaBusiness"))
			console.log(login)
			if(login["approval"]==="Approved" && login["city"]["pinCode"]!=="000000" && login["category"]["categoryName"]!=="uncategorized"){
				fetch(process.env.REACT_APP_BACKEND+"product/getByOwner",{
					headers:{"content-type":"application/json"},
					body: login["ownerEmail"],
					method: "POST"
				})
				.then((res)=>res.json())
				.then((data)=>{
					setproducts(data)
					return;
				})
			}
			else if(login.approval === "Approved") displayUpdateCityCat();
			else if(login.approval==="Unchecked"){	
				fetch(process.env.REACT_APP_BACKEND+"business/getByEmail",{
					headers: {"content-type":"application/json"},
					method: 'POST', body: login["ownerEmail"]
				}).then((res)=>res.json()).then((data)=>{
					login = data;
					localStorage.setItem("vastrikaBusiness", JSON.stringify(data));
					setlogin(data);
					if(data.approval==="Approved" && (data.city.pinCode==="000000" || data.category.categoryName==="uncategorized")){
						displayUpdateCityCat();
					}
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
	},[])
	const [logindata, setlogin] = useState(null)

	const [products, setproducts] = useState([])
	const refreshProducts = ()=> {
		setTimeout(()=>{
			fetch(process.env.REACT_APP_BACKEND+"product/getByOwner",{
				headers:{"content-type":"application/json"},
				body: logindata["ownerEmail"],
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

	const updateCityAndCat = async()=> {
		const cityselect = document.getElementById("selectcity");
		const catselect = document.getElementById("selectcat");
		if(catselect.value === "null" || cityselect.value==="null"){
			toast.error("Please select city and category!");
			return;
		}
		let form = new FormData();
		form.append("pinCode", cityselect.value);
		form.append("categoryName", catselect.value);
		form.append("ownerEmail", logindata.ownerEmail)
		const res = await fetch(process.env.REACT_APP_BACKEND+"business/updateCityAndCat",{
			method: 'POST', body: form
		})
		if(res.ok){
			const reply = await res.json();
			if(reply.city.pinCode!=="000000" && reply.category.categoryName!=="uncategorized"){
				toast.success("Updated Successfully! Please wait...");
				localStorage.setItem("vastrikaBusiness", JSON.stringify(reply));
				setTimeout(()=>{
					window.location.reload();
				}, 3000)
			}
			else{
				toast.error("Cannot update!");
			}
		}
		else toast.error("Cannot update!");
	}
	const navigate = useNavigate();
	return (
		<div className='super-nonflex-container'>
			{
				logindata===null? <p className="gateway-error">Unauthorized Access!</p>
				:
				logindata["approval"] === "Unchecked"?
				<p className="unverified">Please Wait while we Verify you business. This might take upto 48 hours from registration.</p>	
				:
				logindata.city.pinCode!=="000000" && logindata.category.categoryName!=="uncategorized" &&		
				<>
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
			<div id='waitforcitycat' style={{display:"none"}}>
				<p className="addn-msg">Add your city and category information<br/>
				If your city is not added to the list, Kindly wait for upto 12 Hours</p>
				<div className="wrapper">
					<select id="selectcity">
						<option value="null" selected>Select City</option>
					</select>
					<select id="selectcat">
						<option value="null" selected>Select Category</option>
					</select>
				</div>
				<div className="wrapper">
					<button onClick={updateCityAndCat} className='updatecitycat-btn'>Update</button>
				</div>
			</div>
			
		</div>
	)
}
