import { getToken } from "@/actions/providers/deli/auth";

export const POST = async (request: Request) => {
    const response = await getToken();
    return Response.json(response);
}; 