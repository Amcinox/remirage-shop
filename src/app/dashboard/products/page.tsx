"use client"

import { useState } from 'react'
import Link from "next/link"
import { Plus, Search } from 'lucide-react'
import { motion } from "framer-motion"

import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { Product } from "@/types"
import { ColumnDef } from '@tanstack/react-table'



const mockData: Product[] = [
    {
        "new_price_typename": null,
        "productNumber": "140000937",
        "new_product_id": "4b9aeb3f-b42f-ee11-b0c2-002248173cd3",
        "new_product_name": "Angle Grinder # 2400w230mm # RED",
        "new_description": null,
        "new_delino": "EDE-JM230-2E",
        "new_customerno": null,
        "single_asst": null,
        "sales_pk": null,
        "new_packagingunit": null,
        "new_uom_id": null,
        "new_uom_name": null,
        "new_standard_price": 50.5,
        "new_paterialpackaging_id": null,
        "new_paterialpackaging_idName": null,
        "new_commoditybar": null,
        "new_outsize": null,
        "new_englishspecifications": "2400w230mm",
        "new_englishcolor": "RED",
        "new_material": null,
        "price": 0,
        "new_englishdescribe": null,
        "new_price_type": 1,
        "new_organization_id": null,
        "new_organization_name": null,
        "new_channel_id": null,
        "new_channel_name": null,
        "new_productimage": "http://imghw.nbdeli.com/140000937/1.jpg",
        "new_qty": 0,
        "IsProPrice": false,
        "new_ord_proprice_apply_id": null,
        "productsign": null,
        "currencysymbol": null,
        "new_extattrs": null,
        "PolicyList": null,
        "uomList": [
            {
                "value": 1,
                "Id": "9e432a59-c22f-ee11-b0c2-002248173cd3",
                "Name": "PCS(1)",
                "cName": null,
                "uomid": "00000000-0000-0000-0000-000000000000",
                "new_qty": 0,
                "new_packing_uom": "PCS",
                "new_volume": "12852.0000000000",
                "new_netweight": "5.8000000000",
                "new_grossweight": "6.5000000000"
            },
            {
                "value": 2,
                "Id": "9c432a59-c22f-ee11-b0c2-002248173cd3",
                "Name": "CAR(2)",
                "cName": null,
                "uomid": "00000000-0000-0000-0000-000000000000",
                "new_qty": 0,
                "new_packing_uom": "CAR",
                "new_volume": "0.0319200000",
                "new_netweight": "13.0000000000",
                "new_grossweight": "14.0000000000"
            }
        ],
        "policytypeList": null,
        "defautValue": 0,
        "new_label": null,
        "islove": false,
        "isbuy": false,
        "isShowStock": 0,
        "new_chinesem_iddle": null,
        "new_englishcategory": "Power Tools",
        "new_pictureqty": 4,
        "product_type": "12",
        "new_producttype_id": "13b8c0da-222d-ee11-b0c2-002248173cd3",
        "groupid9370": "11b8c0da-222d-ee11-b0c2-002248173cd3",
        "groupid9161": ""
    },
    {
        "new_price_typename": null,
        "productNumber": "140017341",
        "new_product_id": "3a23e426-d08b-ef11-b821-914af9296abd",
        "new_product_name": "Charger # 20V 4A # Red",
        "new_description": null,
        "new_delino": "EDE-CD20D4",
        "new_customerno": null,
        "single_asst": null,
        "sales_pk": null,
        "new_packagingunit": null,
        "new_uom_id": null,
        "new_uom_name": null,
        "new_standard_price": 11.99,
        "new_paterialpackaging_id": null,
        "new_paterialpackaging_idName": null,
        "new_commoditybar": null,
        "new_outsize": null,
        "new_englishspecifications": "20V 4A",
        "new_englishcolor": "Red",
        "new_material": null,
        "price": 0,
        "new_englishdescribe": null,
        "new_price_type": 1,
        "new_organization_id": null,
        "new_organization_name": null,
        "new_channel_id": null,
        "new_channel_name": null,
        "new_productimage": "http://imghw.nbdeli.com/140017341/1.jpg",
        "new_qty": 0,
        "IsProPrice": false,
        "new_ord_proprice_apply_id": null,
        "productsign": null,
        "currencysymbol": null,
        "new_extattrs": null,
        "PolicyList": null,
        "uomList": [
            {
                "value": 1,
                "Id": "2cb61fe8-dd8b-ef11-b821-914af9296abd",
                "Name": "PCS(1)",
                "cName": null,
                "uomid": "00000000-0000-0000-0000-000000000000",
                "new_qty": 0,
                "new_packing_uom": "PCS",
                "new_volume": "7682.7840000000",
                "new_netweight": "0.5600000000",
                "new_grossweight": "0.7600000000"
            },
            {
                "value": 24,
                "Id": "29b61fe8-dd8b-ef11-b821-914af9296abd",
                "Name": "CAR(24)",
                "cName": null,
                "uomid": "00000000-0000-0000-0000-000000000000",
                "new_qty": 0,
                "new_packing_uom": "CAR",
                "new_volume": "0.0821000000",
                "new_netweight": "18.2000000000",
                "new_grossweight": "19.2000000000"
            }
        ],
        "policytypeList": null,
        "defautValue": 0,
        "new_label": null,
        "islove": false,
        "isbuy": false,
        "isShowStock": 0,
        "new_chinesem_iddle": null,
        "new_englishcategory": "Power Tools",
        "new_pictureqty": 6,
        "product_type": "2",
        "new_producttype_id": "98a1f0eb-462d-ee11-b0c2-002248173cd3",
        "groupid9370": "1b991cc2-462d-ee11-b0c2-002248173cd3",
        "groupid9161": ""
    },
    {
        "new_price_typename": null,
        "productNumber": "140000926",
        "new_product_id": "279aeb3f-b42f-ee11-b0c2-002248173cd3",
        "new_product_name": "Cut Off Saw # 2350w355mm # RED",
        "new_description": null,
        "new_delino": "EDE-XQ355-1E",
        "new_customerno": null,
        "single_asst": null,
        "sales_pk": null,
        "new_packagingunit": null,
        "new_uom_id": null,
        "new_uom_name": null,
        "new_standard_price": 63.9,
        "new_paterialpackaging_id": null,
        "new_paterialpackaging_idName": null,
        "new_commoditybar": null,
        "new_outsize": null,
        "new_englishspecifications": "2350w355mm",
        "new_englishcolor": "RED",
        "new_material": null,
        "price": 0,
        "new_englishdescribe": null,
        "new_price_type": 1,
        "new_organization_id": null,
        "new_organization_name": null,
        "new_channel_id": null,
        "new_channel_name": null,
        "new_productimage": "http://imghw.nbdeli.com/140000926/1.jpg",
        "new_qty": 0,
        "IsProPrice": false,
        "new_ord_proprice_apply_id": null,
        "productsign": null,
        "currencysymbol": null,
        "new_extattrs": null,
        "PolicyList": null,
        "uomList": [
            {
                "value": 1,
                "Id": "c2432a59-c22f-ee11-b0c2-002248173cd3",
                "Name": "PCS(1)",
                "cName": null,
                "uomid": "00000000-0000-0000-0000-000000000000",
                "new_qty": 0,
                "new_packing_uom": "PCS",
                "new_volume": "69997.5000000000",
                "new_netweight": "15.7000000000",
                "new_grossweight": "17.0000000000"
            },
            {
                "value": 1,
                "Id": "c0432a59-c22f-ee11-b0c2-002248173cd3",
                "Name": "CAR(1)",
                "cName": null,
                "uomid": "00000000-0000-0000-0000-000000000000",
                "new_qty": 0,
                "new_packing_uom": "CAR",
                "new_volume": "0.0699980000",
                "new_netweight": "16.0000000000",
                "new_grossweight": "17.0000000000"
            }
        ],
        "policytypeList": null,
        "defautValue": 0,
        "new_label": null,
        "islove": false,
        "isbuy": false,
        "isShowStock": 0,
        "new_chinesem_iddle": null,
        "new_englishcategory": "Power Tools",
        "new_pictureqty": 3,
        "product_type": "12",
        "new_producttype_id": "73a1f0eb-462d-ee11-b0c2-002248173cd3",
        "groupid9370": "13991cc2-462d-ee11-b0c2-002248173cd3",
        "groupid9161": ""
    }
    // Add more mock products here...
];



export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)


    const columns: ColumnDef<Product>[] = [
        { header: "Name", accessorKey: "new_product_name" },
        { header: "Price", accessorKey: "new_standard_price", cell: ({ row }) => `$${row.original.new_standard_price.toFixed(2)}` },
        { header: "Stock", accessorKey: "new_qty" },
        { header: "Category", accessorKey: "new_englishcategory" },
        { header: "Color", accessorKey: "new_englishcolor" },
        {
            header: "Actions",
            cell: ({ row }) => {
                console.log({ row })
                return (
                    <Button variant="outline" onClick={() => handleViewDetails(row.original)}>
                        View Details
                    </Button>
                )
            },
        },
    ];
    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product)
    }

    const filteredData = mockData.filter(product =>
        product.new_product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "all" || product.new_englishcategory === categoryFilter)
    )

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-12 px-6 sm:px-8 lg:px-10 bg-white shadow-md rounded-lg"
        >
            <Heading title="Products" description="Manage your product catalog">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/dashboard/products/add">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </Heading>

            <div className="my-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Power Tools">Power Tools</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <DataTable data={filteredData} columns={columns} />
            </motion.div>

            <ProductDetailModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
            />
        </motion.div>
    )
}
