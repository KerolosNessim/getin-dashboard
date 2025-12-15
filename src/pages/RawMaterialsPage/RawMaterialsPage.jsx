import React, { useState, useMemo } from 'react';
import { inventory, inventoryHistory } from '@/data';
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
  XCircle,
  ArrowUpDown // Add sorting icon
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
import { toast } from 'sonner'; // Assuming sonner is used, or I'll use a simple alert if not found. 
// Actually, I don't see sonner in package.json, so I'll just use a state-based toast or alert for now.

export default function RawMaterialsPage() {
  // State
  const [materials, setMaterials] = useState(inventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // Sort config

  // Order Dialog State
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderError, setOrderError] = useState('');

  // Requests State
  const [requests, setRequests] = useState([
    {
      id: 'REQ-001',
      materialName: 'Coffee Beans',
      quantity: 20,
      date: '2025-12-01 12:32',
      status: 'pending', // pending, accepted, rejected, shipped, delivered
      adminResponse: 'Under review'
    },
    {
      id: 'REQ-002',
      materialName: 'Fresh Milk',
      quantity: 10,
      date: '2025-11-30 12:40',
      status: 'delivered',
      adminResponse: 'Delivered on time'
    }
  ]);

  // Admin Action Dialog State
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  // Derived State
  const filteredMaterials = useMemo(() => {
    return materials.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      let matchesStatus = true;
      if (statusFilter !== 'all') {
        const status = getStockStatus(item).status; // 'low', 'critical', 'good'
        if (statusFilter === 'low') matchesStatus = status === 'low' || status === 'critical';
        if (statusFilter === 'good') matchesStatus = status === 'good';
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [materials, searchQuery, categoryFilter, statusFilter]);

  // Sorting Logic
  const sortedMaterials = useMemo(() => {
    let sorted = [...filteredMaterials];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (sortConfig.key === 'name') {
          return sortConfig.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (sortConfig.key === 'status') {
          const statusOrder = { critical: 0, low: 1, warning: 2, good: 3 };
          const statusA = statusOrder[getStockStatus(a).status] ?? 4;
          const statusB = statusOrder[getStockStatus(b).status] ?? 4;
          return sortConfig.direction === 'asc' ? statusA - statusB : statusB - statusA;
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredMaterials, sortConfig]);

  // Helpers
  function getStockStatus(item) {
    if (item.quantity <= item.minQuantity * 0.5) {
      return { status: 'critical', label: 'Critical', color: 'bg-red-100 text-red-700 border-red-200' };
    } else if (item.quantity <= item.minQuantity) {
      return { status: 'low', label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    }
    return { status: 'good', label: 'Good', color: 'bg-green-100 text-green-700 border-green-200' };
  }

  function getAvailableToOrder(item) {
    return Math.max(0, item.maxQuantity - item.quantity);
  }

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
    const available = getAvailableToOrder(selectedMaterial);

    if (isNaN(qty) || qty <= 0) {
      setOrderError('Please enter a valid quantity greater than 0');
      return;
    }

    if (qty > available) {
      setOrderError(`Requested quantity exceeds max limit. Allowed: ${available} ${selectedMaterial.unit}`);
      return;
    }

    // Success
    const newRequest = {
      id: `REQ-${Math.floor(Math.random() * 10000)}`,
      materialName: selectedMaterial.name,
      quantity: qty,
      date: new Date().toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      status: 'pending',
      adminResponse: 'Pending review'
    };

    setRequests([newRequest, ...requests]);
    setIsOrderDialogOpen(false);

    // Show simple alert/toast simulation
    toast.success('Request sent to inventory management successfully');
  };

  // Open Admin Action Dialog
  const handleOpenAdminDialog = (request) => {
    setSelectedRequest(request);
    setAdminNotes('');
    setIsAdminDialogOpen(true);
  };

  // Handle Accept Request
  const handleAcceptRequest = () => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'accepted', adminResponse: adminNotes || 'Request accepted' }
        : r
    );
    setRequests(updatedRequests);
    setIsAdminDialogOpen(false);
    toast.success('Request accepted successfully');
  };

  // Handle Reject Request
  const handleRejectRequest = () => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'rejected', adminResponse: adminNotes || 'Request rejected' }
        : r
    );
    setRequests(updatedRequests);
    setIsAdminDialogOpen(false);
    toast.error('Request rejected');
  };

  // Handle Sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle Deliver Request
  const handleDeliverRequest = () => {
    if (!selectedRequest) return;

    // Update Request Status
    const updatedRequests = requests.map(r =>
      r.id === selectedRequest.id
        ? {
          ...r,
          status: 'delivered',
          adminResponse: adminNotes || 'Delivered successfully',
          date: new Date().toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        }
        : r
    );
    setRequests(updatedRequests);

    // Update Inventory Quantity
    const updatedMaterials = materials.map(item => {
      if (item.name === selectedRequest.materialName) {
        return { ...item, quantity: item.quantity + selectedRequest.quantity };
      }
      return item;
    });
    setMaterials(updatedMaterials);

    setIsAdminDialogOpen(false);
    toast.success(`Request ${selectedRequest.id} marked as Delivered. Inventory updated.`);
  };

  // Categories for filter
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'sweetener', label: 'Sweetener' },
    { value: 'flavoring', label: 'Flavoring' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'tea', label: 'Tea' },
    { value: 'herbs', label: 'Herbs' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <SectionHeader title="Raw Materials" />

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
            <SelectTrigger className="w-[180px] border-main-green/30">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-main-green/30">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="low">Low / Critical</SelectItem>
              <SelectItem value="good">Good</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-main-green/20 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-main-green/10 bg-main-gold/5">
          <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
            Materials Inventory
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-main-green text-main-gold uppercase text-xs font-semibold">
              <tr>
                <th
                  className="px-6 py-4 cursor-pointer hover:bg-main-green/90 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Material Name <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4 text-center">Current Qty</th>
                <th className="px-6 py-4 text-center">Min Limit</th>
                <th className="px-6 py-4 text-center">Max Limit</th>
                <th className="px-6 py-4 text-center">Available to Order</th>
                <th
                  className="px-6 py-4 text-center cursor-pointer hover:bg-main-green/90 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center justify-center gap-2">
                    Status <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedMaterials.map((item) => {
                const stockStatus = getStockStatus(item);
                const available = getAvailableToOrder(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                      <img src={"/coffee.png"} alt={item.name} className="size-14 object-contain" />
                      <p>{item.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{item.unit}</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-900">
                      {item.quantity}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{item.minQuantity}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{item.maxQuantity}</td>
                    <td className="px-6 py-4 text-center font-bold text-main-green">{available}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${stockStatus.color}`}>
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        size="sm"
                        onClick={() => handleOrderClick(item)}
                        className="bg-main-green hover:bg-main-green/90 text-main-gold shadow-sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Order
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {sortedMaterials.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    No materials found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal Material Requests Table */}
      <div className="bg-white rounded-xl border border-main-green/20 shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-main-green/10 bg-main-gold/5">
          <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
            Internal Material Requests
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4 text-center">Quantity</th>
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
                        onClick={() => handleOpenAdminDialog(req)}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 h-7"
                      >
                        Manage Request
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Movement History Table */}
      <div className="bg-white rounded-xl border border-main-green/20 shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-main-green/10 bg-main-gold/5">
          <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
            <History className="w-5 h-5" />
            Raw Materials History
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Performed By</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventoryHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.itemName}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.type === 'in'
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                      {item.type === 'in' ? 'Restock (+)' : 'Usage (-)'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.reason}</td>
                  <td className="px-6 py-4 text-gray-600">{item.performedBy}</td>
                  <td className="px-6 py-4 text-gray-500 italic">{item.notes}</td>
                </tr>
              ))}
              {inventoryHistory.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No history records found.
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
            <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitOrder} className="bg-main-green hover:bg-main-green/90 text-main-gold">
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Action Dialog */}
      <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-main-green flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Manage Request
            </DialogTitle>
            <DialogDescription>
              Accept, reject, or mark this request as delivered.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6 py-4">
              {/* Request Info Card */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Request ID</span>
                  <span className="font-semibold text-gray-900">{selectedRequest.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Material</span>
                  <span className="font-semibold text-gray-900">{selectedRequest.materialName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Quantity</span>
                  <span className="font-medium text-gray-900">{selectedRequest.quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">{selectedRequest.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Current Status</span>
                  <StatusBadge status={selectedRequest.status} />
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Admin Notes (Optional)</label>
                <Textarea
                  placeholder="Add notes or reason for your action..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="border-main-green/30 focus:border-main-green resize-none"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleAcceptRequest}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  disabled={selectedRequest.status === 'accepted' || selectedRequest.status === 'delivered'}
                >
                  Accept Request
                </Button>

                <Button
                  onClick={handleDeliverRequest}
                  className="bg-main-green hover:bg-main-green/90 text-main-gold w-full"
                  disabled={selectedRequest.status === 'delivered' || selectedRequest.status === 'rejected'}
                >
                  Mark as Delivered
                </Button>

                <Button
                  onClick={handleRejectRequest}
                  variant="destructive"
                  className="w-full"
                  disabled={selectedRequest.status === 'rejected' || selectedRequest.status === 'delivered'}
                >
                  Reject Request
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdminDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
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
