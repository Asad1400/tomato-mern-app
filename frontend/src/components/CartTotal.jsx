import React, { useContext } from 'react'
import ShopContext from '../context/ShopContext'

const CartTotal = () => {
  const { getTotalCartAmount } = useContext(ShopContext);

  const subtotal = getTotalCartAmount();
  const delivery = subtotal === 0 ? 0 : 5;
  const total = subtotal + delivery;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Delivery</span>
        <span>${delivery.toFixed(2)}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default CartTotal
