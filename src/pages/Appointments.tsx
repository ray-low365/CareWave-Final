
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppointmentService } from "@/services/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CalendarPlus, Edit, Loader2, MoreHorizontal } from "lucide-react";
import { format, parseISO, isToday, isPast, isFuture } from "date-fns";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import { Appointment } from "@/types";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Appointments = () => {
  const [addAppointmentOpen, setAddAppointmentOpen] = useState(false);
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(null);
  const queryClient = useQueryClient();

  const { data: appointments, isLoading, refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: AppointmentService.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number, status: 'Completed' | 'Cancelled' | 'No-Show' | 'Scheduled' }) => 
      AppointmentService.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment status updated");
    },
    onError: () => {
      toast.error("Failed to update appointment status");
    }
  });

  const handleAddAppointmentSuccess = () => {
    refetch();
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditAppointment(appointment);
  };

  const handleStatusChange = (id: number, status: 'Completed' | 'Cancelled' | 'No-Show' | 'Scheduled') => {
    updateStatusMutation.mutate({ id, status });
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

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-120px)] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading appointments...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Filter appointments
  const todayAppointments = appointments?.filter(app => 
    isToday(parseISO(app.date)) && app.status === 'Scheduled'
  ) || [];
  
  const upcomingAppointments = appointments?.filter(app => 
    isFuture(parseISO(app.date)) && !isToday(parseISO(app.date)) && app.status === 'Scheduled'
  ) || [];
  
  const pastAppointments = appointments?.filter(app => 
    isPast(parseISO(app.date)) && !isToday(parseISO(app.date))
  ) || [];

  const renderAppointmentItem = (appointment: Appointment) => (
    <div 
      key={appointment.id} 
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-md border p-4 transition-colors hover:bg-muted/50"
    >
      <div>
        <p className="font-medium">{appointment.patientName}</p>
        <p className="text-sm text-muted-foreground">
          {format(parseISO(`${appointment.date}T${appointment.time}`), 'h:mm a')}
          {appointment.doctor && ` - Dr. ${appointment.doctor.split(' ')[1] || appointment.doctor}`}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2 sm:mt-0">
        {appointment.department && (
          <Badge variant="outline">{appointment.department}</Badge>
        )}
        <Badge className={getStatusColor(appointment.status)}>
          {appointment.status}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            {appointment.status !== 'Completed' && (
              <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Completed')}>
                Mark as Completed
              </DropdownMenuItem>
            )}
            {appointment.status !== 'Cancelled' && (
              <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Cancelled')}>
                Cancel Appointment
              </DropdownMenuItem>
            )}
            {appointment.status !== 'No-Show' && appointment.status !== 'Cancelled' && (
              <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'No-Show')}>
                Mark as No-Show
              </DropdownMenuItem>
            )}
            {appointment.status !== 'Scheduled' && (
              <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Scheduled')}>
                Reschedule
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
          <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
          <Button onClick={() => setAddAppointmentOpen(true)}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <CardTitle>Today's Appointments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {todayAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {todayAppointments.map(appointment => renderAppointmentItem(appointment))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-center text-muted-foreground">No appointments scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <CardTitle>Upcoming Appointments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map(appointment => renderAppointmentItem(appointment))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-center text-muted-foreground">No upcoming appointments</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <CardTitle>Past Appointments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {pastAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pastAppointments.slice(0, 10).map(appointment => renderAppointmentItem(appointment))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-center text-muted-foreground">No past appointments</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <AppointmentForm 
        open={addAppointmentOpen} 
        onOpenChange={setAddAppointmentOpen} 
        onSuccess={handleAddAppointmentSuccess} 
      />
      
      {editAppointment && (
        <AppointmentForm 
          open={!!editAppointment} 
          onOpenChange={() => setEditAppointment(null)} 
          appointment={editAppointment}
          onSuccess={handleAddAppointmentSuccess} 
        />
      )}
    </DashboardLayout>
  );
};

export default Appointments;
