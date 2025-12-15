import SectionHeader from '@/components/SctionHeader/SectionHeader'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { orders } from '@/data'
import OrderCard from '@/components/OrderCard/OrderCard'
import OrdersHistory from './OrdersHistory'


const OrdersPage = () => {

  const tabStyle = "bg-main-gold text-main-green text-base h-12 data-[state=active]:bg-main-green data-[state=active]:text-main-gold transition-all duration-200"
  const [allOrders, setAllOrders] = useState(orders)

  const handleStatusChange = (orderId, status) => {
    setAllOrders(allOrders.map(order => order.id === orderId ? { ...order, status } : order))
  }

  const pickupOrders = allOrders.filter(order => order.type === "Pickup")
  const deliveryOrders = allOrders.filter(order => order.type === "Delivery")

  return (
    <div className='space-y-6'>
      <Tabs defaultValue="pickup" className="w-full">
        <TabsList className=" bg-transparent gap-4 mb-6">
          <TabsTrigger className={tabStyle} value="pickup">Pickup</TabsTrigger>
          <TabsTrigger className={tabStyle} value="delivery">Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value="pickup">
          <OrdersView orders={pickupOrders} onStatusChange={handleStatusChange} />
        </TabsContent>

        <TabsContent value="delivery">
          <OrdersView orders={deliveryOrders} onStatusChange={handleStatusChange} />
        </TabsContent>
      </Tabs>

      <OrdersHistory orders={allOrders} />
    </div>
  )
}

export default OrdersPage


const OrdersView = ({ orders, onStatusChange }) => {
  const pendingOrders = orders.filter(order => order.status === "pending")
  const completedOrders = orders.filter(order => order.status === "completed")
  const canceledOrders = orders.filter(order => order.status === "canceled")

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pb-4' >
      <div>
        <SectionHeader title={`Pending Orders (${pendingOrders.length})`} />
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
        <SectionHeader title={`Completed Orders (${completedOrders.length})`} />
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
        <SectionHeader title={`Canceled Orders (${canceledOrders.length})`} />
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