import React from 'react'
import { useHistory } from 'react-router-dom'
import { getStoreItemArray } from '../reducers'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../actions'
import styled from 'styled-components';

const Checkout = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const cartItems = useSelector(getStoreItemArray)
    let total = 0;
    cartItems.forEach(item => {
        total += item.quantity * Number(item.productInfo.price.slice(1))
    })
    const order = cartItems.map(i => {
        return { item: i.productInfo.id, quantity: i.quantity }
    })


    const handleCheckout = (event) => {
        event.preventDefault()
        const orderInfo = {
            firstName: event.target.firstname.value,
            lastName: event.target.lastname.value,
            email: event.target.email.value,
            totalPaid: total,
            order
        }
        console.log(orderInfo)

        let orderId = ''
        fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(orderInfo)
        }).then(res => res.json()).then(data => {orderId = data.id})


        Promise.all(cartItems.map(item => fetch(`/api/items/${item.productInfo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ purchased: item.quantity })
        }).then(res => res.json()).then(data => console.log(data))
        )
        ).then(res => {
            dispatch(clearCart())
            history.push(`/order?id=${orderId}&success=true`)

        })
    

    }

    return (
        <>
        <h1>Checkout</h1>
        <form onSubmit={(e) => handleCheckout(e)}>
            <h3>Shipping Info</h3>
            <label htmlFor='firstname'>First name</label> <input name='firstname'></input>
            <label htmlFor='lastname'>Last name</label> <input name='lastname'></input>
            <label htmlFor='email'>Email</label> <input name='email' type='email'></input>
            <h3>Payment Info</h3>
            <label htmlFor='ccnum'>Credit Card Number</label> <input name='ccnum' type='number' />
            <label htmlFor='expiry'>Expiry</label> <input name='expiry' type='date' />
            <label htmlFor='cvv'>CVV</label> <input name='cvv' type='number' max='999' min='-999' />
            <input type='submit' value='buy now' />
        </form>
        </>
    )
}

export default Checkout