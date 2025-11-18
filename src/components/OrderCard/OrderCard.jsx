import React, { useState } from 'react';
import { Clock, CheckCircle, MapPin, ShoppingBag, Calendar, Clock as ClockIcon, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GiCardExchange } from "react-icons/gi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaCheck, FaTimes } from 'react-icons/fa';
const OrderCard = ({ order, onStatusChange, withStatusChangeButton = true }) => {
  const isCompleted = order.status === 'completed';
  const isCancelled = order.status === 'canceled';
  const bgColor = isCompleted ? 'bg-main-green/10' : isCancelled ? 'bg-red-50' : 'bg-main-gold/20';
  const textColor = isCompleted ? 'text-main-green' : isCancelled ? 'text-red-700' : 'text-yellow-700';
  const borderColor = isCompleted ? 'border-main-green' : isCancelled ? 'border-red-500' : 'border-main-gold';
  const [isOpen, setIsOpen] = useState(false);
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
  function handleStatusChange(status) {
    onStatusChange(order.id, status);
    setIsOpen(false);
  }

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
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${isCompleted ? 'bg-green-100 text-green-800' :
          isCancelled ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
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
              <Dialog>
                <DialogTrigger className="px-4 py-2 rounded-md text-sm text-main-green font-medium flex items-center gap-1 bg-main-green/30 hover:bg-main-green/20">
                  <GiCardExchange />
                  Change Status
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className={"space-y-4"}>
                    <DialogTitle className={"text-main-green text-xl font-bold text-center"}>Change order's status</DialogTitle>
                    <DialogDescription className="flex items-center justify-center gap-2">
                      <button className="px-4 py-2 rounded-md text-sm text-main-green font-medium flex items-center gap-1 bg-main-green/30 hover:bg-main-green/20"
                        onClick={() => handleStatusChange('completed')}>
                        <FaCheck />
                        Completed
                      </button>
                      <button className="px-4 py-2 rounded-md text-sm text-red-500 font-medium flex items-center gap-1 bg-red-200 hover:bg-red-300"
                        onClick={() => handleStatusChange('canceled')}>
                        <FaTimes />
                        Canceled
                      </button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )
          )
        }
        <Link to={`/orders/${order.id}`} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${isCompleted ? 'text-main-green bg-main-green/30 hover:bg-main-green/20' :
          isCancelled ? 'text-red-600 bg-red-100 hover:bg-red-200' :
            'text-main-green bg-main-gold/40 hover:bg-main-gold/20'
          }`}>
          <Eye size={16} />
          View Details
        </Link>

      </div>
    </div>
  );
};

export default OrderCard;
