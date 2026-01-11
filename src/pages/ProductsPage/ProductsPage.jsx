import ProductCard from "@/components/ProductCard/ProductCard";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { getAllProducts, getCategories, getProductsByCategoryId } from "@/api/products"
import { useEffect, useState } from "react";


export default function ProductsPage() {
  const tabStyle = "bg-main-gold text-main-green text-base h-12 data-[state=active]:bg-main-green data-[state=active]:text-main-gold transition-all duration-200"
  const [available, setAvailable] = useState([])
  const [unavailable, setUnavailable] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const { data: productsByCategoryId } = useQuery({
    queryKey: ["productsByCategoryId", selectedCategory],
    queryFn: () => getProductsByCategoryId(selectedCategory),
  })

  useEffect(() => {
    if (products) {
      const availableProducts = products.filter(product => product.is_available === true);
      const unavailableProducts = products.filter(product => product.is_available === false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAvailable(availableProducts);
      setUnavailable(unavailableProducts);
    }
  }, [products]);







  return (
    <div className="pb-4">
      <SectionHeader title="Products" />

      {/* Availability Toggle */}
      <div className="mb-6">
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="bg-transparent gap-2">
            <TabsTrigger className={tabStyle} value="available">
              Available ({available?.length})
            </TabsTrigger>
            <TabsTrigger className={tabStyle} value="unavailable">
              Unavailable ({unavailable?.length})
            </TabsTrigger>
          </TabsList>

          {/* avaliable */}
          <TabsContent value="available">
            {/* Category Tabs */}
            <Tabs defaultValue="all" className="w-full" >
              <TabsList className="bg-transparent gap-2 flex-wrap h-auto mb-6">
                <TabsTrigger
                  className={tabStyle}
                  value="all"
                >
                  All Products ({products?.length})
                </TabsTrigger>
                {categories?.map(category => (
                  <TabsTrigger
                    key={category?.id}
                    className={tabStyle}
                    value={String(category?.id)}
                    onClick={() => setSelectedCategory(category?.id)}
                  >
                    {category?.name} ({category?.count})
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {
                    products?.length > 0 ? (
                      products?.map(product => (
                        <ProductCard
                          key={product?.id}
                          product={product}
                        />
                      ))
                    ) : (
                      <div className='col-span-full flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>
                        No products found in this category
                      </div>
                    )
                  }
                </div>
              </TabsContent>
              {/* Products Grid */}
              {categories?.map(category => (
                <TabsContent key={category?.id} value={String(category?.id)}>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                      productsByCategoryId?.length > 0 ? (
                        productsByCategoryId?.map(product => (
                            <ProductCard
                              key={product?.id}
                              product={product}
                            />
                        ))
                      ) : (
                        <div className='col-span-full flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>
                          No products found in this category
                        </div>
                      )
                    }
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
          {unavailable?.length > 0 && (
            <TabsContent value="unavailable">
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                  unavailable?.length > 0 ? (
                    unavailable?.map(product => (
                      <ProductCard
                        key={product?.id}
                        product={product}
                      />
                    ))
                  ) : (
                    <div className='col-span-full flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>
                      No products found in this category
                    </div>
                  )
                }
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>


    </div>
  );
}




