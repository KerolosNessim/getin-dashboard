import { Coffee, Plus } from "lucide-react";

const ProductDetails = ({ product }) => {
  console.log(product)
  return (
    <div className="space-y-6">
      {/* Main Product Info Card */}
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

        </div>
      </div>

      {/* Preparation Guide Section */}
      <h2 className="text-2xl font-bold text-main-green">Preparation Guide</h2>
      <div className="p-6 rounded-lg bg-main-green/10 border-l-4 border-main-green shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Ingredients Section */}
          <div className="bg-white/50 p-5 rounded-lg border border-main-gold/30">
            <h3 className="text-lg font-bold text-main-green mb-3 flex items-center gap-2">
              Ingredients
            </h3>
            <div className="space-y-2">
              <ul className="mt-1 list-disc list-inside space-y-2">
                {product?.ingredients?.length
                  ? product.ingredients.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-main-gold/10 px-4 py-2 rounded-lg"
                    >
                      <span className="font-semibold text-main-green">{item}</span>
                    </div>
                  ))
                  : "N/A"}
              </ul>
            </div>
          </div>
          {/* Cup Sizes Section */}
          <div className="bg-white/50 p-5 rounded-lg border border-main-gold/30">
            <h3 className="text-lg font-bold text-main-green mb-3 flex items-center gap-2">
              Available Cup Sizes
            </h3>
            <div className="space-y-2">
              {product?.sizes?.length ? (
                product.sizes.map((size, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-main-gold/10 px-4 py-2 rounded-lg"
                  >
                    <span className="font-semibold text-main-green">{size?.size}</span>
                    <span className="font-bold text-main-green">₺{size?.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No sizes available</p>
              )}
            </div>
          </div>

          {/* Add-ons Section */}
          <div className="bg-white/50 p-5 rounded-lg border border-main-gold/30">
            <h3 className="text-lg font-bold text-main-green mb-3 flex items-center gap-2">
              Available Add-ons
            </h3>
            <div className="space-y-2">
              {product?.addons?.length ? (
                product.addons.map((addon, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-main-gold/10 px-4 py-2 rounded-lg"
                  >
                    <span className="font-medium text-main-green">{addon?.name}</span>
                    <span className="font-bold text-main-green">
                      {addon?.price > 0 ? `+ ₺${addon?.price}` : 'Free'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No add-ons available</p>
              )}
            </div>
          </div>
          {/* prep Time Section */}
          <div className="bg-white/50 p-5 rounded-lg border border-main-gold/30">
            <h3 className="text-lg font-bold text-main-green mb-3 flex items-center gap-2">
              Prep Time
            </h3>
            <p className="mt-1 font-semibold text-main-green text-xl">{product?.prepTime}</p> 
          </div>

          {/* Preparation Instructions */}
          <div className="bg-white/50 p-5 rounded-lg border border-main-gold/30 md:col-span-2">
            <h3 className="text-lg font-bold text-main-green mb-3">
              Preparation Steps
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-main-green text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <p className="text-gray-700">Choose the <strong>cup size</strong> from the available options</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-main-green text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <p className="text-gray-700">Add the basic ingredients: <strong>{product?.ingredients?.join(', ') || 'N/A'}</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-main-green text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <p className="text-gray-700">Select <strong>add-ons</strong> based on customer preference (each add-on has its own price)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-main-green text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <p className="text-gray-700">Estimated preparation time: <strong className="text-main-green">{product?.prepTime}</strong></p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
