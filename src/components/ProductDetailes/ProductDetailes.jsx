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
            src={product?.images[0]}
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
          {/* Product category */}
          <div>
            <p className="text-main-green font-medium">Product Category</p>
            <p className="mt-1 font-semibold text-main-green">{product?.category?.name}</p>
          </div>
          {/* Price after coupon */}
          <div>
            <p className="text-main-green font-medium">Price after coupon</p>
            <p className="mt-1 font-semibold text-main-green">₺{product?.price_after_coupon}</p>
          </div>
          {/* Remaining Quantity */}
          <div>
            <p className="text-main-green font-medium">Remaining Quantity</p>
            <p className="mt-1 font-semibold text-main-green">{product?.remaining_quantity}</p>
          </div>
          {/* points */}
          <div>
            <p className="text-main-green font-medium">Points</p>
            <p className="mt-1 font-semibold text-main-green">{product?.points}</p>
          </div>
          {/* Rating */}
          <div>
            <p className="text-main-green font-medium">Rating</p>
            <p className="mt-1 font-semibold">⭐ {product?.rating_avg} ({product?.stars})</p>
          </div>
          {/* Sold */}
          <div>
            <p className="text-main-green font-medium">Sold</p>
            <p className="mt-1 font-semibold">{product?.total_sales}</p>
          </div>
        </div>
      </div>

      {/* options */}
      {product?.options?.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-main-green mb-6">Options</h2>
          <div className="p-6 rounded-lg bg-main-green/10 border-l-4 border-main-green shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Options Section */}
              {product?.options?.map((option) => (
                <div key={option.id} className="bg-white/50 p-5 rounded-lg border border-main-gold/30">
                  <h3 className="text-lg font-bold text-main-green mb-3 flex items-center gap-2">
                    {option.name}
                  </h3>
                  <div className="space-y-2">
                    {option.values.map((value) => (
                      <div
                        key={value.id}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg ${value.is_recommended
                          ? "bg-main-green/10 border border-main-green/50 shadow-sm"
                          : "bg-main-gold/10"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-main-green">
                            {value.value}
                          </span>
                          {value.is_recommended === 1 && (
                            <span className="text-xs bg-main-green text-main-gold px-2 py-0.5 rounded-full font-bold">
                              Recommended
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-main-green">
                          {Number(value.extra_price) > 0 ? `+ ₺${value.extra_price}` : "Free"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {product?.perpar_steps?.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-main-green mb-6">Preparation Steps</h2>
          <div className="p-6 rounded-lg bg-main-green/10 border-l-4 border-main-green shadow-sm">
            
              {product?.perpar_steps?.map((step,index) => (
                <div key={index} className="bg-white/50 p-5 rounded-lg border border-main-gold/30 flex items-center gap-4 mb-4">
                  <div className="bg-main-green size-10 rounded-full flex items-center justify-center">
                    <p className="text-white font-bold">{index + 1}</p>
                  </div>
                  <p>{step.step}</p>
                </div>
              ))}
            </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
