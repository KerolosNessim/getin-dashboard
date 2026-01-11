import api from "./config";

export async function getAllProducts() {
  try {
    const response = await api.get("/branch/products");
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const response = await api.get("/branch/total-categories");
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProductsByCategoryId(categoryId) {
  try {
    const response = await api.get(
      `/branch/products?category_id=${categoryId}`
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function updateProductStatus(productId) {
  try {
    const response = await api.post(
      `/branch/products/${productId}/toggle-active`
    );
    return response?.data;
  } catch (error) {
    console.error("Error updating product status:", error);
    return null;
  }
}

export async function getSingleProduct(id) {
  try {
    const response = await api.get(`/branch/products/${id}`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching single product:", error);
    return null;
  }
}
