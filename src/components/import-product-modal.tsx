"use client"

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProductPreviewModal } from '@/components/product-preview-modal'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Product } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

const providers = ['Deliworld']


export function ImportProductModal({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
    const [selectedProvider, setSelectedProvider] = useState<string | undefined>()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const getList = async () => {
        setLoading(true)
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        setProducts(data.response.Data.ProductList)
        setLoading(false)
        return data
    }


    useEffect(() => {
        getList()
    }, [selectedProvider])

    const productsPerPage = 10
    const filteredProducts = products.filter(product =>
        product.new_product_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handleImport = () => {
        const productToImport = products.find(p => p.new_product_id === selectedProductId)
        if (productToImport) {
            onClose(productToImport) // Pass the product details to the onClose callback
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Import Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Select onValueChange={setSelectedProvider}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                        <SelectContent>
                            {providers.map((provider) => (
                                <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedProvider && (
                        <>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {loading ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Select</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Product Number</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[...Array(productsPerPage)].map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                                <TableCell><Skeleton className="w-10 h-10" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Select</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Product Number</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredProducts
                                            .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                                            .map((product) => (
                                                <TableRow key={product.new_product_id}>
                                                    <TableCell>
                                                        <input
                                                            type="radio"
                                                            name="productSelection"
                                                            checked={selectedProductId === product.new_product_id}
                                                            onChange={() => setSelectedProductId(product.new_product_id)}
                                                            className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <img src={product.new_productimage} alt={product.new_productimage} className="w-10 h-10 object-cover rounded-md" />
                                                    </TableCell>
                                                    <TableCell>{product.new_product_name}</TableCell>
                                                    <TableCell>{product.productNumber}</TableCell>
                                                    <TableCell>${product.new_standard_price}</TableCell>
                                                    <TableCell>{product.new_qty}</TableCell>
                                                    <TableCell>
                                                        <Button variant="ghost" onClick={() => setSelectedProduct(product)}>Preview</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            )}

                            <div className="flex justify-between items-center">
                                <Button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <Button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => onClose()}>Cancel</Button>
                        <Button onClick={handleImport} disabled={!selectedProductId}>Import</Button>
                    </div>
                </div>
            </DialogContent>
            {selectedProduct && (
                <ProductPreviewModal
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </Dialog>
    )
}
