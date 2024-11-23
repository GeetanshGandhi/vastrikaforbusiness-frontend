import React, { useEffect, useRef, useState } from 'react'
import './RequestCity.css'
import { toast } from 'react-toastify'
export default function RequestCity(props) {
    const stateList = { "AP": "Andhra Pradesh",
  "AR": "Arunachal Pradesh",
  "AS": "Assam",
  "BR": "Bihar",
  "CG": "Chhattisgarh",
  "GA": "Goa",
  "GJ": "Gujarat",
  "HR": "Haryana",
  "HP": "Himachal Pradesh",
  "JH": "Jharkhand",
  "KA": "Karnataka",
  "KL": "Kerala",
  "MP": "Madhya Pradesh",
  "MH": "Maharashtra",
  "MN": "Manipur",
  "ML": "Meghalaya",
  "MZ": "Mizoram",
  "NL": "Nagaland",
  "OD": "Odisha",
  "PB": "Punjab",
  "RJ": "Rajasthan",
  "SK": "Sikkim",
  "TN": "Tamil Nadu",
  "TG": "Telangana",
  "TR": "Tripura",
  "UP": "Uttar Pradesh",
  "UK": "Uttarakhand",
  "WB": "West Bengal",
  "AN": "Andaman and Nicobar Islands",
  "CH": "Chandigarh",
  "DH": "Dadra and Nagar Haveli and Daman and Diu",
  "DL": "Delhi",
  "JK": "Jammu and Kashmir",
  "LA": "Ladakh",
  "LD": "Lakshadweep",
  "PY": "Puducherry"}

    useEffect(() => {
        let keys = Object.keys(stateList);
        const stateSelect = document.getElementById("state-select")
        keys.forEach((item, index) => {
            let option = `<option ${index === 0 && "selected"} value=${item}>${stateList[item]}</option>`
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
        props.close();
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
