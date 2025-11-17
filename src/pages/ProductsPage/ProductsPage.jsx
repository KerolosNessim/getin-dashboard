
import ProductCard from "@/components/ProductCard/ProductCard";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import { products } from "@/data";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function ProductsPage() {
  const tabStyle = "bg-main-gold text-main-green text-base  h-12! data-[state=active]:bg-main-green data-[state=active]:text-main-gold"
  const [allProducts, setAllProducts] = useState(products);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [unavalaibleProducts, setUnavalaibleProducts] = useState([]);

  const handleStatusChange = (productId, newStatus) => {
    setAllProducts(allProducts.map(product => product.id === productId ? { ...product, status: newStatus } : product))


  };

  useEffect(() => {
    setAvailableProducts(allProducts.filter(product => product.status === true))
    setUnavalaibleProducts(allProducts.filter(product => product.status === false))
  }, [allProducts])

  return (
    <div className="pb-4">
      <SectionHeader title="Products" />
      <Tabs defaultValue="available" className="w-full">
        <TabsList className={"bg-transparent gap-2 "}>
          <TabsTrigger className={tabStyle} value="available">Available ({availableProducts.length})</TabsTrigger>
          <TabsTrigger className={tabStyle} value="unavailable">Unavailable ({unavalaibleProducts.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              availableProducts.length > 0 ?
                availableProducts.map(product => (
                  <ProductCard key={product.id} product={product} onStatusChange={handleStatusChange} />
                )) :
                <div className='flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>No products found</div>
            }
          </div>
        </TabsContent>
        <TabsContent value="unavailable">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              unavalaibleProducts.length > 0 ?
                unavalaibleProducts.map(product => (
                  <ProductCard key={product.id} product={product} onStatusChange={handleStatusChange} />
                )) :
                <div className='flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>No products found</div>
            }
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}