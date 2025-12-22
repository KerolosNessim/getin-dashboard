export const products = [
  // Coffee Products
  {
    id: 1,
    name: "Espresso",
    category: "coffee",
    price: 25,
    basePrice: 25,
    image: "/coffee.png",
    status: true,
    description: "Strong and concentrated coffee served in small amounts",
    ingredients: ["Coffee Beans", "Water"],
    sizes: [
      { size: "Single", price: 25 },
      { size: "Double", price: 32 },
    ],
    addons: [
      { name: "Extra Shot", price: 5 },
      { name: "Vanilla", price: 4 },
    ],
    rating: 4.8,
    sold: 120,
    prepTime: "3-5 min",
  },

  {
    id: 2,
    name: "Cappuccino",
    category: "coffee",
    price: 30,
    basePrice: 30,
    image: "/coffee.png",
    status: true,
    description: "Espresso with equal parts steamed milk and foam",
    ingredients: ["Espresso", "Steamed Milk", "Foam"],
    sizes: [
      { size: "Small", price: 30 },
      { size: "Medium", price: 35 },
      { size: "Large", price: 40 },
    ],
    addons: [
      { name: "Cinnamon", price: 3 },
      { name: "Caramel", price: 5 },
    ],
    rating: 4.6,
    sold: 95,
    prepTime: "5-7 min",
  },

  {
    id: 3,
    name: "Latte",
    category: "coffee",
    price: 28,
    basePrice: 28,
    image: "/coffee.png",
    status: true,
    description:
      "Espresso with a lot of steamed milk and a light layer of foam",
    ingredients: ["Espresso", "Steamed Milk"],
    sizes: [
      { size: "Small", price: 28 },
      { size: "Medium", price: 33 },
      { size: "Large", price: 38 },
    ],
    addons: [
      { name: "Vanilla", price: 4 },
      { name: "Hazelnut", price: 5 },
    ],
    rating: 4.7,
    sold: 110,
    prepTime: "6-8 min",
  },

  {
    id: 4,
    name: "Mocha",
    category: "coffee",
    price: 32,
    basePrice: 32,
    image: "/coffee.png",
    status: true,
    description: "Espresso with chocolate and steamed milk",
    ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
    sizes: [
      { size: "Small", price: 32 },
      { size: "Medium", price: 37 },
      { size: "Large", price: 42 },
    ],
    addons: [
      { name: "Whipped Cream", price: 4 },
      { name: "Caramel", price: 5 },
    ],
    rating: 4.9,
    sold: 150,
    prepTime: "6-8 min",
  },

  {
    id: 5,
    name: "Macchiato",
    category: "coffee",
    price: 26,
    basePrice: 26,
    image: "/coffee.png",
    status: false,
    description: "Espresso with a small amount of milk foam",
    ingredients: ["Espresso", "Milk Foam"],
    sizes: [
      { size: "Single", price: 26 },
      { size: "Double", price: 33 },
    ],
    addons: [
      { name: "Caramel", price: 4 },
      { name: "Vanilla", price: 4 },
    ],
    rating: 4.4,
    sold: 70,
    prepTime: "4-5 min",
  },

  {
    id: 6,
    name: "Americano",
    category: "coffee",
    price: 22,
    basePrice: 22,
    image: "/coffee.png",
    status: true,
    description: "Espresso diluted with hot water",
    ingredients: ["Espresso", "Hot Water"],
    sizes: [
      { size: "Small", price: 22 },
      { size: "Medium", price: 27 },
      { size: "Large", price: 32 },
    ],
    addons: [
      { name: "Extra Shot", price: 5 },
      { name: "Milk", price: 3 },
    ],
    rating: 4.5,
    sold: 80,
    prepTime: "3-5 min",
  },

  // Tea Products
  {
    id: 7,
    name: "Green Tea",
    category: "tea",
    price: 18,
    basePrice: 18,
    image: "/coffee.png",
    status: true,
    description: "Fresh green tea with natural antioxidants",
    ingredients: ["Green Tea Leaves", "Hot Water"],
    sizes: [
      { size: "Small", price: 18 },
      { size: "Medium", price: 22 },
      { size: "Large", price: 26 },
    ],
    addons: [
      { name: "Honey", price: 3 },
      { name: "Lemon", price: 2 },
    ],
    rating: 4.6,
    sold: 140,
    prepTime: "4-6 min",
  },

  {
    id: 8,
    name: "Mint Tea",
    category: "tea",
    price: 20,
    basePrice: 20,
    image: "/coffee.png",
    status: true,
    description: "Refreshing mint tea with aromatic herbs",
    ingredients: ["Fresh Mint", "Green Tea", "Hot Water"],
    sizes: [
      { size: "Small", price: 20 },
      { size: "Medium", price: 24 },
      { size: "Large", price: 28 },
    ],
    addons: [
      { name: "Honey", price: 3 },
      { name: "Ginger", price: 4 },
    ],
    rating: 4.7,
    sold: 99,
    prepTime: "5-7 min",
  },

  {
    id: 9,
    name: "Chai Latte",
    category: "tea",
    price: 28,
    basePrice: 28,
    image: "/coffee.png",
    status: true,
    description: "Spiced tea with steamed milk",
    ingredients: ["Chai Tea", "Steamed Milk", "Spices"],
    sizes: [
      { size: "Small", price: 28 },
      { size: "Medium", price: 33 },
      { size: "Large", price: 38 },
    ],
    addons: [
      { name: "Vanilla", price: 4 },
      { name: "Cinnamon", price: 3 },
    ],
    rating: 4.8,
    sold: 87,
    prepTime: "6-8 min",
  },

  {
    id: 10,
    name: "Earl Grey",
    category: "tea",
    price: 20,
    basePrice: 20,
    image: "/coffee.png",
    status: true,
    description: "Classic black tea with bergamot flavor",
    ingredients: ["Earl Grey Tea", "Hot Water"],
    sizes: [
      { size: "Small", price: 20 },
      { size: "Medium", price: 24 },
    ],
    addons: [
      { name: "Milk", price: 3 },
      { name: "Honey", price: 3 },
    ],
    rating: 4.5,
    sold: 65,
    prepTime: "4-5 min",
  },

  // Juice Products
  {
    id: 11,
    name: "Orange Juice",
    category: "juice",
    price: 20,
    basePrice: 20,
    image: "/coffee.png",
    status: true,
    description: "Freshly squeezed orange juice",
    ingredients: ["Fresh Oranges"],
    sizes: [
      { size: "Small", price: 20 },
      { size: "Medium", price: 25 },
      { size: "Large", price: 30 },
    ],
    addons: [
      { name: "Ice", price: 0 },
      { name: "Mint", price: 2 },
    ],
    rating: 4.7,
    sold: 120,
    prepTime: "3-5 min",
  },

  {
    id: 12,
    name: "Mango Smoothie",
    category: "juice",
    price: 30,
    basePrice: 30,
    image: "/coffee.png",
    status: true,
    description: "Creamy mango smoothie with fresh fruit",
    ingredients: ["Mango", "Milk", "Honey"],
    sizes: [
      { size: "Small", price: 30 },
      { size: "Medium", price: 35 },
      { size: "Large", price: 40 },
    ],
    addons: [
      { name: "Protein", price: 8 },
      { name: "Chia Seeds", price: 5 },
    ],
    rating: 4.9,
    sold: 155,
    prepTime: "5-7 min",
  },

  {
    id: 13,
    name: "Berry Blast",
    category: "juice",
    price: 32,
    basePrice: 32,
    image: "/coffee.png",
    status: true,
    description: "Mixed berries smoothie packed with antioxidants",
    ingredients: ["Strawberries", "Blueberries", "Raspberries", "Yogurt"],
    sizes: [
      { size: "Small", price: 32 },
      { size: "Medium", price: 37 },
      { size: "Large", price: 42 },
    ],
    addons: [
      { name: "Honey", price: 3 },
      { name: "Granola", price: 6 },
    ],
    rating: 4.8,
    sold: 90,
    prepTime: "5-7 min",
  },

  {
    id: 14,
    name: "Lemonade",
    category: "juice",
    price: 15,
    basePrice: 15,
    image: "/coffee.png",
    status: true,
    description: "Classic fresh lemonade",
    ingredients: ["Lemon", "Water", "Sugar"],
    sizes: [
      { size: "Small", price: 15 },
      { size: "Medium", price: 20 },
      { size: "Large", price: 25 },
    ],
    addons: [
      { name: "Mint", price: 2 },
      { name: "Ginger", price: 3 },
    ],
    rating: 4.5,
    sold: 110,
    prepTime: "3-4 min",
  },

  // Desserts
  {
    id: 15,
    name: "Chocolate Brownie",
    category: "dessert",
    price: 25,
    basePrice: 25,
    image: "/coffee.png",
    status: true,
    description: "Rich and fudgy chocolate brownie",
    ingredients: ["Chocolate", "Flour", "Butter", "Eggs"],
    sizes: [
      { size: "Single", price: 25 },
      { size: "Double", price: 45 },
    ],
    addons: [
      { name: "Ice Cream", price: 8 },
      { name: "Whipped Cream", price: 5 },
    ],
    rating: 4.9,
    sold: 130,
    prepTime: "2-3 min",
  },

  {
    id: 16,
    name: "Cheesecake",
    category: "dessert",
    price: 35,
    basePrice: 35,
    image: "/coffee.png",
    status: true,
    description: "Creamy New York style cheesecake",
    ingredients: ["Cream Cheese", "Graham Crackers", "Sugar"],
    sizes: [{ size: "Slice", price: 35 }],
    addons: [
      { name: "Strawberry Sauce", price: 5 },
      { name: "Chocolate Sauce", price: 5 },
    ],
    rating: 4.8,
    sold: 85,
    prepTime: "2-3 min",
  },

  {
    id: 17,
    name: "Croissant",
    category: "dessert",
    price: 15,
    basePrice: 15,
    image: "/coffee.png",
    status: true,
    description: "Buttery, flaky French pastry",
    ingredients: ["Flour", "Butter", "Yeast"],
    sizes: [
      { size: "Regular", price: 15 },
      { size: "Large", price: 20 },
    ],
    addons: [
      { name: "Chocolate Filling", price: 5 },
      { name: "Almond Filling", price: 6 },
    ],
    rating: 4.6,
    sold: 95,
    prepTime: "2-3 min",
  },

  {
    id: 18,
    name: "Tiramisu",
    category: "dessert",
    price: 38,
    basePrice: 38,
    image: "/coffee.png",
    status: true,
    description: "Classic Italian coffee-flavored dessert",
    ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa"],
    sizes: [{ size: "Slice", price: 38 }],
    addons: [{ name: "Extra Cocoa", price: 2 }],
    rating: 4.9,
    sold: 75,
    prepTime: "2-3 min",
  },
];

