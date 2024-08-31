import React from 'react'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom'
export default function LandingPage() {
	const navigate = useNavigate()
	const handleGoToRegister = ()=> {
		navigate("/businessRegister")
	}
	return (
		<div className='super-nonflex-container'>
			<h1 className='landing-mainhead'>Vastrika for Business</h1>
			<h2 className='landing-punchline'>Grow your Business with us</h2>

			<div className="landing-itemcontainer">
				<div className="landing-item">
					<div className="wrapper">
						<img src={require("../images/landingImages/landing1.png")} alt="l1" className='landing-item-img' />
					</div>
					<hr className="item-hr" />
					<p className="landing-item-head">No Hassle</p>
					<p className="landing-item-content">We at Vastrika want you to take no pain. Continue exploring our platform and experiencing the ease of our services. Our user-friendly interface and efficient processes are designed to minimize stress and maximize convenience.</p>
				</div>
				<div className="landing-item">
					<div className="wrapper">
						<img src={require("../images/landingImages/landing2.png")} alt="l2" className='landing-item-img' />
					</div>
					<hr className="item-hr" />
					<p className="landing-item-head">Value for Products</p>
					<p className="landing-item-content">We at Vastrika believe when you sell on our platform, you'll benefit from increased visibility, targeted reach, and a trustworthy platform. This will help you maximize sales and build a successful saree business.</p>
				</div>
				<div className="landing-item">
					<div className="wrapper">
						<img src={require("../images/landingImages/landing3.png")} alt="l1" className='landing-item-img' />
					</div>
					<hr className="item-hr" />
					<p className="landing-item-head">Increase Visibility</p>
					<p className="landing-item-content">Our platform employs advanced SEO techniques to ensure your saree listings appear prominently in search engine results. We also utilize targeted marketing campaigns and integrate with popular social media platforms to increase your exposure and reach a wider audience.</p>
				</div>
				<div className="landing-item">
					<div className="wrapper">
						<img src={require("../images/landingImages/landing4.png")} alt="l1" className='landing-item-img' />
					</div>
					<hr className="item-hr" />
					<p className="landing-item-head">Save Time & Efforts</p>
					<p className="landing-item-content">Our platform offers automated listing creation, simplified inventory management, and efficient order processing. These features streamline your operations, saving you time and effort.</p>
				</div>
			</div>
			<div className="wrapper">
				<button className='landing-reg-btn' onClick={handleGoToRegister}>Register Now</button>
			</div>
		</div>
	)
}
