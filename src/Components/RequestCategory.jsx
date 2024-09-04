import React, { useEffect, useState } from 'react';
import './RequestCategory.css';

export default function RequestCategory(props) {
    const categoryList = ["Banarsi", "Lucknowi", "Maheshwari"];

    useEffect(() => {
        const categorySelect = document.getElementById("selectCategory");
        categoryList.forEach((item, index) => {
            let option = `<option ${index === 0 && "selected"} value=${item}>${item}</option>`;
            categorySelect.insertAdjacentHTML("beforeend", option);
        });
    }, []);

    const [categoryName, setCategoryName] = useState("");

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    return (
        <div>
            <p className='request-category-head'>Request New Category</p>
            <div className="request-category-form">
                <div className='ip-container'>
                    <div className="form-ip">
                        <input 
                            placeholder=' ' 
                            id='category-name' 
                            type="text"  
                            className='form-ip-input'
                            value={categoryName}
                            onChange={handleCategoryNameChange}
                        />
                        <label htmlFor="category-name" className="form-ip-head">Category Name</label>
                    </div>
                </div>
            </div>
            <div className="btn-wrapper">
                <button className='close-btn' onClick={() => props.close()}>Close</button>
                <button className='request-category-btn'>Request</button>
            </div>
        </div>
    );
}
