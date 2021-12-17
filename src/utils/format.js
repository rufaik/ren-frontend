
export const formatPrice = (priceWithDecimal) =>{
	if(!priceWithDecimal){
		return ''
	}
	const realPrice = parseInt(priceWithDecimal) /100
		return realPrice.toLocaleString('en-US', {
			style: 'currency',
			currency: 'GBP',
		})
}