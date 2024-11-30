import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Product } from "@/types"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface ProductDetailModalProps {
    isOpen: boolean
    onClose: () => void
    product: Product | null
}

export function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
    if (!product) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product.new_product_name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <img
                            src={product.new_productimage}
                            alt={product.new_product_name}
                            width={200}
                            height={200}
                            className="col-span-4 rounded-lg object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Price:</span>
                        <span className="col-span-3">${product.new_standard_price.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Stock:</span>
                        <span className="col-span-3">{product.new_qty}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Category:</span>
                        <span className="col-span-3">{product.new_englishcategory}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Color:</span>
                        <span className="col-span-3">{product.new_englishcolor}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Description:</span>
                        <span className="col-span-3">{product.new_englishdescribe}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Status:</span>
                        <div className="col-span-3 flex gap-2">
                            {product.islove && <Badge variant="secondary">Loved</Badge>}
                            {product.isbuy && <Badge variant="secondary">Buyable</Badge>}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

