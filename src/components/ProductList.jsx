import { ProductCard } from './ProductCard'

export const ProductList = ({ products }) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6'>
			{products.map(product => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}
