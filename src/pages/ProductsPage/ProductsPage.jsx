import ProductCard from "@/components/ProductCard/ProductCard";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import { products } from "@/data";
import { useEffect, useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function ProductsPage() {
  const tabStyle = "bg-main-gold text-main-green text-base h-12 data-[state=active]:bg-main-green data-[state=active]:text-main-gold transition-all duration-200"
  const [allProducts, setAllProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);

  // Categories list
  const categories = [
    { value: "all", label: "All Products" },
    { value: "coffee", label: "Coffee" },
    { value: "tea", label: "Tea" },
    { value: "juice", label: "Juice" },
    { value: "dessert", label: "Desserts" }
  ];

  const handleStatusChange = (productId, newStatus) => {
    setAllProducts(allProducts.map(product => product.id === productId ? { ...product, status: newStatus } : product))
  };

  // Filter products based on category and availability
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by availability
    if (showOnlyAvailable) {
      result = result.filter(product => product.status === true);
    } else {
      result = result.filter(product => product.status === false);
    }

    return result;
  }, [allProducts, selectedCategory, showOnlyAvailable]);

  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      if (cat.value === "all") {
        counts[cat.value] = allProducts.filter(p => showOnlyAvailable ? p.status : !p.status).length;
      } else {
        counts[cat.value] = allProducts.filter(p =>
          p.category === cat.value && (showOnlyAvailable ? p.status : !p.status)
        ).length;
      }
    });
    return counts;
  }, [allProducts, showOnlyAvailable]);

  return (
    <div className="pb-4">
      <SectionHeader title="Products" />

      {/* Availability Toggle */}
      <div className="mb-6">
        <Tabs defaultValue="available" className="w-full" onValueChange={(value) => setShowOnlyAvailable(value === "available")}>
          <TabsList className="bg-transparent gap-2">
            <TabsTrigger className={tabStyle} value="available">
              Available ({allProducts.filter(p => p.status).length})
            </TabsTrigger>
            <TabsTrigger className={tabStyle} value="unavailable">
              Unavailable ({allProducts.filter(p => !p.status).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
        <TabsList className="bg-transparent gap-2 flex-wrap h-auto mb-6">
          {categories.map(category => (
            <TabsTrigger
              key={category.value}
              className={tabStyle}
              value={category.value}
            >
              {category.label} ({categoryCounts[category.value] || 0})
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Products Grid */}
        {categories.map(category => (
          <TabsContent key={category.value} value={category.value}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {
                filteredProducts.length > 0 ?
                  filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onStatusChange={handleStatusChange} />
                  )) :
                  <div className='col-span-full flex items-center justify-center h-20 bg-main-gold/20 border border-l-4 border-main-green/50 rounded-lg text-xl font-semibold text-main-green'>
                    No products found in this category
                  </div>
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}