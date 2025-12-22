import  { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Send, Package } from 'lucide-react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const MatiralOrderDialog = ({ selectedMaterial }) => {
  const [open, setOpen] = useState(false)
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderError, setOrderError] = useState('');
  const handleSubmitOrder = () => {
    setOpen(false)
  }
  function getAvailableToOrder(item) {
    return Math.max(0, item.maxQuantity - item.quantity);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Package className="w-5 h-5" />
            Request Material
          </DialogTitle>
          <DialogDescription>
            Submit a request to inventory management for more stock.
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
                <span className="text-sm text-gray-500">Current Quantity</span>
                <span className="font-medium text-gray-900">{selectedMaterial.quantity} {selectedMaterial.unit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Max Limit</span>
                <span className="font-medium text-gray-900">{selectedMaterial.maxQuantity} {selectedMaterial.unit}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm font-medium text-main-green">Available to Order</span>
                <span className="font-bold text-lg text-main-green">
                  {getAvailableToOrder(selectedMaterial)} {selectedMaterial.unit}
                </span>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Requested Quantity</label>
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
                  placeholder="Add any specific details or urgency..."
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
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitOrder} className="bg-main-green hover:bg-main-green/90 text-main-gold">
            <Send className="w-4 h-4 mr-2" />
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MatiralOrderDialog