import SectionHeader from '@/components/SctionHeader/SectionHeader'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { orders } from '@/data'
import OrderCard from '@/components/OrderCard/OrderCard'
const OrdersPage = () => {
  const tabStyle = "bg-main-gold text-main-green text-base  h-12! data-[state=active]:bg-main-green data-[state=active]:text-main-gold"
  const [allOrders, setAllOrders] = useState(orders)
  const [pendingOrders, setPendingOrders] = useState([])
  const [completedOrders, setCompletedOrders] = useState([])

  const handleStatusChange = (orderId, status) => {
    setAllOrders(allOrders.map(order => order.id === orderId ? { ...order, status } : order))
    setPendingOrders(pendingOrders.map(order => order.id === orderId ? { ...order, status } : order))
    setCompletedOrders(completedOrders.map(order => order.id === orderId ? { ...order, status } : order))
  }

  useEffect(() => {
    setPendingOrders(allOrders.filter(order => order.status === "pending"))
    setCompletedOrders(allOrders.filter(order => order.status === "completed"))
  }, [allOrders])
  return (
    <div className="pb-4">
      <SectionHeader title="Orders" />
      <Tabs defaultValue="all" className="w-full">
        <TabsList className={"bg-transparent gap-2 "}>
          <TabsTrigger className={tabStyle} value="all">All ({allOrders.length})</TabsTrigger>
          <TabsTrigger className={tabStyle} value="pending">Pending ({pendingOrders.length})</TabsTrigger>
          <TabsTrigger className={tabStyle} value="completed">Completed ({completedOrders.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              allOrders.length > 0 ?
                allOrders.map(order => (
                  <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                )) :
                <div className='flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>No orders found</div>
            }
          </div>
        </TabsContent>
        <TabsContent value="completed">
          {
            completedOrders.length > 0 ?
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                  completedOrders.map(order => (
                    <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))
                }
              </div> :
              <div className='flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>No orders found</div>
          }
        </TabsContent>
        <TabsContent value="pending">
          {
            pendingOrders.length > 0 ?
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                  pendingOrders.map(order => (
                    <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))
                }
              </div> :
              <div className='flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>No orders found</div>
          }
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OrdersPage
