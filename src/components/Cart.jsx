import { useEffect, useState } from 'react'

export const Cart = ({ cartItems, onUpdateQuantity, onRemove, onSaveCart }) => {
	const [discountCode, setDiscountCode] = useState('')
	const [appliedDiscount, setAppliedDiscount] = useState(0)

	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)
	const discountPrice = totalPrice - totalPrice * appliedDiscount

	const handleApplyDiscount = () => {
		if (discountCode.trim().toUpperCase() === 'SALE2025') {
			setAppliedDiscount(0.1)
		} else {
			setAppliedDiscount(0)
			alert('Неверный промокод!')
		}
	}

	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
		if (onSaveCart) {
			onSaveCart(cartItems)
		}
	}, [cartItems, onSaveCart])

	return (
		<div>
			<h2>Ваша корзина!</h2>
			{cartItems.length === 0 ? (
				<p>Корзина пуста!</p>
			) : (
				<>
					<div>
						{cartItems.map(item => (
							<div>
								<div>
									<img src='' alt='' />
									<div>
										<h3></h3>
										<p></p>
									</div>
								</div>

								<div>
									<button></button>
									<span></span>
									<button></button>
								</div>

								<div>
									<button></button>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	)
}
