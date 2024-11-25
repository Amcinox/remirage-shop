import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
    title: 'Products | Remirage Shop Dashboard',
    description: 'Manage your products in the Remirage Shop dashboard.',
}

const mockData = [
    { id: 1, name: "Product 1", price: "$10.00", stock: 100, category: "Electronics", description: "High-quality electronic product", rating: 4.5 },
    { id: 2, name: "Product 2", price: "$20.00", stock: 50, category: "Books", description: "Bestselling book", rating: 4.0 },
    { id: 3, name: "Product 3", price: "$30.00", stock: 75, category: "Clothing", description: "Comfortable and stylish", rating: 4.8 },
    { id: 4, name: "Product 4", price: "$40.00", stock: 20, category: "Home", description: "Essential home item", rating: 4.2 },
    { id: 5, name: "Product 5", price: "$50.00", stock: 10, category: "Beauty", description: "Top-rated beauty product", rating: 4.7 },
];

const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Price", accessorKey: "price" },
    { header: "Stock", accessorKey: "stock" },
    { header: "Category", accessorKey: "category" },
    { header: "Description", accessorKey: "description" },
    { header: "Rating", accessorKey: "rating" },
];

export default function ProductsPage() {
    return (
        <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-10 bg-white shadow-md rounded-lg">
            <Heading title="Products" description="Manage your product catalog">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark">
                    <Link href="/dashboard/products/add">Add Product</Link>
                </Button>
            </Heading>
            <DataTable data={mockData} columns={columns} />
        </div>
    )
}

