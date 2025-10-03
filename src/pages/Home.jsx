import { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { ProductList } from '../components/ProductList'
import productsData from '../data/products'

export const Home = ({ addToCart }) => {
	// Состояния для фильтров и сортировки
	const [query, setQuery] = useState('')
	const [sortOption, setSortOption] = useState('')
	const [minPrice, setMinPrice] = useState('')
	const [maxPrice, setMaxPrice] = useState('')
	const [filteredProducts, setFilteredProducts] = useState(productsData)

	useEffect(() => {
		let filtered = [...productsData]

		// Фильтрация по поисковому запросу (название и описание)
		if (query.trim() !== '') {
			filtered = filtered.filter(
				product =>
					product.title.toLowerCase().includes(query.toLowerCase()) ||
					product.description.toLowerCase().includes(query.toLowerCase())
			)
		}

		// Фильтрация по диапазону цен
		if (minPrice !== '') {
			filtered = filtered.filter(
				product => product.price >= parseFloat(minPrice)
			)
		}
		if (maxPrice !== '') {
			filtered = filtered.filter(
				product => product.price <= parseFloat(maxPrice)
			)
		}

		// Сортировка товаров
		if (sortOption === 'price-asc') {
			filtered.sort((a, b) => a.price - b.price)
		} else if (sortOption === 'price-desc') {
			filtered.sort((a, b) => b.price - a.price)
		} else if (sortOption === 'name-asc') {
			filtered.sort((a, b) => a.title.localeCompare(b.title))
		} else if (sortOption === 'name-desc') {
			filtered.sort((a, b) => b.title.localeCompare(a.title))
		}

		setFilteredProducts(filtered)
	}, [query, minPrice, maxPrice, sortOption])

	return (
		<div className='container mx-auto p-4'>
			{/* Баннер */}
			<Banner />

			{/* Блок фильтров */}
			<div className='bg-white p-6 rounded shadow-md mb-8 '>
				<h2 className='text-2xl font-bold mb-4 text-center'>
					Найдите свой товар
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{/* Поисковое поле */}
					<div>
						<label className='block text-gray-700  mb-1' htmlFor='search'>
							Поиск
						</label>
						<input
							id='search'
							type='text'
							placeholder='Название или описание...'
							value={query}
							onChange={e => setQuery(e.target.value)}
							className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 '
						/>
					</div>

					{/* Фильтрация по диапазону цен */}
					<div className='flex space-x-2'>
						<div className='w-1/2'>
							<label className='block text-gray-700 mb-1' htmlFor='minPrice'>
								От (₽)
							</label>
							<input
								id='minPrice'
								type='number'
								placeholder='0'
								value={minPrice}
								onChange={e => setMinPrice(e.target.value)}
								className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
							/>
						</div>
						<div className='w-1/2'>
							<label className='block text-gray-700 mb-1' htmlFor='maxPrice'>
								До (₽)
							</label>
							<input
								id='maxPrice'
								type='number'
								placeholder='Макс'
								value={maxPrice}
								onChange={e => setMaxPrice(e.target.value)}
								className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-40'
							/>
						</div>
					</div>
					{/* Сортировка */}
					<div>
						<label className='block text-gray-700 mb-1' htmlFor='sort'>
							Сортировка
						</label>
						<select
							id='sort'
							value={sortOption}
							onChange={e => setSortOption(e.target.value)}
							className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
						>
							<option value=''>Сортировать</option>
							<option value='price-asc'>Цена: по возрастанию</option>
							<option value='price-desc'>Цена: по убыванию</option>
							<option value='name-asc'>Название: А-Я</option>
							<option value='name-desc'>Название: Я-А</option>
						</select>
					</div>
				</div>
			</div>

			<ProductList products={filteredProducts} addToCart={addToCart} />
		</div>
	)
}
