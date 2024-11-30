"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, Upload, X, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImportProductModal } from '@/components/import-product-modal'
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { Product, UOM } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function AddProductPage() {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [product, setProduct] = useState<Partial<Product>>({
        new_product_name: '',
        new_delino: '',
        new_englishspecifications: '',
        new_englishcolor: '',
        new_standard_price: 0,
        new_qty: 0,
        new_productimage: '',
        new_pictureqty: 0,
        new_englishdescribe: '',
        islove: false,
        isbuy: false,
        uomList: [],
    })
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(33), 500)
        return () => clearTimeout(timer)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setProduct(prev => ({ ...prev, [name]: checked }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProduct(prev => ({ ...prev, new_productimage: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background"
        >
            <div className="sticky top-0 z-10 bg-background border-b px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/products" className="hover:opacity-80">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="text-xl font-semibold">New Product</h1>
                    </div>
                    <Button onClick={() => setIsImportModalOpen(true)}>Import Product</Button>
                </div>
                <Progress value={progress} className="mt-4" />
            </div>

            <div className="p-4 sm:p-6">
                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="details">Details & Images</TabsTrigger>
                        <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
                        <TabsTrigger value="additional">Additional Info</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        <Card>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="new_product_name">Product Name</Label>
                                            <Input
                                                id="new_product_name"
                                                name="new_product_name"
                                                placeholder="Enter product name"
                                                value={product?.new_product_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="new_delino">Delino</Label>
                                            <Input
                                                id="new_delino"
                                                name="new_delino"
                                                placeholder="Enter delino"
                                                value={product?.new_delino}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="new_englishspecifications">Specifications</Label>
                                            <Input
                                                id="new_englishspecifications"
                                                name="new_englishspecifications"
                                                placeholder="Enter specifications"
                                                value={product?.new_englishspecifications || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="new_englishcolor">Color</Label>
                                            <Input
                                                id="new_englishcolor"
                                                name="new_englishcolor"
                                                placeholder="Enter color"
                                                value={product?.new_englishcolor || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="new_englishdescribe">Description</Label>
                                            <Textarea
                                                id="new_englishdescribe"
                                                name="new_englishdescribe"
                                                placeholder="Enter product description"
                                                value={product?.new_englishdescribe || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <Label>Product Image</Label>
                                            <div className="mt-2 flex items-center space-x-4">
                                                {product?.new_productimage ? (
                                                    <div className="relative w-32 h-32">
                                                        <img
                                                            src={product?.new_productimage}
                                                            alt="Product"
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                        <button
                                                            onClick={() => setProduct(prev => ({ ...prev, new_productimage: '' }))}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                                                        <Upload className="w-8 h-8 text-gray-400" />
                                                        <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                                                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="new_pictureqty">Number of Pictures</Label>
                                            <Input
                                                id="new_pictureqty"
                                                name="new_pictureqty"
                                                type="number"
                                                value={product?.new_pictureqty}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="islove"
                                                checked={product?.islove}
                                                onCheckedChange={handleSwitchChange('islove')}
                                            />
                                            <Label htmlFor="islove">Is Loved</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="isbuy"
                                                checked={product?.isbuy}
                                                onCheckedChange={handleSwitchChange('isbuy')}
                                            />
                                            <Label htmlFor="isbuy">Is Buyable</Label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="pricing">
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="new_standard_price">Standard Price</Label>
                                        <Input
                                            id="new_standard_price"
                                            name="new_standard_price"
                                            type="number"
                                            value={product.new_standard_price}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="new_qty">Quantity</Label>
                                        <Input
                                            id="new_qty"
                                            name="new_qty"
                                            type="number"
                                            value={product.new_qty}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label>UOM List</Label>
                                        {product.uomList?.map((uom, index) => (
                                            <div key={index} className="mt-2 p-4 border rounded-lg">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor={`uom-name-${index}`}>Name</Label>
                                                        <Input
                                                            id={`uom-name-${index}`}
                                                            value={uom.Name}
                                                            onChange={(e) => {
                                                                const newUomList = [...(product.uomList || [])]
                                                                newUomList[index].Name = e.target.value
                                                                setProduct(prev => ({ ...prev, uomList: newUomList }))
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`uom-packing-${index}`}>Packing UOM</Label>
                                                        <Input
                                                            id={`uom-packing-${index}`}
                                                            value={uom.new_packing_uom}
                                                            onChange={(e) => {
                                                                const newUomList = [...(product.uomList || [])]
                                                                newUomList[index].new_packing_uom = e.target.value
                                                                setProduct(prev => ({ ...prev, uomList: newUomList }))
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            onClick={() => setProduct(prev => ({
                                                ...prev,
                                                uomList: [...(prev.uomList || []), {
                                                    value: (prev.uomList?.length ?? 0) + 1,
                                                    Id: '',
                                                    Name: '',
                                                    uomid: '',
                                                    new_qty: 0,
                                                    new_packing_uom: '',
                                                    new_volume: '',
                                                    new_netweight: '',
                                                    new_grossweight: ''
                                                }]
                                            }))}
                                            className="mt-4"
                                        >
                                            Add UOM
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="additional">
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="new_producttype_id">Product Type ID</Label>
                                        <Input
                                            id="new_producttype_id"
                                            name="new_producttype_id"
                                            value={product.new_producttype_id}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="groupid9370">Group ID 9370</Label>
                                        <Input
                                            id="groupid9370"
                                            name="groupid9370"
                                            value={product.groupid9370}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="new_englishcategory">English Category</Label>
                                        <Input
                                            id="new_englishcategory"
                                            name="new_englishcategory"
                                            value={product.new_englishcategory || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-4">
                    <Button variant="outline">Discard</Button>
                    <Button variant="outline">Save Product</Button>
                    <Button>Add Product</Button>
                </div>
            </div>

            <ImportProductModal isOpen={isImportModalOpen} onClose={(importedProduct: Product) => {
                setIsImportModalOpen(false)
                setProduct(importedProduct)
            }} />
        </motion.div>
    )
}
