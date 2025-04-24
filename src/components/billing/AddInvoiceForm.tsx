
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BillingService, PatientService } from "@/services/api";
import { BillingRecord } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { generateInvoiceNumber, getCurrentDateFor2025 } from "@/utils/invoiceUtils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";

interface AddInvoiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  patientId?: string;
}

const AddInvoiceForm: React.FC<AddInvoiceFormProps> = ({
  open,
  onOpenChange,
  onSuccess,
  patientId
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [currentService, setCurrentService] = useState("");

  const { data: patients } = useQuery({
    queryKey: ["patients"],
    queryFn: PatientService.getAll,
    enabled: open,
  });

  const form = useForm<Omit<BillingRecord, "id" | "services">>({
    defaultValues: {
      patientId: patientId || "",
      patientName: "",
      amount: 0,
      paymentStatus: "Pending",
      date: getCurrentDateFor2025(), // Use 2025 date
      insuranceDetails: "",
      invoiceNumber: generateInvoiceNumber(), // Use randomized invoice number
    },
  });

  const handlePatientChange = (patientId: string) => {
    const patient = patients?.find(p => p.id === patientId);
    if (patient) {
      form.setValue("patientId", patient.id);
      form.setValue("patientName", patient.name);
    }
  };

  const addService = () => {
    if (currentService.trim() !== "") {
      setServices([...services, currentService.trim()]);
      setCurrentService("");
    }
  };

  const removeService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const onSubmit = async (data: Omit<BillingRecord, "id" | "services">) => {
    try {
      setIsSubmitting(true);
      await BillingService.create({
        ...data,
        services: services
      } as Omit<BillingRecord, "id">);
      toast.success("Invoice created successfully");
      form.reset();
      setServices([]);
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding invoice:", error);
      toast.error("Failed to create invoice");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient*</FormLabel>
                  <Select
                    onValueChange={(value) => handlePatientChange(value)}
                    defaultValue={field.value ? field.value : undefined}
                    disabled={!!patientId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a patient" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {patients?.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Services</FormLabel>
              <div className="flex space-x-2 mb-2">
                <Input
                  placeholder="Add service (e.g. Consultation)"
                  value={currentService}
                  onChange={(e) => setCurrentService(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addService();
                    }
                  }}
                />
                <Button type="button" size="icon" onClick={addService}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              {services.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No services added yet</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="insuranceDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter insurance details"
                      className="resize-none min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Invoice"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvoiceForm;
