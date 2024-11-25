import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
type Product = {
    id: number
    image: string
    name: string
    createdDate: string
    price: string
    quantity: number
    sku: string
    category: string
    tags: string
}

export function ProductPreviewModal({ product, isOpen, onClose }: { product: any; isOpen: boolean; onClose: () => void }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Product Preview</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-md" />
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p>Created: {product.createdDate}</p>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>SKU: {product.sku}</p>
                    <p>Category: {product.category}</p>
                    <p>Tags: {product.tags}</p>
                    <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={onClose}>Close</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