export const orders = [
  {
    id: "T142",
    status: "canceled",
    type: "Pickup",
    orderNumber: 482913,
    itemsCount: 5,
    createdAt: "2025-07-10 18:45",
    pickupTime: "2025-07-10 19:10",

    items: [
      { name: "Milk Tea", quantity: 1, price: 12 },
      { name: "Brown Sugar Latte", quantity: 2, price: 14 },
      { name: "Green Tea", quantity: 2, price: 10 },
    ],

    totals: {
      subtotal: 60,
      discount: 5,
      userPaid: 55,
      platformPaid: 55,
      finalAmount: 55,
    },

    platform: "WeChat",
    note: "",
  },

  {
    id: "381",
    status: "completed",
    type: "Delivery",
    orderNumber: 197522,
    itemsCount: 8,
    createdAt: "2025-07-10 19:30",

    items: [
      { name: "Fruit Tea", quantity: 3, price: 11 },
      { name: "Coffee Latte", quantity: 1, price: 15 },
      { name: "Oolong Tea", quantity: 1, price: 10 },
    ],

    totals: {
      subtotal: 58,
      discount: 0,
      userPaid: 58,
      platformPaid: 58,
      finalAmount: 58,
    },

    platform: "Meituan",
    note: "Less sugar",
  },

  {
    id: "T201",
    status: "completed",
    type: "Pickup",
    orderNumber: 512884,
    itemsCount: 3,
    createdAt: "2025-07-10 17:20",

    items: [
      { name: "Cappuccino", quantity: 1, price: 16 },
      { name: "Lemon Tea", quantity: 2, price: 9 },
    ],

    totals: {
      subtotal: 34,
      discount: 2,
      userPaid: 32,
      platformPaid: 32,
      finalAmount: 32,
    },

    platform: "Walk-in",
    note: "",
  },

  {
    id: "267",
    status: "pending",
    type: "Delivery",
    orderNumber: 148223,
    itemsCount: 6,
    createdAt: "2025-07-10 20:15",

    items: [
      { name: "Espresso", quantity: 1, price: 14 },
      { name: "Iced Tea", quantity: 3, price: 8 },
      { name: "Milk Tea", quantity: 2, price: 12 },
    ],

    totals: {
      subtotal: 62,
      discount: 0,
      userPaid: 62,
      platformPaid: 62,
      finalAmount: 62,
    },

    platform: "Eleme",
    note: "",
  },

  {
    id: "398",
    status: "pending",
    type: "Delivery",
    orderNumber: 144991,
    itemsCount: 4,
    createdAt: "2025-07-10 20:22",

    items: [
      { name: "Matcha Latte", quantity: 1, price: 17 },
      { name: "Classic Milk Tea", quantity: 2, price: 12 },
    ],

    totals: {
      subtotal: 41,
      discount: 3,
      userPaid: 38,
      platformPaid: 38,
      finalAmount: 38,
    },

    platform: "Meituan",
    note: "",
  },

  {
    id: "T188",
    status: "pending",
    type: "Pickup",
    orderNumber: 402781,
    itemsCount: 2,
    createdAt: "2025-07-10 18:05",

    items: [
      { name: "Americano", quantity: 1, price: 12 },
      { name: "Iced Lemon Tea", quantity: 1, price: 10 },
    ],

    totals: {
      subtotal: 22,
      discount: 0,
      userPaid: 22,
      platformPaid: 22,
      finalAmount: 22,
    },

    platform: "WeChat",
    note: "",
  },

  {
    id: "422",
    status: "completed",
    type: "Delivery",
    orderNumber: 177432,
    itemsCount: 7,
    createdAt: "2025-07-10 21:00",

    items: [
      { name: "Brown Sugar Milk Tea", quantity: 1, price: 15 },
      { name: "Fruit Tea", quantity: 2, price: 11 },
    ],

    totals: {
      subtotal: 37,
      discount: 0,
      userPaid: 37,
      platformPaid: 37,
      finalAmount: 37,
    },

    platform: "Eleme",
    note: "No ice",
  },

  {
    id: "T233",
    status: "canceled",
    type: "Pickup",
    orderNumber: 599221,
    itemsCount: 3,
    createdAt: "2025-07-10 16:40",

    items: [
      { name: "Mocha", quantity: 1, price: 18 },
      { name: "Green Tea", quantity: 2, price: 9 },
    ],

    totals: {
      subtotal: 36,
      discount: 1,
      userPaid: 35,
      platformPaid: 35,
      finalAmount: 35,
    },

    platform: "Walk-in",
    note: "",
  },
];

