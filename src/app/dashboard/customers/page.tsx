import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"

export const metadata = {
    title: 'Customers | Remirage Shop Dashboard',
    description: 'Manage your customers in the Remirage Shop dashboard.',
}

const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Main St", orders: 5 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", address: "456 Elm St", orders: 3 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "555-555-5555", address: "789 Oak St", orders: 2 },
    { id: 4, name: "Alice Brown", email: "alice@example.com", phone: "111-222-3333", address: "101 Pine St", orders: 4 },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", phone: "444-444-4444", address: "202 Maple St", orders: 1 },
];

const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "phone" },
    { header: "Address", accessorKey: "address" },
    { header: "Orders", accessorKey: "orders" },
];

export default function CustomersPage() {
    return (
        <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-10 bg-white shadow-md rounded-lg">
            <Heading title="Customers" description="Manage your customer base" />
            <DataTable data={mockData} columns={columns} />
        </div>
    )
}

