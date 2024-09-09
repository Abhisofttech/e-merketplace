import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Package, Layers, Box, Image as ImageIcon, Loader, IndianRupee } from 'lucide-react'
import backendUrl from '../config/bcakendUrl'

const CreateProduct = () => {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }

        const userResponse = await fetch(`${backendUrl}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const userData = await userResponse.json()
        if (!userResponse.ok) {
          throw new Error(userData.error || 'Failed to fetch user info')
        }
        setUserId(userData.userId)
        
      } catch (error) {
        console.error('Error:', error)
        toast.error(error.message || 'An unexpected error occurred.')
      }
    }

    const fetchParentCategories = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/categories/parent-categories`)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch parent categories')
        }
        setCategories(data.categories)
      } catch (error) {
        console.error('Error:', error)
        toast.error(error.message || 'An unexpected error occurred.')
      }
    }
    fetchParentCategories()

    fetchData()
  }, [])

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (category) {
        try {
          const response = await fetch(`${backendUrl}/api/categories/subcategories/${category}`)
          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch subcategories')
          }
          setSubCategories(data.subCategories)
        } catch (error) {
          console.error('Error:', error)
          toast.error(error.message || 'An unexpected error occurred.')
        }
      } else {
        setSubCategories([])
      }
    }

    fetchSubCategories()
  }, [category])

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId) {
      toast.error('User not authenticated.')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('name', productName)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('stock', stock)
    formData.append('seller', userId)
    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await fetch(`${backendUrl}/api/product/create-product`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success('Product created successfully!')
        setProductName('')
        setDescription('')
        setPrice('')
        setStock('')
        setImage(null)
        setCategory('')
        setSubCategory('')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to create product. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to create product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Create a New Product</h1>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter product name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Enter product description"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter product price"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Layers className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {subCategories.length > 0 && (
            <div>
              <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Layers className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="subCategory"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="" disabled>Select a subcategory</option>
                  {subCategories.map(sub => (
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Box className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter stock quantity"
                required
                min="0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="Product" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-full w-full text-gray-300" />
                )}
              </span>
              <label
                htmlFor="image"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Change
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="sr-only"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Creating...
                </>
              ) : (
                'Create Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct