import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'

const Order = () => {
    const [order, setOrder] = useState('')
    const location = useLocation()
    useEffect(() => {
        fetch(`/api/orders/${location.search.slice(4, 28)}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])
    console.log(order)
    return (<>{order && <>
        <h1>Thanks! Your order has been received.</h1>
        <h3>Status: {order.status}</h3>
        <h3>Order date: {format(new Date(order.date), 'MM/dd/yyyy')}</h3>
        <div>
            {order.order.map(info => <div key={info.item.id}>{info.item.name}, {info.quantity} count</div>)}
        </div>
        <div>Total cost: {order.totalPaid}</div>
        </>
    }</>)
}

export default Order