function detectStatus(quantity, minQuantity) {
  if (quantity <= minQuantity * 0.5) {
    return {
      status: "critical",
    };
  } else if (quantity <= minQuantity) {
    return {
      status: "low",
    };
  } else {
    return {
      status: "good",
    };
  }
}
// Inventory Data - بيانات المخزون
export const inventory = [
  {
    id: 1,
    name: "Coffee Beans", // حبوب القهوة
    category: "coffee", // الفئة
    quantity: 25, // الكمية الحالية
    unit: "kg", // وحدة القياس (كيلوجرام)
    minQuantity: 10, // الحد الأدنى قبل التنبيه
    maxQuantity: 50, // السعة القصوى
    price: 150, // السعر للوحدة
    supplier: "Coffee Co.", // المورد
    lastRestocked: "2025-11-25", // آخر تاريخ تعبئة
    expiryDate: "2026-05-01", // تاريخ الانتهاء
    status: detectStatus(25, 10), // حالة المخزون
  },
  {
    id: 2,
    name: "Fresh Milk", // حليب طازج
    category: "dairy",
    quantity: 8, // تحت الحد الأدنى
    unit: "liter",
    minQuantity: 15,
    maxQuantity: 40,
    price: 20,
    supplier: "Dairy Fresh",
    lastRestocked: "2025-11-28",
    expiryDate: "2025-12-05",
    status: detectStatus(8, 15), // حالة المخزون
  },
  {
    id: 3,
    name: "Sugar", // سكر
    category: "sweetener",
    quantity: 30,
    unit: "kg",
    minQuantity: 20,
    maxQuantity: 60,
    price: 15,
    supplier: "Sweet Supply",
    lastRestocked: "2025-11-20",
    expiryDate: "2026-11-20",
    status: detectStatus(30, 20), // حالة المخزون
  },
  {
    id: 4,
    name: "Green Tea Leaves", // أوراق الشاي الأخضر
    category: "tea",
    quantity: 5, // تحت الحد الأدنى
    unit: "kg",
    minQuantity: 8,
    maxQuantity: 20,
    price: 120,
    supplier: "Tea Masters",
    lastRestocked: "2025-11-15",
    expiryDate: "2026-06-15",
    status: detectStatus(5, 8), // حالة المخزون
  },
  {
    id: 5,
    name: "Fresh Mint", // نعناع طازج
    category: "herbs",
    quantity: 12,
    unit: "bunch",
    minQuantity: 10,
    maxQuantity: 30,
    price: 5,
    supplier: "Fresh Herbs Co.",
    lastRestocked: "2025-11-29",
    expiryDate: "2025-12-06",
    status: detectStatus(12, 10), // حالة المخزون
  },
  {
    id: 6,
    name: "Chocolate Powder", // مسحوق الشوكولاتة
    category: "flavoring",
    quantity: 15,
    unit: "kg",
    minQuantity: 10,
    maxQuantity: 30,
    price: 80,
    supplier: "Choco Treats",
    lastRestocked: "2025-11-22",
    expiryDate: "2026-08-22",
    status: detectStatus(15, 10), // حالة المخزون
  },
  {
    id: 7,
    name: "Vanilla Syrup", // شراب الفانيليا
    category: "flavoring",
    quantity: 6, // تحت الحد الأدنى
    unit: "bottle",
    minQuantity: 8,
    maxQuantity: 20,
    price: 45,
    supplier: "Flavor World",
    lastRestocked: "2025-11-10",
    expiryDate: "2026-02-10",
    status: detectStatus(6, 8), // حالة المخزون
  },
  {
    id: 8,
    name: "Honey", // عسل
    category: "sweetener",
    quantity: 18,
    unit: "jar",
    minQuantity: 12,
    maxQuantity: 30,
    price: 60,
    supplier: "Pure Honey",
    lastRestocked: "2025-11-18",
    expiryDate: "2027-11-18",
    status: detectStatus(18, 12), // حالة المخزون
  },
  {
    id: 9,
    name: "Whipped Cream", // كريمة مخفوقة
    category: "dairy",
    quantity: 20,
    unit: "can",
    minQuantity: 15,
    maxQuantity: 40,
    price: 25,
    supplier: "Dairy Fresh",
    lastRestocked: "2025-11-27",
    expiryDate: "2025-12-15",
    status: detectStatus(20, 15), // حالة المخزون
  },
  {
    id: 10,
    name: "Caramel Sauce", // صوص الكراميل
    category: "flavoring",
    quantity: 10,
    unit: "bottle",
    minQuantity: 8,
    maxQuantity: 25,
    price: 50,
    supplier: "Sweet Sauces",
    lastRestocked: "2025-11-23",
    expiryDate: "2026-05-23",
    status: detectStatus(10, 8), // حالة المخزون
  },
  {
    id: 11,
    name: "Fresh Oranges", // برتقال طازج
    category: "fruits",
    quantity: 3, // تحت الحد الأدنى بشكل حرج
    unit: "kg",
    minQuantity: 10,
    maxQuantity: 25,
    price: 30,
    supplier: "Fresh Fruits Market",
    lastRestocked: "2025-11-26",
    expiryDate: "2025-12-03",
    status: detectStatus(3, 10), // حالة المخزون
  },
  {
    id: 12,
    name: "Mango", // مانجو
    category: "fruits",
    quantity: 8,
    unit: "kg",
    minQuantity: 8,
    maxQuantity: 20,
    price: 70,
    supplier: "Tropical Fruits",
    lastRestocked: "2025-11-24",
    expiryDate: "2025-12-04",
    status: detectStatus(8, 8), // حالة المخزون
  },
  {
    id: 13,
    name: "Strawberries", // فراولة
    category: "fruits",
    quantity: 7, // قريب من الحد الأدنى
    unit: "kg",
    minQuantity: 6,
    maxQuantity: 15,
    price: 90,
    supplier: "Berry Farm",
    lastRestocked: "2025-11-28",
    expiryDate: "2025-12-02",
    status: detectStatus(7, 6), // حالة المخزون
  },
  {
    id: 14,
    name: "Disposable Cups (Small)", // أكواب بلاستيك صغيرة
    category: "supplies",
    quantity: 500,
    unit: "piece",
    minQuantity: 200,
    maxQuantity: 1000,
    price: 0.5,
    supplier: "Pack Supplies",
    lastRestocked: "2025-11-20",
    expiryDate: null, // لا ينتهي
    status: detectStatus(500, 200), // حالة المخزون
  },
  {
    id: 15,
    name: "Disposable Cups (Large)", // أكواب بلاستيك كبيرة
    category: "supplies",
    quantity: 150, // تحت الحد الأدنى
    unit: "piece",
    minQuantity: 200,
    maxQuantity: 1000,
    price: 0.8,
    supplier: "Pack Supplies",
    lastRestocked: "2025-11-15",
    expiryDate: null,
    status: detectStatus(150, 200), // حالة المخزون
  },
];

