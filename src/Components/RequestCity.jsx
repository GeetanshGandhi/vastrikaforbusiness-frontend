import React, { useEffect, useRef, useState } from 'react'
import './RequestCity.css'
import { toast } from 'react-toastify'
export default function RequestCity(props) {
    const stateList = [ "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"]

    useEffect(() => {
        const stateSelect = document.getElementById("state-select")
        stateList.forEach((item, index) => {
            let option = `<option ${index === 0 && "selected"} value=${item}>${item}</option>`
            stateSelect.insertAdjacentHTML("beforeend", option)
        })
    }, [])

    const [cityName, setCityName] = useState("")

    const handleCityNameChange = (e) => {
        setCityName(e.target.value)
    }


    const requestCity = async () => {
        const stateSelect = document.getElementById("state-select");
        const selectedState = stateSelect.value;

        if (!cityName || !selectedState) {
            toast.error("Please enter a city name and select a state.");
            return;
        }

        const cityRequestPayload = {
            cityName: cityName,
            state: selectedState,
        };

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND+"api/city-requests/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cityRequestPayload),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(`City request submitted successfully for: ${result.cityName}, ${result.state}`);
                setCityName(""); // Reset input field
            } else {
                const error = await response.json();
                toast.error(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Error requesting city:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    return (
        <div>
    <p className='request-city-head'>Request New City</p>
    <div className="request-city-form">
        <div className='ip-container'>
            <div className="form-ip">
                <input 
                    placeholder=' ' 
                    id='city-name' 
                    type="text"  
                    className='form-ip-input'
                    value={cityName}
                    onChange={handleCityNameChange}
                />
                <label htmlFor="city-name" className="form-ip-head">City Name</label>
            </div>
        </div>
        <div className="state-wrapper">
            <p className="state-msg">Select State:</p>
            <select name="state" id="state-select"></select>
        </div>
    </div>
    <div className="btn-wrapper">
        <button className='close-btn' onClick={() => props.close()}>Close</button>
        <button className='request-city-btn' onClick={requestCity}>Request</button>
    </div>
</div>

    )
}
