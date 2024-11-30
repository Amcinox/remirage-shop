import { getProducts } from "@/actions/providers/deli/getProducts";

export const GET = async (request: Request) => {
    const response = await getProducts();
    return Response.json(response);
}; 