export const materialsRequests = [
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
];

// Inventory History - سجل حركة المخزون
export const inventoryHistory = [
  {
    id: 1,
    itemId: 1, // Coffee Beans
    itemName: "Coffee Beans",
    type: "in", // نوع الحركة: in = إضافة, out = استخدام
    quantity: 20, // الكمية
    previousQuantity: 5, // الكمية السابقة
    newQuantity: 25, // الكمية الجديدة
    reason: "Restock", // السبب: Restock = تعبئة, Sale = بيع, Waste = هدر, Adjustment = تعديل
    performedBy: "Ahmed Ali", // من قام بالعملية
    date: "2025-11-25 10:30",
    notes: "Regular monthly restock",
  },
  {
    id: 2,
    itemId: 2, // Fresh Milk
    itemName: "Fresh Milk",
    type: "out",
    quantity: 7,
    previousQuantity: 15,
    newQuantity: 8,
    reason: "Sale",
    performedBy: "System",
    date: "2025-11-28 14:20",
    notes: "Used for daily orders",
  },
  {
    id: 3,
    itemId: 1, // Coffee Beans
    itemName: "Coffee Beans",
    type: "out",
    quantity: 2,
    previousQuantity: 27,
    newQuantity: 25,
    reason: "Sale",
    performedBy: "System",
    date: "2025-11-29 09:15",
    notes: "Morning rush orders",
  },
  {
    id: 4,
    itemId: 4, // Green Tea Leaves
    itemName: "Green Tea Leaves",
    type: "out",
    quantity: 3,
    previousQuantity: 8,
    newQuantity: 5,
    reason: "Sale",
    performedBy: "System",
    date: "2025-11-29 16:45",
    notes: "Afternoon tea orders",
  },
  {
    id: 5,
    itemId: 11, // Fresh Oranges
    itemName: "Fresh Oranges",
    type: "out",
    quantity: 2,
    previousQuantity: 5,
    newQuantity: 3,
    reason: "Waste",
    performedBy: "Sara Mohamed",
    date: "2025-11-30 08:00",
    notes: "Spoiled oranges - quality check",
  },
  {
    id: 6,
    itemId: 7, // Vanilla Syrup
    itemName: "Vanilla Syrup",
    type: "out",
    quantity: 2,
    previousQuantity: 8,
    newQuantity: 6,
    reason: "Sale",
    performedBy: "System",
    date: "2025-11-30 11:30",
    notes: "Used in coffee orders",
  },
  {
    id: 7,
    itemId: 3, // Sugar
    itemName: "Sugar",
    type: "in",
    quantity: 10,
    previousQuantity: 20,
    newQuantity: 30,
    reason: "Restock",
    performedBy: "Ahmed Ali",
    date: "2025-11-20 09:00",
    notes: "Partial restock",
  },
  {
    id: 8,
    itemId: 15, // Disposable Cups (Large)
    itemName: "Disposable Cups (Large)",
    type: "out",
    quantity: 50,
    previousQuantity: 200,
    newQuantity: 150,
    reason: "Sale",
    performedBy: "System",
    date: "2025-11-30 18:00",
    notes: "Daily usage for large drinks",
  },
  {
    id: 9,
    itemId: 5, // Fresh Mint
    itemName: "Fresh Mint",
    type: "in",
    quantity: 12,
    previousQuantity: 0,
    newQuantity: 12,
    reason: "Restock",
    performedBy: "Mohamed Hassan",
    date: "2025-11-29 07:30",
    notes: "Fresh delivery from supplier",
  },
  {
    id: 10,
    itemId: 8, // Honey
    itemName: "Honey",
    type: "out",
    quantity: 2,
    previousQuantity: 20,
    newQuantity: 18,
    reason: "Sale",
    performedBy: "System",
    date: "2025-11-30 15:20",
    notes: "Used in tea orders",
  },
  {
    id: 11,
    itemId: 13, // Strawberries
    itemName: "Strawberries",
    type: "out",
    quantity: 1,
    previousQuantity: 8,
    newQuantity: 7,
    reason: "Waste",
    performedBy: "Sara Mohamed",
    date: "2025-11-30 08:15",
    notes: "Minor spoilage",
  },
  {
    id: 12,
    itemId: 9, // Whipped Cream
    itemName: "Whipped Cream",
    type: "in",
    quantity: 20,
    previousQuantity: 0,
    newQuantity: 20,
    reason: "Restock",
    performedBy: "Ahmed Ali",
    date: "2025-11-27 10:00",
    notes: "Weekly restock",
  },
];

