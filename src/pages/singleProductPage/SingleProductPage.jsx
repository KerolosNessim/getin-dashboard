import { getAllProducts, getSingleProduct } from '@/api/products'
import BackwordBtn from '@/components/BackwordBtn/BackwordBtn'
import ProductCard from '@/components/ProductCard/ProductCard'
import ProductDetails from '@/components/ProductDetailes/ProductDetailes'
import SectionHeader from '@/components/SctionHeader/SectionHeader'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const SingleProductPage = () => {
  const { id } = useParams()

  
  const { data: singleProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id, // مهم عشان id ممكن يبقى undefined أول render
  })
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
    enabled: true,
  })
  
  const restProducts = useMemo(() => {
    const cachedProducts = products ?? []
    return cachedProducts.filter((product) => product.id !== Number(id))
  }, [products, id])

  return (
    <div className='grid grid-cols-3 gap-4 '>
      <div className='col-span-1  h-[calc(100vh-1rem)] overflow-y-scroll no-scrollbar'>
        <div className='flex items-start gap-2'>
          <SectionHeader title={"Rest Products"} />
          <p className='text-main-green text-2xl font-bold'>({restProducts.length})</p>
        </div>

        <div className='flex flex-col gap-2 pb-4'>
          {restProducts.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              withStatusChangeButton={false}
            />
          ))}
        </div>
      </div>

      <div className='col-span-2  h-[calc(100vh-1rem)] overflow-y-scroll no-scrollbar pb-4'>
        <div className='flex items-center justify-between'>
          <SectionHeader title={"Product Details"} />
          <BackwordBtn />
        </div>
        <ProductDetails product={singleProduct} />
      </div>
    </div>
  )
}

export default SingleProductPage
