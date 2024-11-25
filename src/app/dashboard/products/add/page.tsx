"use client"

import { useState } from 'react'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImportProductModal } from '@/components/import-product-modal'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import Link from 'next/link'

export default function AddProductPage() {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const sizes = ['EU-34', 'EU-36', 'EU-38', 'EU-40', 'EU-42', 'EU-44']
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const newImages = files.map(file => URL.createObjectURL(file))
        setImages(prev => [...prev, ...newImages])
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b px-4 sm:px-6 py-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/products" className="hover:opacity-80">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-xl font-semibold">New Product</h1>
                </div>
                <Button onClick={() => setIsImportModalOpen(true)} className="mt-4 sm:mt-0">Import Product</Button>
            </div>

            <div className="p-4 sm:p-6">
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Description</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input id="name" placeholder="Enter product name" className="mt-1.5" />
                                </div>
                                <div>
                                    <Label htmlFor="description">Business Description</Label>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Write a description for your product</span>
                                        <Button variant="outline" size="sm">
                                            Upload .txt file
                                        </Button>
                                    </div>
                                    <Textarea
                                        id="description"
                                        placeholder="We have been doing jacket business for many years together with our partners."
                                        className="mt-1.5 min-h-[150px]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Category</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label>Product Category</Label>
                                    <Select>
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="outerwear">Outerwear & Winter</SelectItem>
                                            <SelectItem value="accessories">Accessories</SelectItem>
                                            <SelectItem value="footwear">Footwear</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Product Subcategory</Label>
                                    <Select>
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue placeholder="Select subcategory" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="jackets">Leather Jacket</SelectItem>
                                            <SelectItem value="coats">Coats</SelectItem>
                                            <SelectItem value="sweaters">Sweaters</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Quality</h2>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="New or second hand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="second-hand">Second Hand</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Product Image</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <img
                                            src={image}
                                            alt={`Product ${index + 1}`}
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute -right-2 -top-2 rounded-full bg-background p-1 shadow-sm"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed">
                                    <Upload className="h-8 w-8" />
                                    <span className="mt-2 text-sm">Upload Image</span>
                                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Select Size</h2>
                            <div className="grid grid-cols-3 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            if (selectedSizes.includes(size)) {
                                                setSelectedSizes(prev => prev.filter(s => s !== size))
                                            } else {
                                                setSelectedSizes(prev => [...prev, size])
                                            }
                                        }}
                                        className={cn(
                                            "flex h-10 items-center justify-center rounded-md border text-sm transition-colors",
                                            selectedSizes.includes(size)
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-input hover:bg-accent"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Sales Channel</h2>
                            <RadioGroup defaultValue="market">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="market" id="market" />
                                    <Label htmlFor="market">Only sale market</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="outlet" id="outlet" />
                                    <Label htmlFor="outlet">Online sales from the outlet</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="both" id="both" />
                                    <Label htmlFor="both">Both market and online</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="online" id="online" />
                                    <Label htmlFor="online">Online sale only</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-4">
                    <Button variant="outline">Discard</Button>
                    <Button variant="outline">Save Product</Button>
                    <Button>Add Product</Button>
                </div>
            </div>

            <ImportProductModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
        </div>
    )
}
