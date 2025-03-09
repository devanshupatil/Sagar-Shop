import NoProduct from "../../assets/images/productNotAvailable.webp";
import { Link } from "react-router-dom";

const ProductNotFound = () => {
  return (  
  <div className="flex flex-col items-center justify-center pt-25">
    <img src={NoProduct} alt="Product is not Available" className="h-70 w-70 object-cover" />
    <h1 className="md:text-3xl text-center text-gray-500 mt-2 font-semibold text-2xl">Product is not Available</h1>

    <Link to={"/"}>
      <button className="cursor-pointer text-white bg-orange-500 hover:bg-orange-600 px-8 py-2 rounded mt-2">
        Go Back 
      </button>
    </Link>
  </div>
  )
}

export default ProductNotFound
