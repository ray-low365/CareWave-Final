import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BillingService } from "@/services/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, FileText, Plus, Search, Download, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillingRecord } from "@/types";
import { toast } from "sonner";
import AddInvoiceForm from "@/components/billing/AddInvoiceForm";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addInvoiceOpen, setAddInvoiceOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: billingRecords, isLoading, refetch } = useQuery({
    queryKey: ["billing"],
    queryFn: BillingService.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled' }) => 
      BillingService.update(id, { paymentStatus: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing"] });
      toast.success("Invoice status updated");
    },
    onError: () => {
      toast.error("Failed to update invoice status");
    }
  });

  const filteredRecords = billingRecords?.filter((record) =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paidRecords = filteredRecords?.filter(record => record.paymentStatus === 'Paid');
  const pendingRecords = filteredRecords?.filter(record => record.paymentStatus === 'Pending');
  const overdueRecords = filteredRecords?.filter(record => record.paymentStatus === 'Overdue');

  const handleAddInvoiceSuccess = () => {
    refetch();
  };

  const handleStatusChange = (id: string, status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled') => {
    updateStatusMutation.mutate({ id, status });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-120px)] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading billing records...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const renderInvoiceRow = (record: BillingRecord) => (
    <div
      key={record.id}
      className="grid grid-cols-1 gap-4 p-4 text-sm md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]"
    >
      <div className="font-medium">
        {record.invoiceNumber || `INV-${record.id}`}
      </div>
      <div>
        <p>{record.patientName}</p>
        <p className="text-xs text-muted-foreground md:hidden">
          {formatDate(record.date)}
        </p>
      </div>
      <div className="hidden md:block">
        {formatDate(record.date)}
      </div>
      <div>${record.amount.toFixed(2)}</div>
      <div>
        <Badge className={getStatusColor(record.paymentStatus)}>
          {record.paymentStatus}
        </Badge>
      </div>
      <div className="flex justify-end space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
            {record.paymentStatus !== 'Paid' && (
              <DropdownMenuItem onClick={() => handleStatusChange(record.id, 'Paid')}>
                Mark as Paid
              </DropdownMenuItem>
            )}
            {record.paymentStatus !== 'Pending' && (
              <DropdownMenuItem onClick={() => handleStatusChange(record.id, 'Pending')}>
                Mark as Pending
              </DropdownMenuItem>
            )}
            {record.paymentStatus !== 'Overdue' && (
              <DropdownMenuItem onClick={() => handleStatusChange(record.id, 'Overdue')}>
                Mark as Overdue
              </DropdownMenuItem>
            )}
            {record.paymentStatus !== 'Cancelled' && (
              <DropdownMenuItem onClick={() => handleStatusChange(record.id, 'Cancelled')}>
                Cancel Invoice
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by patient or invoice..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setAddInvoiceOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({filteredRecords?.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRecords?.length})</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({overdueRecords?.length})</TabsTrigger>
            <TabsTrigger value="paid">Paid ({paidRecords?.length})</TabsTrigger>
          </TabsList>

          {['all', 'pending', 'overdue', 'paid'].map((tab) => {
            let displayRecords;
            switch (tab) {
              case 'pending':
                displayRecords = pendingRecords;
                break;
              case 'overdue':
                displayRecords = overdueRecords;
                break;
              case 'paid':
                displayRecords = paidRecords;
                break;
              default:
                displayRecords = filteredRecords;
            }

            return (
              <TabsContent key={tab} value={tab}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle>
                        {tab === 'all'
                          ? 'All Invoices'
                          : tab === 'pending'
                          ? 'Pending Invoices'
                          : tab === 'overdue'
                          ? 'Overdue Invoices'
                          : 'Paid Invoices'}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-1 gap-4 bg-muted/50 p-4 text-sm font-medium text-muted-foreground md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]">
                        <div>Invoice</div>
                        <div>Patient</div>
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div className="text-right">Actions</div>
                      </div>
                      {displayRecords && displayRecords.length > 0 ? (
                        <div className="divide-y">
                          {displayRecords.map(record => renderInvoiceRow(record))}
                        </div>
                      ) : (
                        <div className="flex h-32 items-center justify-center p-4">
                          <p className="text-center text-muted-foreground">
                            {searchTerm
                              ? "No billing records match your search criteria."
                              : "No billing records found."}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <AddInvoiceForm
        open={addInvoiceOpen}
        onOpenChange={setAddInvoiceOpen}
        onSuccess={handleAddInvoiceSuccess}
      />
    </DashboardLayout>
  );
};

export default Billing;