// Returns/Refunds Data - بيانات المرتجعات والاسترجاع
export const returns = [
  {
    id: 1,
    returnNumber: "RET-001",
    itemId: 1, // Coffee Beans
    itemName: "Coffee Beans",
    quantity: 5, // الكمية المرتجعة
    unit: "kg",
    reason: "Damaged Packaging", // السبب: سبب الاسترجاع
    status: "pending", // الحالة: pending = قيد المراجعة, approved = موافق عليها, rejected = مرفوضة, completed = مكتملة
    requestedBy: "Ahmed Ali", // من قام بالطلب
    requestDate: "2025-12-01 09:30",
    approvedBy: null, // من وافق على الطلب
    approvalDate: null,
    supplier: "Coffee Co.",
    refundAmount: 750, // قيمة الاسترجاع بالجنيه
    notes: "Packaging was torn during delivery",
    images: [], // صور المنتج التالف
  },
  {
    id: 2,
    returnNumber: "RET-002",
    itemId: 11, // Fresh Oranges
    itemName: "Fresh Oranges",
    quantity: 3,
    unit: "kg",
    reason: "Expired Product",
    status: "approved",
    requestedBy: "Sara Mohamed",
    requestDate: "2025-11-30 14:20",
    approvedBy: "Manager",
    approvalDate: "2025-11-30 15:00",
    supplier: "Fresh Fruits Market",
    refundAmount: 90,
    notes: "Products expired before usage",
    images: [],
  },
  {
    id: 3,
    returnNumber: "RET-003",
    itemId: 13, // Strawberries
    itemName: "Strawberries",
    quantity: 2,
    unit: "kg",
    reason: "Poor Quality",
    status: "completed",
    requestedBy: "Sara Mohamed",
    requestDate: "2025-11-29 10:15",
    approvedBy: "Manager",
    approvalDate: "2025-11-29 11:00",
    supplier: "Berry Farm",
    refundAmount: 180,
    notes: "Strawberries arrived with mold",
    images: [],
  },
  {
    id: 4,
    returnNumber: "RET-004",
    itemId: 2, // Fresh Milk
    itemName: "Fresh Milk",
    quantity: 10,
    unit: "liter",
    reason: "Wrong Item Delivered",
    status: "rejected",
    requestedBy: "Mohamed Hassan",
    requestDate: "2025-11-28 08:45",
    approvedBy: "Manager",
    approvalDate: "2025-11-28 12:00",
    supplier: "Dairy Fresh",
    refundAmount: 200,
    notes: "Supplier provided evidence of correct delivery",
    images: [],
  },
  {
    id: 5,
    returnNumber: "RET-005",
    itemId: 7, // Vanilla Syrup
    itemName: "Vanilla Syrup",
    quantity: 4,
    unit: "bottle",
    reason: "Damaged Product",
    status: "pending",
    requestedBy: "Ahmed Ali",
    requestDate: "2025-12-01 11:00",
    approvedBy: null,
    approvalDate: null,
    supplier: "Flavor World",
    refundAmount: 180,
    notes: "Bottles leaked during transport",
    images: [],
  },
  {
    id: 6,
    returnNumber: "RET-006",
    itemId: 4, // Green Tea Leaves
    itemName: "Green Tea Leaves",
    quantity: 2,
    unit: "kg",
    reason: "Quality Issues",
    status: "approved",
    requestedBy: "Sara Mohamed",
    requestDate: "2025-11-27 16:30",
    approvedBy: "Manager",
    approvalDate: "2025-11-28 09:00",
    supplier: "Tea Masters",
    refundAmount: 240,
    notes: "Tea leaves have unusual smell and appearance",
    images: [],
  },
  {
    id: 7,
    returnNumber: "RET-007",
    itemId: 15, // Disposable Cups (Large)
    itemName: "Disposable Cups (Large)",
    quantity: 100,
    unit: "piece",
    reason: "Over-ordered",
    status: "completed",
    requestedBy: "Mohamed Hassan",
    requestDate: "2025-11-26 10:00",
    approvedBy: "Manager",
    approvalDate: "2025-11-26 14:00",
    supplier: "Pack Supplies",
    refundAmount: 80,
    notes: "Accidentally ordered double quantity",
    images: [],
  },
];

