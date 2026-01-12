import SectionHeader from '@/components/SctionHeader/SectionHeader'
import OrderCard from '@/components/OrderCard/OrderCard'
import OrdersHistory from './OrdersHistory'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getOrders } from '@/api/orders'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/paginatins/Pagination'


const OrdersPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(page),
    placeholderData: keepPreviousData,
  });

  const orders = data?.data ?? [];
  const pagination = data?.pagination;

  const currentPage = pagination?.currentPage ?? page;
  const lastPage = pagination?.lastPage ?? 1;



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="space-y-6">
      <OrdersView orders={orders} />

      {/* Pagination */}
      <Pagination currentPage={currentPage} lastPage={lastPage} setPage={setPage} isFetching={isFetching} />

    </div>
  );
};

export default OrdersPage;


const OrdersView = ({ orders, onStatusChange }) => {
  const pendingOrders = orders?.filter(order => order.status === "pending")
  const completedOrders = orders?.filter(order => order.status === "completed")
  const canceledOrders = orders?.filter(order => order.status === "canceled")

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pb-4' >
      <div>
        <SectionHeader title={`Pending Orders (${pendingOrders?.length})`} />
        <div className='space-y-4 '>
          {
            pendingOrders?.length > 0 ?
              pendingOrders?.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
              )) :
              <div className='flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>No orders found</div>
          }
        </div>
      </div>
      <div>
        <SectionHeader title={`Completed Orders (${completedOrders?.length})`} />
        <div className='space-y-4 '>
          {
            completedOrders?.length > 0 ?
              completedOrders?.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
              )) :
              <div className='flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>No orders found</div>
          }
        </div>
      </div>
      <div>
        <SectionHeader title={`Canceled Orders (${canceledOrders?.length})`} />
        <div className='space-y-4 '>
          {
            canceledOrders?.length > 0 ?
              canceledOrders?.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
              )) :
              <div className='flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>No orders found</div>
          }
        </div>
      </div>
    </div>
  )
}


// pending, under_receipt, under_review, in_preparation, prepared, shipped, arrived, completed, canceled, wasted