import React, { useEffect, useState } from 'react'
import './Orders.css'
import OrderItem from './OrderItem'
export default function Orders({ status }) {
    const [login, setlogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("vastrikaBusiness")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaBusiness")));
        }
    }, [])
    const [pending, setpending] = useState([])
    useEffect(()=>{
        let form = new FormData();
        form.append("ownerEmail", JSON.parse(localStorage.getItem("vastrikaBusiness"))["ownerEmail"])
        form.append("status", status)
        fetch(process.env.REACT_APP_BACKEND+"prodOrd/getByBusAndStat",{
            body: form, method:"POST"
        }).then((res)=>res.json()).then((data)=>setpending(data));
    }, [login, status])
    const removeProdOrderedOnUpdate = (item)=> {
        setpending(pending.filter((element)=>{
            return element!==item;
        }));
    }
    return (
        <div className='super-nonflex-container'>
            <p className="pending-head">{status} Orders</p>
            {
                pending.length!==0 &&
                <div className="pending-container">
                {
                    pending.map((item)=>{
                        return <OrderItem item={item} updateFunction={removeProdOrderedOnUpdate}/>
                    })
                }
                </div>
            }
        </div>
    )
}
