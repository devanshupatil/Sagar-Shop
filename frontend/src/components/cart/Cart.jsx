import image from "../../assets/images/1.webp"
import image2 from "../../assets/images/t-shirt.jpg"

const ProductCard = ({ heading, price, mrp, image: imgUrl}) => {
  return (
    <div className="max-w-sm border rounded-lg p-4 bg-white cursor-pointer hover:transform hover:translateY-(-5px)">
      {/* Main Product Image */}
      <div className="relative mb-4">
        <img
          src={imgUrl}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="mb-4">
        <h3 className="text-sm text-gray-800 mb-2 line-clamp-2">
          {heading}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold">₹{price}</span>
          <span className="text-sm text-gray-500 line-through">M.R.P: ₹{mrp}</span>
        </div>
      </div>
    </div>
  );
};

// Example usage component showing both product cards
const ProductSection = () => {
  const products = [
    {
      heading: "Lamper Zenora Design Furniture 24Watt Wooden Floor Lamp with LED Light Included",
      price: "2,899",
      mrp: "5,698",
      image: image2,
    },
    {
      heading: "Cetaphil Paraben, Sulphate-Free Gentle Skin Hydrating Face Wash Cleanser with Niacinamide",
      price: "357",
      mrp: "399",
      image: image
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-9">
      
      {products.map((product, index) => (
        <ProductCard
          key={index}
          image={product.image}
          heading={product.heading}
          price={product.price}
          mrp={product.mrp}
        />
      ))}
    </div>
  );
};

export default ProductSection;