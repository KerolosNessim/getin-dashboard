import React from 'react'
import SectionHeader from '@/components/SctionHeader/SectionHeader'

const OrdersHistory = ({ orders }) => {
  // Sort orders by date (newest first)
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'canceled':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className='mt-8 pb-8'>
      <SectionHeader title="Orders History" />

      <div className="bg-white rounded-lg border border-main-green/20 overflow-hidden mt-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-main-green text-main-gold">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Order No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Total Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Platform</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-main-green/10">
              {sortedOrders.length > 0 ? (
                sortedOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`
                      transition-colors hover:bg-main-gold/10
                      ${index % 2 === 0 ? 'bg-white' : 'bg-main-gold/5'}
                    `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-main-green">#{order.orderNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-main-gold/20 text-main-green text-xs font-medium rounded-full border border-main-gold/30">
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.itemsCount} Items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-main-green">${order.totals.finalAmount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.platform}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No orders found in history
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrdersHistory
