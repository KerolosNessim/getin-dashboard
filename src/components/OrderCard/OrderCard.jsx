import React from 'react';
import { Clock, CheckCircle, MapPin, ShoppingBag, Calendar, Clock as ClockIcon, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const OrderCard = ({ order, onStatusChange, withStatusChangeButton = true }) => {
  const isCompleted = order.status === 'completed';
  const bgColor = isCompleted ? 'bg-main-green/10' : 'bg-main-gold/20';
  const textColor = isCompleted ? 'text-main-green' : 'text-yellow-700';
  const borderColor = isCompleted ? 'border-main-green' : 'border-main-gold';

  // Format the date to be more readable
  const formatDate = (dateTime) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTime).toLocaleDateString('en-US', options);
  };

  return (
    <div className={`border rounded-lg p-4  ${bgColor} border-l-4 ${borderColor}-500 ${borderColor} transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={`text-lg font-semibold ${textColor} flex items-center gap-2`}>
            {isCompleted ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Clock className="w-5 h-5" />
            )}
            Order #{order.orderNumber}
          </h3>
          <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        {order.type === 'Delivery' ? (
          <MapPin className="w-4 h-4" />
        ) : (
          <ShoppingBag className="w-4 h-4" />
        )}
        <span>{order.type}</span>
        <span className="mx-2">•</span>
        <ClockIcon className="w-4 h-4" />
        <span>{formatDate(order.pickupTime || order.deliveryTime)}</span>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Items</span>
          <span className="font-medium">{order.itemsCount} items</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total</span>
          <span className="font-bold">${order?.totals?.finalAmount || '0.00'}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        {
          withStatusChangeButton && (
            order.status === 'pending' && (
              <button onClick={() => onStatusChange(order.id, 'completed')} className="px-4 py-2 rounded-md text-sm text-main-green font-medium flex items-center gap-1 bg-main-green/30 hover:bg-main-green/20">
                <FaCheck size={16} />
                Change Status
              </button>
            )
          )
        }
        <Link to={`/orders/${order.id}`} className={`px-4 py-2 rounded-md text-sm text-main-green font-medium flex items-center gap-1 ${isCompleted ? 'bg-main-green/30  hover:bg-main-green/20' : 'bg-main-gold/40  hover:bg-main-gold/20'}`}>
          <Eye size={16} />
          View Details
        </Link>

      </div>
    </div>
  );
};

export default OrderCard;
