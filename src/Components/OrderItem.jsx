import React from 'react'
import './Orders.css'
import { toast } from 'react-toastify'
export default function OrderItem({item, updateFunction}) {
    let month = {
        "01":"Jan", "02":"Feb", "03":"Mar", "04":"Apr", "05":"May", "06":"Jun", "07":"Jul",
        "08":"Aug", "09":"Sep", "10":"Oct", "11":"Nov","12":"Dec"
    }
    const updateOrder = async()=> {
        let form = new FormData()
        form.append("orderId", item.orders.orderId)
        form.append("productId", item.product.productId)
        const res = await fetch(process.env.REACT_APP_BACKEND+"prodOrd/updateForBusiness",{
            body: form, method: 'POST'
        })
        if(res.status===200){
            const reply = await res.text();
            if(reply==="Success"){
                toast.success("Status Updated!");
                updateFunction(item);
            }
            else{
                toast.error("Could not Update Status");
            }
        }
        else{
            toast.error("Could not update status");
        }
    }
    return (
        <div className="pending-item">
            <div className="pending-header">
                <p className="placedon"><b>Placed On:</b> <br />{item.orders.orderDateTime.substring(8, 10) + "-" + month[item.orders.orderDateTime.substring(5, 7)] + ", " + item.orders.orderDateTime.substring(2, 4)}</p>
                <p className="pending-stat" style={{backgroundColor:item.status==="Placed"?"rgb(0, 60, 255)":item.status==="Packed"?"rgb(0, 139, 133)":item.status==="Dispatched"?"rgb(0, 150, 12)":item.status==="Cancelled"?"red":"white"}}>
                    {item.status}
                </p>
                <p className="pending-ordid"><b>Order ID:</b>  {item.orders.orderId}</p>
                <p className="pending-custmail">Customer Email: <br /><b>{item.orders.customer.customerEmail}</b></p>
            </div>
            <div className="pending-top-wrap">
                <div className="pending-left-wrap">
                    <img src={`data:image/png;base64,${item.product.productImage}`} alt="" />
                </div>
                <div className="pending-mid-wrap">
                    <p className="pending-pname">{item.product.productName}</p>
                    <p className="pending-qty">Quantity: {item.quantity} @ Rs. {item.rate}/-</p>
                </div>
                <div className="pending-right-wrap">
                    <p className="deliv-add"><b>Delivery Address</b></p>
                    <p className="deliv-add">{item.orders.customer.houseNumber}, {item.orders.customer.streetBuildingName}</p>
                    <p className="deliv-add">{item.orders.customer.landmark}</p>
                    <p className="deliv-add">{item.orders.customer.city} - {item.orders.customer.state}</p>
                </div>
            </div>
            <div className="pending-bottom-wrap">
                {
                item.status==="Placed" &&
                <div className="wrapper">
                    <button onClick={updateOrder} className='update-order-btn'>Send out for Delivery</button>
                </div>
                }
            </div>
        </div>
    )
}
