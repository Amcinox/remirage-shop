import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Product } from '@/types';

export function ProductPreviewModal({ product, isOpen, onClose }: { product: Product; isOpen: boolean; onClose: () => void }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Product Preview</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <img src={product.new_productimage} alt={product.new_product_name} className="w-full h-64 object-contain rounded-md " />
                    <h2 className="text-2xl font-bold">{product.new_product_name}</h2>
                    <p>Product Number: {product.productNumber}</p>
                    <p>Price: ${product.new_standard_price}</p>
                    <p>Quantity: {product.new_qty}</p>
                    <p>SKU: {product.sales_pk}</p>
                    <p>Category: {product.new_englishcategory}</p>
                    <p>Tags: {product.new_label}</p>
                    <p>Description: {product.new_englishdescribe}</p>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={onClose}>Close</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

