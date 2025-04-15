
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PatientService, AppointmentService, BillingService } from "@/services/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Calendar, CalendarPlus, Edit, FileText, Loader2, Trash2, User } from "lucide-react";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { data: patient, isLoading: isPatientLoading } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => PatientService.getById(patientId),
    enabled: !!patientId && !isNaN(patientId),
  });

  const { data: appointments, isLoading: isAppointmentsLoading } = useQuery({
    queryKey: ["patientAppointments", patientId],
    queryFn: () => AppointmentService.getByPatientId(patientId),
    enabled: !!patientId && !isNaN(patientId),
  });

  const { data: billingRecords, isLoading: isBillingLoading } = useQuery({
    queryKey: ["patientBilling", patientId],
    queryFn: () => BillingService.getByPatientId(patientId),
    enabled: !!patientId && !isNaN(patientId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => PatientService.delete(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient deleted successfully");
      navigate("/patients");
    },
    onError: (error) => {
      toast.error("Failed to delete patient");
      console.error("Delete error:", error);
    },
  });

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate();
    } else {
      setDeleteConfirm(true);
      setTimeout(() => setDeleteConfirm(false), 3000);
    }
  };

  if (isPatientLoading || isAppointmentsLoading || isBillingLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-120px)] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading patient data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-center">
          <p className="text-lg text-muted-foreground">Patient not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/patients")}>
            Back to Patients
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const formatDate = (dateStr: string, timeStr?: string) => {
    const date = timeStr 
      ? new Date(`${dateStr}T${timeStr}`) 
      : new Date(dateStr);
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(timeStr && {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'No-Show':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/patients")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold tracking-tight">Patient Details</h2>
          </div>
          <div className="flex gap-2">
            <Link to={`/patients/${patientId}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              {deleteConfirm ? "Confirm Delete" : "Delete"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle>Personal Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Information</p>
                  <p className="font-medium">{patient.contactInfo}</p>
                </div>
                {patient.dateOfBirth && (
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{patient.dateOfBirth}</p>
                  </div>
                )}
                {patient.gender && (
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium">{patient.gender}</p>
                  </div>
                )}
                {patient.address && (
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{patient.address}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Medical Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Medical History</p>
                  <p className="font-medium">{patient.medicalHistory || "No medical history recorded"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Insurance</p>
                  {patient.insuranceProvider ? (
                    <div>
                      <p className="font-medium">{patient.insuranceProvider}</p>
                      {patient.insuranceNumber && (
                        <p className="text-sm text-muted-foreground">Policy #: {patient.insuranceNumber}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No insurance information</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle>Recent Appointments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {appointments && appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <p className="font-medium">{formatDate(appointment.date, appointment.time)}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctor} - {appointment.department}
                          </p>
                          {appointment.notes && (
                            <p className="mt-1 text-xs text-muted-foreground">{appointment.notes}</p>
                          )}
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No appointments found</p>
                )}
              </CardContent>
              <CardFooter>
                <Link to={`/appointments/new?patientId=${patientId}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Schedule New Appointment
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <CardTitle>Appointment History</CardTitle>
                  </div>
                  <Link to={`/appointments/new?patientId=${patientId}`}>
                    <Button size="sm">
                      <CalendarPlus className="mr-2 h-4 w-4" />
                      New Appointment
                    </Button>
                  </Link>
                </div>
                <CardDescription>
                  View all appointments for this patient
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appointments && appointments.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 bg-muted/50 p-3 text-sm font-medium text-muted-foreground">
                      <div>Date & Time</div>
                      <div>Doctor</div>
                      <div>Notes</div>
                      <div className="text-right">Status</div>
                    </div>
                    <Separator />
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 p-3 text-sm">
                        <div className="font-medium">
                          {formatDate(appointment.date, appointment.time)}
                        </div>
                        <div>
                          {appointment.doctor} - {appointment.department}
                        </div>
                        <div className="text-muted-foreground">
                          {appointment.notes || "No notes"}
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-center text-muted-foreground">No appointments found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Billing Records</CardTitle>
                </div>
                <CardDescription>
                  View billing history for this patient
                </CardDescription>
              </CardHeader>
              <CardContent>
                {billingRecords && billingRecords.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 bg-muted/50 p-3 text-sm font-medium text-muted-foreground">
                      <div>Invoice</div>
                      <div>Date</div>
                      <div>Amount</div>
                      <div className="text-right">Status</div>
                    </div>
                    <Separator />
                    {billingRecords.map((record) => (
                      <div key={record.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 p-3 text-sm">
                        <div className="font-medium">
                          {record.invoiceNumber || `INV-${record.id}`}
                        </div>
                        <div>{formatDate(record.date)}</div>
                        <div>${record.amount.toFixed(2)}</div>
                        <div className="text-right">
                          <Badge className={getPaymentStatusColor(record.paymentStatus)}>
                            {record.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-center text-muted-foreground">No billing records found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientDetail;