// Employees Data - بيانات الموظفين
export const employees = [
  {
    id: 1,
    name: "Ahmed Ali",
    role: "Barista",
    avatar: "/avatars/ahmed.png", // Placeholder
    points: 1250,
    completedOrders: 145,
    attendanceRate: "98%",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Sara Mohamed",
    role: "Cashier",
    avatar: "/avatars/sara.png",
    points: 980,
    completedOrders: 120,
    attendanceRate: "95%",
    joinDate: "2024-03-10",
    status: "active",
  },
  {
    id: 3,
    name: "Mohamed Hassan",
    role: "Barista",
    avatar: "/avatars/mohamed.png",
    points: 1100,
    completedOrders: 135,
    attendanceRate: "92%",
    joinDate: "2024-02-01",
    status: "active",
  },
  {
    id: 4,
    name: "Khaled Omar",
    role: "Manager",
    avatar: "/avatars/khaled.png",
    points: 1500,
    completedOrders: 50, // Managers might have fewer direct orders
    attendanceRate: "100%",
    joinDate: "2023-11-20",
    status: "active",
  },
];

// Points History - سجل النقاط
export const pointsHistory = [
  {
    id: 1,
    employeeId: 1, // Ahmed Ali
    employeeName: "Ahmed Ali",
    points: 100,
    reason: "Completed 50 Orders",
    type: "automatic", // automatic or manual
    date: "2025-11-25 14:00",
    notes: "Milestone achievement",
  },
  {
    id: 2,
    employeeId: 1,
    employeeName: "Ahmed Ali",
    points: 50,
    reason: "Punctuality",
    type: "manual",
    date: "2025-11-26 08:00",
    notes: "Opened branch on time for a week",
  },
  {
    id: 3,
    employeeId: 2, // Sara Mohamed
    employeeName: "Sara Mohamed",
    points: 100,
    reason: "Customer Compliment",
    type: "manual",
    date: "2025-11-27 11:30",
    notes: "Excellent service feedback",
  },
  {
    id: 4,
    employeeId: 3, // Mohamed Hassan
    employeeName: "Mohamed Hassan",
    points: 20,
    reason: "Extra Shift",
    type: "manual",
    date: "2025-11-28 18:00",
    notes: "Covered for a colleague",
  },
  {
    id: 5,
    employeeId: 1,
    employeeName: "Ahmed Ali",
    points: 100,
    reason: "Completed 100 Orders",
    type: "automatic",
    date: "2025-11-30 16:00",
    notes: "Milestone achievement",
  },
  {
    id: 6,
    employeeId: 4, // Khaled Omar
    employeeName: "Khaled Omar",
    points: 200,
    reason: "Monthly Target Reached",
    type: "automatic",
    date: "2025-11-30 22:00",
    notes: "Branch exceeded sales target",
  },
];
// External Materials Data
export const externalMaterialsData = [
  // Packaging Materials
  {
    id: "EXT-001",
    name: "Paper Cups - Small",
    category: "packaging",
    unit: "carton",
    currentQuantity: 15,
    maxQuantity: 50,
    availableToOrder: true,
  },
  {
    id: "EXT-002",
    name: "Paper Cups - Medium",
    category: "packaging",
    unit: "carton",
    currentQuantity: 8,
    maxQuantity: 50,
    availableToOrder: true,
  },
  {
    id: "EXT-004",
    name: "Cup Lids - Small",
    category: "packaging",
    unit: "carton",
    currentQuantity: 20,
    maxQuantity: 50,
    availableToOrder: false,
  },

  // Cleaning Materials
  {
    id: "EXT-011",
    name: "Dishwashing Liquid",
    category: "cleaning",
    unit: "bottle",
    currentQuantity: 6,
    maxQuantity: 20,
    availableToOrder: false,
  },
  {
    id: "EXT-012",
    name: "Floor Cleaner",
    category: "cleaning",
    unit: "bottle",
    currentQuantity: 4,
    maxQuantity: 15,
    availableToOrder: false,
  },
  {
    id: "EXT-013",
    name: "Glass Cleaner",
    category: "cleaning",
    unit: "bottle",
    currentQuantity: 5,
    maxQuantity: 15,
    availableToOrder: true,
  },

  // Maintenance Materials
  {
    id: "EXT-019",
    name: "LED Bulbs - Warm White",
    category: "maintenance",
    unit: "piece",
    currentQuantity: 4,
    maxQuantity: 15,
    availableToOrder: true,
  },
  {
    id: "EXT-021",
    name: "Power Cables",
    category: "maintenance",
    unit: "piece",
    currentQuantity: 2,
    maxQuantity: 10,
    availableToOrder: true,
  },
  {
    id: "EXT-022",
    name: "Extension Cords",
    category: "maintenance",
    unit: "piece",
    currentQuantity: 1,
    maxQuantity: 8,
    availableToOrder: true,
  },
  // Other Materials
  {
    id: "EXT-025",
    name: "Hand Sanitizer",
    category: "other",
    unit: "bottle",
    currentQuantity: 8,
    maxQuantity: 25,
    availableToOrder: true,
  },
  {
    id: "EXT-026",
    name: "Paper Towels",
    category: "other",
    unit: "roll",
    currentQuantity: 12,
    maxQuantity: 40,
    availableToOrder: true,
  },
  {
    id: "EXT-027",
    name: "Toilet Paper",
    category: "other",
    unit: "roll",
    currentQuantity: 15,
    maxQuantity: 50,
    availableToOrder: false,
  },
];

