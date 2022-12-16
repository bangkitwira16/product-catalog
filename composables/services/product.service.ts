import { Product } from "~~/types/Product";
import { ResponseData } from "~~/types/Response";

const useProductService = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.API_URL;
  const getProducts = async (params = null) => {
    const { data: data } = await useFetch<ResponseData>(`${apiUrl}/products`);
    if (data) return data.value?.products;
  };

  const getProduct = async (id: number) => {
    const { data: data } = await useFetch<Product>(`${apiUrl}/products/${id}`);
    if (data) return data.value
  };

  return {
    getProducts,
    getProduct
  };
};

export default useProductService;
