export const TAX_RATE = process.env.TAX_RATE || 0.1
export const FREE_SHIPPING_THRESHOLD = process.env.FREE_SHIPPING_THRESHOLD || 10000
export const SHIPPING_RATE = process.env.SHIPPING_RATE || 500
export const FRONT_CUT = process.env.FRONT_CUT || 0.03

export const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCart = () => {
    try{
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart) {
        	return cart
        }

    } catch(err){

    }

    return []
}

// export const getCart = () =>  {
//     try {
//         const cart = JSON.parse(localStorage.getItem('cart'))
//         return cart ? cart : []
//     } catch(err){
//         return []
//     }
    
// }

// export const addToCart = (producta, qty = 1) => {
//         const cart = getCart()

//         //If the product is already there
//         const indexOfProduct = cart.findIndex((alreadyInCart) => 
//         	alreadyInCart.id === producta.id
//         )

//         if(indexOfProduct !== -1){
//         	//Update the quantity
//         	cart[indexOfProduct].qty += parseInt(qty)

//         	if(cart[indexOfProduct].qty=== 0){
//         		//remove from the cart
//         	cart.splice(indexOfProduct, 1)
//         	}

//         } else {
//         	//set the quantity to 1
//         	producta.qty = parseInt(qty)

//         	//push the product
//         	cart.push(producta)
//         }

//         updateCart(cart)
// }


// export const updatedProductQuantity = (productb, quantity) => {
// 	const cart = getCart()

// 	const indexOfProduct = cart.findIndex((alreadyInCart) => 
// 		alreadyInCart.id === productb.id
// 	)
// }	

export const cartSubTotal = (cart) => {
	//Sum up all of the individual product cost
	const subTotal = cart.reduce((counter, productc) => {
		return counter + productc.price_in_cent * productc.qty

	}, 0)
	return subTotal
}

export const cartCoinTotal = (cart) => {
	//Sum up all of the individual product cost
	const coinTotal = cart.reduce((counter, productc) => {
		return counter + parseInt(productc.name) * productc.qty

	}, 0)
	return coinTotal
}

export const shouldPayShipping = (cart) => {
	const subTotal = cartSubTotal(cart)

	return subTotal < FREE_SHIPPING_THRESHOLD
}


export const cartTotal = (cart) => {
	const subTotal = cartSubTotal(cart)
	const shipping = shouldPayShipping(cart) ? SHIPPING_RATE : 0
	const frontCut = cartSubTotal(cart) * FRONT_CUT
	// const total = subTotal + subTotal * TAX_RATE + shipping
	const total = subTotal + frontCut

	return Math.round(total)

}


