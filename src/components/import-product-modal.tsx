"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProductPreviewModal } from '@/components/product-preview-modal'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const providers = ['Deliworld']
const mockProducts = Array(20).fill(null).map((_, i) => ({
    id: i + 1,
    image: `/placeholder.svg?height=50&width=50`,
    name: `Product ${i + 1}`,
    createdDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    price: (Math.random() * 100).toFixed(2),
    quantity: Math.floor(Math.random() * 100),
}))

export function ImportProductModal({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
    const [selectedProvider, setSelectedProvider] = useState<string | undefined>()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null)
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const productsPerPage = 5
    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handleImport = () => {
        const productToImport = mockProducts.find(p => p.id === selectedProductId)
        if (productToImport) {
            onClose(productToImport)
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

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Select</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Created Date</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts
                                        .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                                        .map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    <input
                                                        type="radio"
                                                        name="productSelection"
                                                        checked={selectedProductId === product.id}
                                                        onChange={() => setSelectedProductId(product.id)}
                                                        className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                                                </TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.createdDate}</TableCell>
                                                <TableCell>${product.price}</TableCell>
                                                <TableCell>{product.quantity}</TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" onClick={() => setSelectedProduct(product)}>Preview</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>

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
