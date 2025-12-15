import SectionHeader from "@/components/SctionHeader/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inventory } from "@/data";
import {
  Edit,
  Package,
  Search
} from "lucide-react";
import { useMemo, useState } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";

export default function InventoryPage() {
  // Styling classes - الكلاسات الخاصة بالتنسيق
  const tabStyle = "bg-main-gold text-main-green text-base h-12 data-[state=active]:bg-main-green data-[state=active]:text-main-gold transition-all duration-200";

  // State Management - إدارة الحالة
  const [inventoryData, setInventoryData] = useState(inventory); // بيانات المخزون
  const [searchQuery, setSearchQuery] = useState(""); // نص البحث
  const [selectedCategory, setSelectedCategory] = useState("all"); // الفئة المختارة
  const [filterType, setFilterType] = useState("all"); // نوع الفلتر: all = الكل, low = منخفض, critical = حرج
  const [editingItem, setEditingItem] = useState(null); // العنصر الذي يتم تعديله
  const [newQuantity, setNewQuantity] = useState(0); // الكمية الجديدة للتعديل
  const [isDialogOpen, setIsDialogOpen] = useState(false); // حالة فتح نافذة التعديل

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // إعدادات الترتيب

  // Categories للفلترة - الفئات لعمل تصفية
  const categories = [
    { value: "all", label: "All Items" },
    { value: "coffee", label: "Coffee" },
    { value: "tea", label: "Tea" },
    { value: "dairy", label: "Dairy" },
    { value: "fruits", label: "Fruits" },
    { value: "flavoring", label: "Flavoring" },
    { value: "sweetener", label: "Sweetener" },
    { value: "herbs", label: "Herbs" },
    { value: "supplies", label: "Supplies" },
  ];

  // حساب حالة المخزون - تحديد إذا كان العنصر منخفض أو حرج
  const getStockStatus = (item) => {
    const percentage = (item.quantity / item.minQuantity) * 100;
    if (item.quantity <= item.minQuantity * 0.5) {
      return { status: "critical", label: "Critical", color: "text-red-600 bg-red-50" };
    } else if (item.quantity <= item.minQuantity) {
      return { status: "low", label: "Low Stock", color: "text-orange-600 bg-orange-50" };
    } else if (item.quantity <= item.minQuantity * 1.5) {
      return { status: "warning", label: "Warning", color: "text-yellow-600 bg-yellow-50" };
    }
    return { status: "good", label: "Good", color: "text-green-600 bg-green-50" };
  };

  // Filtered Inventory - تصفية المخزون حسب البحث والفئة ونوع الفلتر
  const filteredInventory = useMemo(() => {
    let result = inventoryData;

    // تصفية حسب البحث - Filter by search query
    if (searchQuery) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // تصفية حسب الفئة - Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(item => item.category === selectedCategory);
    }

    // تصفية حسب الحالة - Filter by stock status
    if (filterType !== "all") {
      result = result.filter(item => {
        const status = getStockStatus(item);
        if (filterType === "low") {
          return status.status === "low";
        }
        if (filterType === "critical") {
          return status.status === "critical";
        }
        if (filterType === "good") {
          return status.status === "good";
        }
        if (filterType === "warning") {
          return status.status === "warning";
        }
        return true;
      });
    }

    return result;
  }, [inventoryData, searchQuery, selectedCategory, filterType]);


  // حساب النسبة المئوية للمخزون - Calculate stock percentage for progress bar
  const getStockPercentage = (item) => {
    return Math.min((item.quantity / item.maxQuantity) * 100, 100);
  };

  // Handle Sorting - دالة التعامل مع الترتيب
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };



  // Sorted Inventory - المخزون المرتب
  const sortedInventory = useMemo(() => {
    let sorted = [...filteredInventory];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        // ترتيب حسب الاسم
        if (sortConfig.key === 'name') {
          return sortConfig.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        // ترتيب حسب مستوى المخزون (النسبة المئوية)
        if (sortConfig.key === 'level') {
          const LevelA = getStockPercentage(a);
          const LevelB = getStockPercentage(b);
          return sortConfig.direction === 'asc' ? LevelA - LevelB : LevelB - LevelA;
        }
        // ترتيب حسب الحالة (الأولوية للحالات الحرجة)
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
  }, [filteredInventory, sortConfig]);




  // فتح نافذة التعديل - Open edit dialog
  const handleEditClick = (item) => {
    setEditingItem(item);
    setNewQuantity(item.quantity);
    setIsDialogOpen(true);
  };

  // حفظ التعديل - Save edit
  const handleSaveEdit = () => {
    if (editingItem && newQuantity >= 0) {
      setInventoryData(inventoryData.map(item =>
        item.id === editingItem.id
          ? { ...item, quantity: newQuantity }
          : item
      ));
      setIsDialogOpen(false);
      setEditingItem(null);
    }
  };


  return (
    <div className="pb-4">
      {/* العنوان الرئيسي - Main Header */}
      <SectionHeader title="Inventory Management" />
      {/* محتوى تبويب المخزون - Inventory Tab Content */}
      <div>
        {/* Filters and Search - الفلاتر والبحث */}
        <div className="rounded-lg border border-main-green border-l-4 p-4 mb-6">
          <div className="flex items-center gap-2">
            {/* شريط البحث - Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main-green/50 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-main-green/30 focus:border-main-green"
              />
            </div>

            {/* فلتر الفئة - Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-main-green/30">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* فلتر الحالة - Status Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border-main-green/30">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="critical">Critical Stock</SelectItem>
                <SelectItem value="good">Good Stock</SelectItem>
                <SelectItem value="warning">Warning Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* جدول المخزون - Inventory Table */}
        <div className="bg-white rounded-lg border border-main-green/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-main-green text-main-gold">
                <tr>
                  <th
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-main-green/20 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Item Name <RiArrowUpDownFill  />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                  <th
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-main-green/20 transition-colors"
                    onClick={() => handleSort('level')}
                  >
                    <div className="flex items-center gap-2">
                      Stock Level <RiArrowUpDownFill />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-main-green/20 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-2">
                      Status <RiArrowUpDownFill />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedInventory.length > 0 ? (
                  sortedInventory.map((item, index) => {
                    const status = getStockStatus(item);
                    const percentage = getStockPercentage(item);

                    return (
                      <tr
                        key={item.id}
                        className={`border-b border-main-green/10 hover:bg-main-gold/10 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-main-gold/5'
                          }`}
                      >
                        {/* اسم العنصر - Item Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-main-green">{item.name}</span>
                          </div>
                        </td>

                        {/* الفئة - Category */}
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-main-gold/30 text-main-green text-xs rounded-full capitalize">
                            {item.category}
                          </span>
                        </td>

                        {/* الكمية - Quantity */}
                        <td className="px-4 py-3">
                          <span className="font-semibold text-main-green">
                            {item.quantity} {item.unit}
                          </span>
                        </td>

                        {/* مستوى المخزون - Stock Level Progress Bar */}
                        <td className="px-4 py-3">
                          <div className="w-32">
                            <div className=" text-xs mb-1">

                              <span className="text-main-green/70">
                                {percentage.toFixed(0)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${percentage < 50 ? 'bg-red-500' :
                                  percentage < 75 ? 'bg-orange-500' :
                                    'bg-green-500'
                                  }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* الحالة - Status Badge */}
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </td>

                        {/* الإجراءات - Actions */}
                        <td className="px-4 py-3">
                          <Button
                            size="sm"
                            onClick={() => handleEditClick(item)}
                            className="bg-main-green hover:bg-main-green/90 text-main-gold"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  // رسالة عدم وجود نتائج - No Results Message
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="w-12 h-12 text-main-green/30" />
                        <p className="text-main-green/70 font-medium">No items found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* نافذة التعديل - Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-main-green">Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Update the quantity for {editingItem?.name}
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-4">
              {/* معلومات العنصر الحالية - Current Item Info */}
              <div className="bg-main-gold/10 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-main-green/70">Current Quantity:</span>
                  <span className="font-semibold text-main-green">
                    {editingItem.quantity} {editingItem.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-main-green/70">Min Quantity:</span>
                  <span className="font-semibold text-main-green">
                    {editingItem.minQuantity} {editingItem.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-main-green/70">Max Quantity:</span>
                  <span className="font-semibold text-main-green">
                    {editingItem.maxQuantity} {editingItem.unit}
                  </span>
                </div>
              </div>

              {/* إدخال الكمية الجديدة - New Quantity Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-main-green">
                  New Quantity ({editingItem.unit})
                </label>
                <Input
                  type="number"
                  min="0"
                  max={editingItem.maxQuantity}
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
                  className="border-main-green/30 focus:border-main-green"
                />
              </div>

              {/* أزرار الحفظ والإلغاء - Save and Cancel Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-main-green/30 text-main-green hover:bg-main-gold/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  className="bg-main-green hover:bg-main-green/90 text-main-gold"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
