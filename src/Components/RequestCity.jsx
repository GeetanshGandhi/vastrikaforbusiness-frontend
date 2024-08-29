import React, { useEffect, useRef, useState } from 'react'
import './RequestCity.css'

export default function RequestCity(props) {
    const stateList = ["Madhya Pradesh", "Gujarat", "Uttar Pradesh", "Rajasthan"]

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

    return (
        <div>
            <p className='request-city-head'>Request New City</p>
            <div className="request-city-form">
                <div className='ip-container'>
                    <div className="ip-wrapper">
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
                </div>
                <div className="state-wrapper">
                    <p className="state-msg">Select State:</p>
                    <select name="state" id="state-select"></select>
                </div>
            </div>
            <div className="btn-wrapper">
                <button className='close-btn' onClick={() => props.close()}>Close</button>
                <button className='request-city-btn'>Request</button>
            </div>
        </div>
    )
}
