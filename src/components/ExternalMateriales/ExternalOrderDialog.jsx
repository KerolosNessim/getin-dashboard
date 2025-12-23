import React, { useState } from 'react'
import { Input } from '../ui/input';
import { AlertTriangle, Send, ShoppingCart } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ExternalOrderDialog = ({ selectedMaterial }) => {
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderError, setOrderError] = useState('');
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);



  const handleSubmitOrder = () => {
    if (!selectedMaterial) return;
    const qty = parseFloat(orderQuantity);
    if (isNaN(qty) || qty <= 0) {
      setOrderError('Please enter a valid quantity greater than 0');
      return;
    }
    setIsOrderDialogOpen(false);
    setOrderQuantity('');
    setOrderNote('');
    setOrderError('');
    toast.success('Request sent to management successfully');
  };

  return (
    <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-main-green hover:bg-main-green/90 text-main-gold shadow-sm"
        >
          <Send className="w-4 h-4 mr-1" />
          Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-main-green flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Request External Material
          </DialogTitle>
          <DialogDescription>
            Submit a request to management for external materials.
          </DialogDescription>
        </DialogHeader>

        {selectedMaterial && (
          <div className="space-y-6 py-4">
            {/* Material Info Card */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Material Name</span>
                <span className="font-semibold text-gray-900">{selectedMaterial.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Category</span>
                <span className="font-medium text-gray-900 capitalize">{selectedMaterial.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Unit</span>
                <span className="font-medium text-gray-900">{selectedMaterial.unit}</span>
              </div>
              {selectedMaterial.currentQuantity && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Current Quantity</span>
                  <span className="font-medium text-gray-900">{selectedMaterial.currentQuantity} {selectedMaterial.unit}</span>
                </div>
              )}
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Requested Quantity *</label>
                <Input
                  type="number"
                  placeholder="Enter quantity..."
                  value={orderQuantity}
                  onChange={(e) => {
                    setOrderQuantity(e.target.value);
                    setOrderError('');
                  }}
                  className={orderError ? 'border-red-500 focus:ring-red-500' : 'border-main-green/30 focus:border-main-green'}
                />
                {orderError && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {orderError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Notes (Optional)</label>
                <Textarea
                  placeholder="e.g., 'Bulb for counter area - right side' or 'Urgent - running low'"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="border-main-green/30 focus:border-main-green resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitOrder} className="bg-main-green hover:bg-main-green/90 text-main-gold">
            <Send className="w-4 h-4 mr-2" />
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExternalOrderDialog