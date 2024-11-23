import React, { useEffect, useState } from 'react';
import './RequestCategory.css';
import { toast,ToastContainer} from 'react-toastify';

export default function RequestCategory(props) {

    const [categoryName, setCategoryName] = useState("");

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value)
    }

    const RequestCategory = async () => {

        if (categoryName === '') {
            toast.error("Please enter a category to be requested!");
            return;
        }

        const categoryRequest = {
            categoryName:categoryName
        };

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND+"categoryRequest/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoryRequest)
            });

            if (response.ok) {
                console.log("hello");
                // const result = await response.json();
                toast.success("Request Submitted Successfully!");
                console.log("helo1");
                // setCategoryName(""); 
            } else {
                const error = await response.json();
                toast.error(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Error requesting category:", error);
            toast.error("Something went wrong. Please try again later.");
        }
        props.close();
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
                <button className='request-category-btn' onClick={RequestCategory}>Request</button>
            </div>
        </div>
    );
}
