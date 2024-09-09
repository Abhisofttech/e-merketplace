import { ArrowRight, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <div className="relative bg-gray-900 overflow-hidden mt-9">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center  lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl  md:text-6xl">
                <span className="block xl:inline">Discover the Latest</span>{' '}
                <span className="block text-teal-400 xl:inline">Fashion Trends</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Explore our curated collection of stylish clothing and accessories. From casual wear to elegant outfits, find your perfect look today.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10">
                  <Link to='/signin'>Shop Now</Link>  
                    <ShoppingBag className="ml-2 -mr-1 h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <div variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                   <a href="#product">View Catalog</a> 
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}