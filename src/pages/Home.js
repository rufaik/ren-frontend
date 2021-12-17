import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {UserContext} from '../context/UserContext'

  const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`

export default ({description, likes, url}) =>{


 const [posts, setPosts] = useState([])
 const [products, setProducts] = useState([])
 const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:1337/posts')
      const data = await response.json()
      setPosts(data)
    }

    getPosts()

  }, [])


  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('http://localhost:1337/products')
      const data = await response.json()
      console.log("data", data)
      setProducts(data)
    }

    getProducts()
    console.log("products", products)

  }, [])

  console.log("home", simpleUser)






  return (
    <div className="Home">
{/*	    {posts.map(post => (
      <Link to={`/${post.id}`}>
  	    <Post 
  	      description={post.description}
  	      likes={post.likes}
  	      url={post.image && post.image.url}
  	    />
      </Link>
      ))}

      <h1>Products</h1>

    {products.map(product => (
      <Link 
          style={{
            color:'black',
            textDecoration: 'none'
          }}
          to={fromProductSlugToUrl(product.slug)}
        >
        <Post 
          description={product.description}
          likes={formatPrice(product.price_in_cent)}
          url={product.thumbnail && product.thumbnail.url}
        />
      </Link>
      ))}*/}








    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link 
    
          to={fromProductSlugToUrl(product.slug)}
        >
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={formatImageUrl(product.thumbnail && product.thumbnail.url)}
                  alt='pic'
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.description}
                  </h3>
{/*                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
*/}                </div>
                <p className="text-sm font-medium text-gray-900">{formatPrice(product.price_in_cent)}</p>
              </div>
            </div>
            </Link>
          ))}

          {posts.map((post) => (
            <Link 
    
          to={`/${post.id}`}
        >
            <div key={post.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={formatImageUrl(post.image && post.image.url)}
                  alt='pic'
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {post.description}
                   
                  </h3>
{/*                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
*/}                </div>
                <p className="text-sm font-medium text-gray-900">{post.coinPrice}</p>
              </div>
            </div>
            </Link>
          ))}



        </div>
      </div>
    </div>













    </div>


  );
}