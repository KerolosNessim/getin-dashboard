import BackwordBtn from '@/components/BackwordBtn/BackwordBtn'
import OrderCard from '@/components/OrderCard/OrderCard'
import OrderDetails from '@/components/OrderDetailes/OrderDetailes'
import SectionHeader from '@/components/SctionHeader/SectionHeader'
import { orders } from '@/data'
import { Clock, MapPin, ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleOrderPage = () => {
  const { id } = useParams()
  const [SingleOrder, setSingleOrder] = useState({})
  const [restOrders, setRestOrders] = useState([])

  useEffect(() => {
    setSingleOrder(orders.find(order => order.id === String(id)))
    setRestOrders(orders.filter(order => order.id !== String(id)))
  }, [id])
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  return (
    <div className='grid grid-cols-3 gap-4  '>
      <div className='col-span-1  h-[calc(100vh-1rem)] overflow-y-scroll no-scrollbar'>
        <div className='flex items-start gap-2'>
          <SectionHeader title={"Rest Orders"} />
          <p className='text-main-green text-2xl font-bold'>({restOrders.length})</p>
        </div>
        <div className='flex flex-col gap-2 pb-4'>
          {restOrders.map(order => (
            <OrderCard order={order} key={order.id} withStatusChangeButton={false} />
          ))}
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