// External Materials History - Mock Data
export const externalHistory = [
  {
    id: 1,
    date: "2025-12-05 10:30",
    itemName: "Paper Cups - Small",
    type: "in",
    quantity: 5,
    reason: "Restock",
    performedBy: "Store Manager",
    notes: "Weekly replenishment",
  },
  {
    id: 2,
    date: "2025-12-04 14:15",
    itemName: "Dishwashing Liquid",
    type: "out",
    quantity: 1,
    reason: "Usage",
    performedBy: "Kitchen Staff",
    notes: "Empty bottle replacement",
  },
  {
    id: 3,
    date: "2025-12-03 09:00",
    itemName: "Trash Bags - Large",
    type: "in",
    quantity: 10,
    reason: "Restock",
    performedBy: "Store Manager",
    notes: "Monthly supply",
  },
  {
    id: 4,
    date: "2025-12-02 16:45",
    itemName: "Paper Towels",
    type: "out",
    quantity: 2,
    reason: "Usage",
    performedBy: "Cleaning Staff",
    notes: "Restroom supply",
  },
  {
    id: 5,
    date: "2025-12-01 11:20",
    itemName: "Hand Sanitizer",
    type: "in",
    quantity: 5,
    reason: "Restock",
    performedBy: "Store Manager",
    notes: "COVID safety measures",
  },
];
