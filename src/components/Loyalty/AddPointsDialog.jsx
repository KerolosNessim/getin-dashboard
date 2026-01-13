import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addPoints as addPointsAPI } from '@/api/loyalty';



const formSchema = z.object({
  point_amount: z.coerce.number({
    invalid_type_error: "Point amount is required",
  }).min(1, { message: "Minimum points is 1" }),
  type_reason: z.string().nonempty({ message: "Please select a reason" }),
  other_reason: z.string().optional(),
}).refine((data) => {
  if (data.type_reason === 'other' && !data.other_reason) {
    return false;
  }
  return true;
}, {
  message: "Other reason is required when 'Other' is selected",
  path: ["other_reason"],
});

const AddPointsDialog = ({ selectedEmployee }) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      point_amount: "",
      type_reason: "",
      other_reason: "",
    },
  });

  const queryClient = useQueryClient()

  const { mutate: addPoints } = useMutation({
    mutationFn: (data) => addPointsAPI(data),
    onSuccess: (res) => {
      toast.success(res?.message)
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      setOpen(false)
      form.reset()
    },
    onError: () => {
      toast.error("Something went wrong")
    }
  })

  const handleSubmit = async (values) => {
    const data = {
      employee_id: selectedEmployee?.id,
      ...values,
    };
    addPoints(data)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button
          className="bg-main-green hover:bg-main-green/90 text-main-gold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Points
        </Button>
      </DialogTrigger>
      <DialogContent className="w-1/2">
        <DialogHeader>
          <DialogTitle className="text-main-green">Award Points</DialogTitle>
          <DialogDescription>
            Manually award points to an employee for good performance.
          </DialogDescription>
        </DialogHeader>

        {selectedEmployee && (
          <div className="space-y-2 py-2">
            {/* Employee Info Card */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Employee Name</span>
                <span className="font-semibold text-gray-900">{selectedEmployee?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Email</span>
                <span className="font-medium text-gray-900">{selectedEmployee?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Role</span>
                <span className="font-medium text-gray-900">{selectedEmployee?.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Current Points</span>
                <span className="font-bold text-main-green text-lg">{selectedEmployee?.total_points}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Orders</span>
                <span className="font-medium text-gray-900">{selectedEmployee?.orders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Performance</span>
                <span className="font-medium text-gray-900">{selectedEmployee?.performance}%</span>
              </div>
            </div>

            {/* Points Award Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="point_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Points to Award
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter points amount..."
                          min="1"
                          {...field}
                          className="border-main-green/30 focus:border-main-green"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type_reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Reason</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="border-main-green/30 w-full">
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="punctuality_opening_on_time">Punctuality (Opening on time)</SelectItem>
                          <SelectItem value="extra_shift">Extra Shift</SelectItem>
                          <SelectItem value="customer_compliment">Customer Compliment</SelectItem>
                          <SelectItem value="exceptional_performance">Exceptional Performance</SelectItem>
                          <SelectItem value="cleanliness_hygiene">Cleanliness & Hygiene</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="type_reason"
                  render={({ field: typeReasonField }) => (
                    <>
                      {typeReasonField.value === "other" && (
                        <FormField
                          control={form.control}
                          name="other_reason"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Other Reason
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please specify the reason..."
                                  {...field}
                                  className="border-main-green/30 focus:border-main-green resize-none"
                                  rows={3}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </>
                  )}
                />


                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-main-green hover:bg-main-green/90 text-main-gold">
                    <Plus className="w-4 h-4 mr-2" />
                    Award Points
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddPointsDialog