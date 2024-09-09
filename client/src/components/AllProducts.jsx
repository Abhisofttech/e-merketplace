import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Search, Filter, ChevronDown } from 'lucide-react'
import backendUrl from '../config/bcakendUrl'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${backendUrl}/api/product/get-all-products`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProducts(data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'price') {
      return a.price - b.price
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 " id='product'>
      <div className="container mx-auto px-4 py-12" >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Products</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 z-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-gray-600" />
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
            <ChevronDown size={20} className="text-gray-600 -ml-8 pointer-events-none" />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-gray-600 mb-4">Showing {sortedProducts.length} products</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}

        {!loading && !error && sortedProducts.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            <p className="text-xl">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProducts