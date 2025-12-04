import React, { useState, useMemo } from 'react';
import SectionHeader from '@/components/SctionHeader/SectionHeader';
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Package,
  Plus,
  History,
  Send,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// External Materials Data
const externalMaterialsData = [
  // Packaging Materials
  { id: 'EXT-001', name: 'Paper Cups - Small', category: 'packaging', unit: 'carton', currentQuantity: 15, maxQuantity: 50, availableToOrder: true },
  { id: 'EXT-002', name: 'Paper Cups - Medium', category: 'packaging', unit: 'carton', currentQuantity: 8, maxQuantity: 50, availableToOrder: true },
  { id: 'EXT-003', name: 'Paper Cups - Large', category: 'packaging', unit: 'carton', currentQuantity: 12, maxQuantity: 50, availableToOrder: true },
  { id: 'EXT-004', name: 'Cup Lids - Small', category: 'packaging', unit: 'carton', currentQuantity: 20, maxQuantity: 50, availableToOrder: true },
  { id: 'EXT-005', name: 'Cup Lids - Medium', category: 'packaging', unit: 'carton', currentQuantity: 18, maxQuantity: 50, availableToOrder: true },
  { id: 'EXT-006', name: 'Cup Lids - Large', category: 'packaging', unit: 'carton', currentQuantity: 22, maxQuantity: 50, availableToOrder: true },
  { id: 'EXT-007', name: 'Paper Bags - Small', category: 'packaging', unit: 'roll', currentQuantity: 5, maxQuantity: 30, availableToOrder: true },
  { id: 'EXT-008', name: 'Paper Bags - Large', category: 'packaging', unit: 'roll', currentQuantity: 3, maxQuantity: 30, availableToOrder: true },
  { id: 'EXT-009', name: 'Plastic Straws', category: 'packaging', unit: 'carton', currentQuantity: 10, maxQuantity: 40, availableToOrder: true },
  { id: 'EXT-010', name: 'Napkins', category: 'packaging', unit: 'carton', currentQuantity: 25, maxQuantity: 60, availableToOrder: true },

  // Cleaning Materials
  { id: 'EXT-011', name: 'Dishwashing Liquid', category: 'cleaning', unit: 'bottle', currentQuantity: 6, maxQuantity: 20, availableToOrder: true },
  { id: 'EXT-012', name: 'Floor Cleaner', category: 'cleaning', unit: 'bottle', currentQuantity: 4, maxQuantity: 15, availableToOrder: true },
  { id: 'EXT-013', name: 'Glass Cleaner', category: 'cleaning', unit: 'bottle', currentQuantity: 5, maxQuantity: 15, availableToOrder: true },
  { id: 'EXT-014', name: 'Sponges', category: 'cleaning', unit: 'pack', currentQuantity: 8, maxQuantity: 25, availableToOrder: true },
  { id: 'EXT-015', name: 'Microfiber Cloths', category: 'cleaning', unit: 'pack', currentQuantity: 10, maxQuantity: 30, availableToOrder: true },
  { id: 'EXT-016', name: 'Trash Bags - Small', category: 'cleaning', unit: 'roll', currentQuantity: 7, maxQuantity: 20, availableToOrder: true },
  { id: 'EXT-017', name: 'Trash Bags - Large', category: 'cleaning', unit: 'roll', currentQuantity: 5, maxQuantity: 20, availableToOrder: true },
  { id: 'EXT-018', name: 'Mop Heads', category: 'cleaning', unit: 'piece', currentQuantity: 3, maxQuantity: 10, availableToOrder: true },

  // Maintenance Materials
  { id: 'EXT-019', name: 'LED Bulbs - Warm White', category: 'maintenance', unit: 'piece', currentQuantity: 4, maxQuantity: 15, availableToOrder: true },
  { id: 'EXT-020', name: 'LED Bulbs - Cool White', category: 'maintenance', unit: 'piece', currentQuantity: 3, maxQuantity: 15, availableToOrder: true },
  { id: 'EXT-021', name: 'Power Cables', category: 'maintenance', unit: 'piece', currentQuantity: 2, maxQuantity: 10, availableToOrder: true },
  { id: 'EXT-022', name: 'Extension Cords', category: 'maintenance', unit: 'piece', currentQuantity: 1, maxQuantity: 8, availableToOrder: true },
  { id: 'EXT-023', name: 'Electrical Plugs', category: 'maintenance', unit: 'piece', currentQuantity: 5, maxQuantity: 20, availableToOrder: true },
  { id: 'EXT-024', name: 'Fuses', category: 'maintenance', unit: 'pack', currentQuantity: 2, maxQuantity: 10, availableToOrder: true },

  // Other Materials
  { id: 'EXT-025', name: 'Hand Sanitizer', category: 'other', unit: 'bottle', currentQuantity: 8, maxQuantity: 25, availableToOrder: true },
  { id: 'EXT-026', name: 'Paper Towels', category: 'other', unit: 'roll', currentQuantity: 12, maxQuantity: 40, availableToOrder: true },
  { id: 'EXT-027', name: 'Toilet Paper', category: 'other', unit: 'roll', currentQuantity: 15, maxQuantity: 50, availableToOrder: true },
  { id: 'EXT-028', name: 'Air Freshener', category: 'other', unit: 'bottle', currentQuantity: 3, maxQuantity: 12, availableToOrder: true },
  { id: 'EXT-029', name: 'Batteries - AA', category: 'other', unit: 'pack', currentQuantity: 4, maxQuantity: 15, availableToOrder: true },
  { id: 'EXT-030', name: 'Batteries - AAA', category: 'other', unit: 'pack', currentQuantity: 3, maxQuantity: 15, availableToOrder: true },
];

export default function ExternalMaterialsPage() {
  // State
  const [materials, setMaterials] = useState(externalMaterialsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Order Dialog State
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderError, setOrderError] = useState('');

  // Requests State
  const [requests, setRequests] = useState([
    {
      id: 'EXT-REQ-001',
      materialName: 'Paper Cups - Medium',
      quantity: 10,
      notes: 'Urgent - Running low',
      date: '2025-12-03',
      status: 'pending',
      adminResponse: 'Under review'
    },
    {
      id: 'EXT-REQ-002',
      materialName: 'LED Bulbs - Warm White',
      quantity: 2,
      notes: 'Counter area - right side',
      date: '2025-12-02',
      status: 'shipped',
      adminResponse: 'Shipped via courier'
    },
    {
      id: 'EXT-REQ-003',
      materialName: 'Dishwashing Liquid',
      quantity: 5,
      notes: '',
      date: '2025-12-01',
      status: 'delivered',
      adminResponse: 'Delivered successfully'
    }
  ]);

  // Derived State
  const filteredMaterials = useMemo(() => {
    return materials.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [materials, searchQuery, categoryFilter]);

  // Categories for filter
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'packaging', label: 'Packaging Materials' },
    { value: 'cleaning', label: 'Cleaning Materials' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'other', label: 'Other' },
  ];

  // Handlers
  const handleOrderClick = (item) => {
    setSelectedMaterial(item);
    setOrderQuantity('');
    setOrderNote('');
    setOrderError('');
    setIsOrderDialogOpen(true);
  };

  const handleSubmitOrder = () => {
    if (!selectedMaterial) return;

    const qty = parseFloat(orderQuantity);

    if (isNaN(qty) || qty <= 0) {
      setOrderError('Please enter a valid quantity greater than 0');
      return;
    }

    // Success
    const newRequest = {
      id: `EXT-REQ-${Math.floor(Math.random() * 10000)}`,
      materialName: selectedMaterial.name,
      quantity: qty,
      notes: orderNote,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      adminResponse: 'Pending review'
    };

    setRequests([newRequest, ...requests]);
    setIsOrderDialogOpen(false);

    toast.success('Request sent to management successfully');
  };

  // Simulate Admin Delivery (For Demo Purpose)
  const handleSimulateDelivery = (reqId) => {
    const request = requests.find(r => r.id === reqId);
    if (!request || request.status === 'delivered') return;

    // Update Request Status
    const updatedRequests = requests.map(r =>
      r.id === reqId
        ? { ...r, status: 'delivered', adminResponse: 'Delivered (Simulated)', date: new Date().toISOString().split('T')[0] }
        : r
    );
    setRequests(updatedRequests);

    toast.success(`Request ${reqId} marked as Delivered.`);
  };

  return (
    <div className="space-y-8 pb-10">
      <SectionHeader title="External Materials" />

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-xl border border-main-green/20 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-main-green/30 focus:border-main-green"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[220px] border-main-green/30">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-main-green/20 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-main-green/10 bg-main-gold/5">
          <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
            <Package className="w-5 h-5" />
            External Materials Inventory
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-main-green text-main-gold uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Material Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4 text-center">Current Qty</th>
                <th className="px-6 py-4 text-center">Max Limit</th>
                <th className="px-6 py-4 text-center">Available to Order</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMaterials.map((item) => {
                const available = item.availableToOrder ? 'Yes' : 'No';
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className="capitalize px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{item.unit}</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-900">
                      {item.currentQuantity || '-'}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500">
                      {item.maxQuantity || '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant={item.availableToOrder ? 'default' : 'secondary'}
                        className={item.availableToOrder ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}
                      >
                        {available}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        size="sm"
                        onClick={() => handleOrderClick(item)}
                        disabled={!item.availableToOrder}
                        className="bg-main-green hover:bg-main-green/90 text-main-gold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Order
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filteredMaterials.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No materials found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* External Material Requests Table */}
      <div className="bg-white rounded-xl border border-main-green/20 shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-main-green/10 bg-main-gold/5">
          <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
            <History className="w-5 h-5" />
            External Material Requests
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Admin Response</th>
                <th className="px-6 py-4 text-center">Demo Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{req.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{req.materialName}</td>
                  <td className="px-6 py-4 text-center font-semibold">{req.quantity}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                    {req.notes || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{req.date}</td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600 italic">
                    {req.adminResponse || '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {req.status !== 'delivered' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSimulateDelivery(req.id)}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 h-7"
                      >
                        Simulate Delivery
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
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
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    accepted: 'bg-blue-100 text-blue-800 border-blue-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
  };

  const labels = {
    pending: 'Pending Review',
    accepted: 'Accepted',
    rejected: 'Rejected',
    shipped: 'Shipped',
    delivered: 'Delivered',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  );
}
