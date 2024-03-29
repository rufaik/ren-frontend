import React, {useState, useEffect, useContext} from 'react'
import Post from '../components/Post'
import {API_URL} from '../utils/urls'

import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'

import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}








const formatImageUrl = (url) => `${API_URL}${url}`






export default ({match, history}) =>{
	  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
const {id} = match.params
// console.log("idd", id)
// console.log("match", id)

const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
// console.log("user1", user)
// console.log("setUser", setUser)

const {likesGiven, reloader} = useContext(LikesContext)

const isPostAlreadyLiked = (() => {
	return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
})()

// console.log("isPostAlreadyLiked", isPostAlreadyLiked)

const [post, setPost] = useState({})
const [loading, setLoading] = useState(true)
const [edit, setEdit] = useState(false)
const [description, setDescription] = useState('')
const [lowFunds, setLowFunds] = useState(false)
const [confirmation, setConfirmation] = useState(false)


const fetchPost = async () => {
		const response = await fetch(`${API_URL}/posts/${id}`)
		try{
                const data = await response.json();
                setPost(data);
                setDescription(data.description)
                setLoading(false);
                // console.log("post", data)
            } catch(err){
                setPost({}); 
                setLoading(false);
            }         
        }

const handleDelete = async () => {
	const response = await fetch(`${API_URL}/posts/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${user.jwt}`
		},
	})
	const data = await response.json();
	history.push('/')
}

const handleEditSubmit = async (event) => {
	event.preventDefault()
	// console.log("handleEditSubmit")

	const response = await fetch(`${API_URL}/posts/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type':'application/json',
			'Authorization': `Bearer ${user.jwt}`
		},
		body: JSON.stringify({
			description
		})
	})
	const data = await response.json();
	fetchPost()
	// console.log("handleEditSubmit data", data)
}


const handleLike = async () => {
	try{
		const response = await fetch(`${API_URL}/likes`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${user.jwt}`,
				'Content-Type':'application/json',
			},
			body: JSON.stringify({
				post: parseInt(id)
			})
		})
		fetchPost()
		reloader()
	} catch(err){
		// console.log("Exception ", err)
	}
}

const handleRemoveLike = async () => {
	try{
		const response = await fetch(`${API_URL}/likes/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${user.jwt}`
			}
		})
		fetchPost()
		reloader()
	} catch(err){
		// console.log("Exception ", err)
	}
}

// const buyItem = async 

//   const topUpCoins = async (order) => {
//     console.log("coins", coins)
//     const data = {
//       coins: Math.round(parseInt(user.user.coins) + parseInt(order.product_qty[0].qty))
//     }

//           const response = await fetch(`${API_URL}/users/${user.user.id}`, {
//           method: 'PUT',
//           headers: {
//           'Content-Type':'application/json',
//           'Authorization': `Bearer ${user.jwt}`
//           },
//           body: JSON.stringify(data)
//         })

//           const confirm = await response.json()



//     console.log(" response", response)
//     console.log("confirm", confirm)
    
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     // event.preventDefault();
// }

  const buyItem = async () => {
    const data = {
      coins: Math.round(parseInt(simpleUser.coins) - parseInt(post.coinPrice))
    }

    if(parseInt(simpleUser.coins) > parseInt(post.coinPrice)){
    	try{
	    	const response = await fetch(`${API_URL}/users/${user.user.id}`, {
	          method: 'PUT',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          },
	          body: JSON.stringify(data)
	        })

          const confirm = await response.json()
          setSimpleUser(confirm)
          setConfirmation(true)
          localStorage.setItem('simpleUser', JSON.stringify(confirm))

    	} catch(err){
		// console.log("Exception ", err)
  }
	} else {
		setLowFunds(true)
	}

    }
    





useEffect(() => {
	
	fetchPost()
}, [])

  return (
    <div className="SinglePost">
    	{loading &&
    		<p>Loading...</p>
    	}
    	{!loading &&
    		<>
    			{ post.id &&
    				<>
		    			<Post 
				  	      description={post.description}
				  	      likes={post.likes}
				  	      url={post.image && post.image.url}
				  	    />

				  	    {user &&
				  	    	<>

						  	    <h3>{post.coinPrice}</h3>
						  	    <button onClick={buyItem}> Buy</button>
						  	    {confirmation &&
						  	    	<div>Congrats! You have bought this item</div>
						  	    }
						  	    {lowFunds &&
						  	    	<div>Unfortunately you dont have enough REN coins!</div>
						  	    }

				  	    		{isPostAlreadyLiked &&
				  	    			<button onClick={handleRemoveLike}>Remove Like</button>
				  	    		}
				  	    		{!isPostAlreadyLiked &&
				  	    			<button onClick={handleLike}>Like</button>
				  	    		}
				  	    	
						  	    <button onClick={handleDelete}> Delete this post </button>
						  	    <button onClick={() => setEdit(true)}> Edit this post </button>
						  	    {edit &&
						  	    	<form onSubmit={handleEditSubmit}>
						  	    		<input
						  	    			value={description}
						  	    			onChange={(event) => setDescription(event.target.value)}
						  	    			placeholder="New description"
						  	    		/>
						  	    		<button> Confirm</button>

						  	    	</form>	
						  	    }
					  	    </>
				  	    }

					</>
		  		}
		  		{ !post.id &&
		  			<p> not found </p>
		  		}
		  	</>
    	}

	{loading &&
    		<p>Loading...</p>
    	}
    	{!loading &&
    		<>
    			{ post.id &&
  <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
{/*            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}*/}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {post.description}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mt-6 max-w-lg mx-auto sm:px-6 lg:max-w-2xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8">
          <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={formatImageUrl(post.image && post.image.url)}
              alt='pic'
              className="w-full h-full object-center object-cover"
            />
          </div>
        
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{post.description}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{post.coinPrice}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <div className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="p" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                
              </div>
               
						  	    {confirmation &&
						  	    	<div>Congrats! You have bought this item</div>
						  	    }
						  	    {lowFunds &&
						  	    	<div>Unfortunately you dont have enough REN coins!</div>
						  	    }


              <button
          
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={buyItem}> Buy
              </button>
            </div>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
            {confirmation &&
						  	    	   <h3 className="sr-only">Congrats! You have bought this item</h3>
						  	    }
						  	    {lowFunds &&
						  	    	   <h3 className="sr-only">Unfortunately you dont have enough REN coins!</h3>
						  	    }
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


	}
		  		{ !post.id &&
		  			<p> not found </p>
		  		}
		  	</>
    	}

    </div>
  );
}