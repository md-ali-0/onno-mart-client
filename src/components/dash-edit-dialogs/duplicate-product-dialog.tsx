import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDuplicateProductMutation } from "@/redux/features/product/productApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "sonner";

interface DuplicateProductDialogProps {
    id: string;
    open: boolean;
    onClose: () => void;
}

const DuplicateProductDialog = ({
    id,
    open,
    onClose,
}: DuplicateProductDialogProps) => {
    const [duplicateProduct, { isSuccess, isError, error }] =
        useDuplicateProductMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Product Successfully Duplicated");
        }
    }, [isError, isSuccess, error]);

    const handleDuplicate = async ()=>{
        const toastId = toast.loading("Product Duplicating...")
        await duplicateProduct(id)
        toast.dismiss(toastId)
    }

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Duplicate Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to Duplicate ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDuplicate}>
                    Duplicate
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DuplicateProductDialog;
