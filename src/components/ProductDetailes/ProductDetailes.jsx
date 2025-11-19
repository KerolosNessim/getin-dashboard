import { Eye } from "lucide-react";

const ProductDetails = ({ product }) => {
  console.log(product)
  return (
    <div className="p-6 rounded-lg bg-main-gold/20 border-l-4 border-main-gold shadow-sm">

      {/* Title + Image */}
      <div className="flex items-start gap-6">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-40 h-40 object-contain bg-main-green rounded-lg shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-main-green flex items-center gap-2">
            {product?.name}
          </h1>
          <p className="text-gray-700 mt-2 text-lg leading-relaxed">
            {product?.description}
          </p>

          <p className="text-2xl font-extrabold text-main-green mt-4">
            ₺{product?.price}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-main-green/30" />

      {/* Extra Details */}
      <div className="grid grid-cols-2 gap-6">

        {/* Status */}
        <div>
          <p className="text-main-green font-medium">Status</p>
          <span
            className={`mt-1 inline-block px-4 py-2 text-sm rounded-full font-medium ${product?.status
              ? "bg-green-100 text-main-green"
              : "bg-red-100 text-red-700"
              }`}
          >
            {product?.status ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* Product ID */}
        <div>
          <p className="text-main-green font-medium">Product ID</p>
          <p className="mt-1 font-semibold text-main-green">{product?.id}</p>
        </div>

        {/* Rating */}
        <div>
          <p className="text-main-green font-medium">Rating</p>
          <p className="mt-1 font-semibold">{product?.rating} ⭐</p>
        </div>

        {/* Sold */}
        <div>
          <p className="text-main-green font-medium">Sold</p>
          <p className="mt-1 font-semibold">{product?.sold}</p>
        </div>

        {/* Prep Time */}
        <div>
          <p className="text-main-green font-medium">Prep Time</p>
          <p className="mt-1 font-semibold">{product?.prepTime}</p>
        </div>

        {/* Ingredients */}
        <div>
          <p className="text-main-green font-medium">Ingredients</p>
          <ul className="mt-1 list-disc list-inside">
            {product?.ingredients?.length
              ? product.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))
              : "N/A"}
          </ul>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-main-green font-medium">Sizes</p>
          <ul className="mt-1 list-disc list-inside">
            {product?.sizes?.length
              ? product.sizes.map((size, idx) => (
                <li key={idx}>
                  {size?.size} - ₺{size?.price}
                </li>
              ))
              : "N/A"}
          </ul>
        </div>

        {/* Addons */}
        <div>
          <p className="text-main-green font-medium">Add-ons</p>
          <ul className="mt-1 list-disc list-inside">
            {product?.addons?.length
              ? product.addons.map((addon, idx) => (
                <li key={idx}>
                  {addon?.name} - ₺{addon?.price}
                </li>
              ))
              : "N/A"}
          </ul>
        </div>

      </div>


    </div>
  );
};

export default ProductDetails;
