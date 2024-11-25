import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"

export const metadata = {
    title: 'Orders | Remirage Shop Dashboard',
    description: 'Manage your orders in the Remirage Shop dashboard.',
}

const mockData = [
    { id: 1, customer: "John Doe", total: "$100.00", status: "Shipped", date: "2023-01-01" },
    { id: 2, customer: "Jane Smith", total: "$200.00", status: "Processing", date: "2023-01-02" },
    { id: 3, customer: "Bob Johnson", total: "$150.00", status: "Delivered", date: "2023-01-03" },
    { id: 4, customer: "Alice Brown", total: "$250.00", status: "Cancelled", date: "2023-01-04" },
    { id: 5, customer: "Charlie Davis", total: "$300.00", status: "Pending", date: "2023-01-05" },
];

const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Customer", accessorKey: "customer" },
    { header: "Total", accessorKey: "total" },
    { header: "Status", accessorKey: "status" },
    { header: "Date", accessorKey: "date" },
];

export default function OrdersPage() {
    return (
        <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-10 bg-white shadow-md rounded-lg">
            <Heading title="Orders" description="Manage your customer orders" />
            <DataTable data={mockData} columns={columns} />
        </div>
    )
}

