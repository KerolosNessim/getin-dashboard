import { getOrderbyId, getOrders } from '@/api/orders'
import BackwordBtn from '@/components/BackwordBtn/BackwordBtn'
import OrderCard from '@/components/OrderCard/OrderCard'
import OrderDetails from '@/components/OrderDetailes/OrderDetailes'
import SectionHeader from '@/components/SctionHeader/SectionHeader'
import Pagination from '@/components/paginatins/Pagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleOrderPage = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(page),
    placeholderData: keepPreviousData,
  });
  const restOrders = data?.data ?? [];
  const pagination = data?.pagination;
  const currentPage = pagination?.currentPage ?? page;
  const lastPage = pagination?.lastPage ?? 1;
  const { data: SingleOrder } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrderbyId(id),
  });
  console.log(SingleOrder);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div className='grid grid-cols-3 gap-4  '>
      <div className='col-span-1  h-[calc(100vh-1rem)] overflow-y-scroll no-scrollbar'>
        <div className='flex items-start gap-2'>
          <SectionHeader title={"Rest Orders"} />
          <p className='text-main-green text-2xl font-bold'>({restOrders.length})</p>
        </div>
        <div className='flex flex-col gap-2 pb-4'>
          {restOrders
            ?.filter(
              (order) =>
                order.status === "pending" ||
                order.status === "completed" ||
                order.status === "canceled"
            )
            .map((order) => (
              <OrderCard order={order} key={order.id} />
            ))}
          {/* Pagination */}
          <Pagination currentPage={currentPage} lastPage={lastPage} setPage={setPage} isFetching={isFetching} />
        </div>
      </div>
      <div className='col-span-2  h-[calc(100vh-1rem)] overflow-y-scroll no-scrollbar pb-4'>
        <div className='flex items-center justify-between'>
        <SectionHeader title={"Order Details"} />
        <BackwordBtn />
        </div>
        <OrderDetails order={SingleOrder} />
      </div>
    </div>
  )
}

export default SingleOrderPage
