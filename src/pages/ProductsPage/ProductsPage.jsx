
import ProductCard from "@/components/ProductCard/ProductCard";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import { products } from "@/data";
import { useState } from "react";


export default function ProductsPage() {
  const [productsList, setProductsList] = useState(products);

  const handleStatusChange = (productId, newStatus) => {
    setProductsList(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, status: newStatus }
          : product
      )
    );
  };

  return (
    <div>
      <SectionHeader title="Products" />
      <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}