import { updateExternalMaterialRequest } from '@/api/externalMaterials';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from "zod";
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
const formSchema = z.object({
  delivery_status: z.string().nonempty({ message: "Please select a status" }),
  delivery_feedback: z.string().nonempty({ message: "Please enter a feedback" }).max(500, { message: "Feedback must be at most 500 characters long" }),
})
const AdminExternalDialog = ({ selectedRequest }) => {
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      delivery_status: "",
      delivery_feedback: "",
    },
  })
  const { isSubmitting } = form.formState;
  const queryClient = useQueryClient();
  const { mutate: changeRequestStatus } = useMutation({
    mutationFn: updateExternalMaterialRequest,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["externalRequests"] });
      setIsAdminDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to update request status");
    },
  });
  async function onSubmit(values) {
    changeRequestStatus({ id: selectedRequest?.request_id, data: values });
  }
  useEffect(() => {
    if (!isAdminDialogOpen) return;
    form.reset({
      delivery_status: "",
      delivery_feedback: "",
    });
  }, [isAdminDialogOpen, form, selectedRequest]);
  return (
    <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-main-green hover:bg-main-green/90 text-white"
          onClick={() => setIsAdminDialogOpen(true)}
        >
          Manage Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-main-green flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Manage Request
          </DialogTitle>
          <DialogDescription>
            Accept, reject, or mark this request as delivered.
          </DialogDescription>
        </DialogHeader>

        {selectedRequest && (
          <div className="space-y-6 py-4">
            {/* Request Info Card */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Request ID</span>
                <span className="font-semibold text-gray-900">{selectedRequest?.request_id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Material</span>
                <span className="font-semibold text-gray-900">{selectedRequest?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Quantity</span>
                <span className="font-medium text-gray-900">{selectedRequest?.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Date</span>
                <span className="font-medium text-gray-900">{selectedRequest?.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Current Status</span>
                <Badge className={"bg-main-green text-main-gold"}>{selectedRequest?.status}</Badge>
              </div>
            </div>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="delivery_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="accept">Accepted</SelectItem>
                      <SelectItem value="reject">Rejected</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="not_delivered">Not Delivered</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delivery_feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your feedback"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-main-green hover:bg-main-green/90 text-main-gold">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAdminDialogOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AdminExternalDialog