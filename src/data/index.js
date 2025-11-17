export const products = [
  {
    id: 1,
    name: "Espresso",
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
    price: 28,
    basePrice: 28,
    image: "/coffee.png",
    status: false,
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
    name: "Macchiato with Milk",
    price: 30,
    basePrice: 30,
    image: "/coffee.png",
    status: true,
    description: "Espresso with a small amount of milk foam",
    ingredients: ["Espresso", "Milk Foam"],
    sizes: [
      { size: "Small", price: 30 },
      { size: "Medium", price: 35 },
    ],
    addons: [
      { name: "Caramel", price: 5 },
      { name: "Chocolate", price: 5 },
    ],
    rating: 4.5,
    sold: 80,
    prepTime: "4-6 min",
  },

  // duplicate set — but with details
  {
    id: 7,
    name: "Espresso",
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
    sold: 140,
    prepTime: "3-5 min",
  },

  {
    id: 8,
    name: "Cappuccino",
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
    sold: 99,
    prepTime: "5-7 min",
  },

  {
    id: 9,
    name: "Latte",
    price: 28,
    basePrice: 28,
    image: "/coffee.png",
    status: false,
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
    sold: 87,
    prepTime: "6-8 min",
  },

  {
    id: 10,
    name: "Mocha",
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
    sold: 155,
    prepTime: "6-8 min",
  },

  {
    id: 11,
    name: "Macchiato",
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
    sold: 60,
    prepTime: "4-5 min",
  },

  {
    id: 12,
    name: "Macchiato with Milk",
    price: 30,
    basePrice: 30,
    image: "/coffee.png",
    status: true,
    description: "Espresso with a small amount of milk foam",
    ingredients: ["Espresso", "Milk Foam"],
    sizes: [
      { size: "Small", price: 30 },
      { size: "Medium", price: 35 },
    ],
    addons: [
      { name: "Caramel", price: 5 },
      { name: "Chocolate", price: 5 },
    ],
    rating: 4.5,
    sold: 90,
    prepTime: "4-6 min",
  },
];

export const orders = [
  {
    id: "T142",
    status: "pending",
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
    status: "completed",
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
