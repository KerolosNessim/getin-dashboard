import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { addExternalMaterialRequest } from "@/api/externalMaterials";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Loader2, Package, Send } from "lucide-react";
import { toast } from "sonner";

const ExternalOrderDialog = ({ selectedMaterial }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const formSchema = useMemo(() => {
    const min = Number(selectedMaterial?.min ?? 1);
    const max = Number(selectedMaterial?.max ?? 999999);

    return z.object({
      quantity: z
        .coerce
        .number({
          invalid_type_error: "Quantity is required",
        })
        .min(min, { message: `Minimum allowed is ${min}` })
        .max(max, { message: `Maximum allowed is ${max}` }),
      comment: z
        .string().nonempty({ message: "comment is required" })
        .max(500, { message: "Notes must be 500 characters or less" })
    });
  }, [selectedMaterial?.min, selectedMaterial?.max]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: "",
      comment: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) return;
    form.reset({
      quantity: "",
      comment: "",
    });
  }, [open, selectedMaterial, form]);

  const { mutate: requestMutation } = useMutation({
    mutationFn: addExternalMaterialRequest,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["externalRequests"],
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error?.message);
    }
  });

  const handleSubmitOrder = async (values) => {
    requestMutation({
      material_id: selectedMaterial?.id,
      quantity: values.quantity,
      comment: values.comment
    })
  };

  const min = Number(selectedMaterial?.min ?? 1);
  const max = Number(selectedMaterial?.max ?? undefined);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-main-green hover:bg-main-green/90 text-main-gold shadow-sm"
          disabled={!selectedMaterial}
        >
          <Send className="w-4 h-4 mr-1" />
          Order
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-main-green flex items-center gap-2">
            <Package className="w-5 h-5" />
            Request Material
          </DialogTitle>
          <DialogDescription>
            Submit a request to inventory management for more stock.
          </DialogDescription>
        </DialogHeader>

        {selectedMaterial && (
          <div className="space-y-6 py-4">
            {/* Material Info Card */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Material Name</span>
                <span className="font-semibold text-gray-900">
                  {selectedMaterial?.name}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Current Quantity</span>
                <span className="font-medium text-gray-900">
                  {selectedMaterial?.current_quantity} {selectedMaterial?.unit}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Max Limit</span>
                <span className="font-medium text-gray-900">
                  {selectedMaterial?.max} {selectedMaterial?.unit}
                </span>
              </div>
            </div>

            {/* ✅ Shadcn Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmitOrder)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Requested Quantity
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter quantity..."
                          min={min}
                          max={max}
                          {...field}

                          className={
                            form.formState.errors.quantity
                              ? "border-red-500 focus:ring-red-500"
                              : "border-main-green/30 focus:border-main-green"
                          }
                        />
                      </FormControl>

                      <FormDescription className="text-xs">
                        Allowed range: {min} to {selectedMaterial?.max}{" "}
                        {selectedMaterial?.unit}
                      </FormDescription>

                      <FormMessage className="text-xs text-red-500 flex items-center gap-1">
                        {form.formState.errors.quantity ? (
                          <>
                            <AlertTriangle className="w-3 h-3" />
                            {form.formState.errors.quantity.message}
                          </>
                        ) : null}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Comment
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Add any specific details or urgency..."
                          rows={3}
                          className={
                            form.formState.errors.comment
                              ? "border-red-500 focus:ring-red-500"
                              : "border-main-green/30 focus:border-main-green"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-main-green hover:bg-main-green/90 text-main-gold"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Submit Request
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExternalOrderDialog;
