import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { MdBlockFlipped } from "react-icons/md";
import { toast } from "sonner";
import { updateProductStatus } from "@/api/products";
import { useQueryClient } from "@tanstack/react-query";

const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAvailable = product?.is_available;
  const queryClient = useQueryClient();
  const toggleStatus = async () => {
    const response = await updateProductStatus(product?.id);
    toast.success(response?.message);
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <Card className={`border border-main-gold border-l-4 h-full bg-main-gold/20 transition-all duration-300 ${!isAvailable ? 'opacity-60' : 'hover:shadow-lg'}`}>
      <CardContent className="flex items-center p-4">
        <div className="w-24 h-24 shrink-0">
          <img
            src={product?.images[0]}
            alt={product?.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-main-green">{product?.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: product?.description }}></p>
          <div className="text-lg font-bold text-main-green">₺{product?.price}</div>
          <div className="flex items-center gap-1 mt-2">

            <Link to={`/products/${product?.id}`} className="px-4 py-2 rounded text-white bg-main-green hover:bg-main-green/80 flex items-center gap-1">
              <Eye size={16} />
              View
            </Link>
            {/* chanange actitve */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger
                className={`px-4 py-2 rounded text-white ${isAvailable ? 'bg-red-700 hover:bg-red-600' : 'bg-green-700 hover:bg-green-600'
                  }`}
              >
                Chanage Status
              </DialogTrigger>
              <DialogContent className="bg-slate-100">
                <DialogHeader className="flex flex-col items-center justify-center gap-4">
                  <DialogTitle className="text-center">
                    Are you sure you want to chanage this product status?
                  </DialogTitle>
                  


                  <DialogDescription className="flex items-center justify-center gap-4">
                    <button
                      onClick={toggleStatus}
                      disabled={isAvailable}
                      className={`cursor-pointer px-6 py-2 rounded text-white
                          ${isAvailable
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-main-green hover:bg-main-green/80'
                        }`}
                    >
                      Yes
                    </button>
                    <DialogClose className="cursor-pointer bg-red-700 text-white px-6 py-2 rounded hover:bg-red-600">
                      No
                    </DialogClose>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;