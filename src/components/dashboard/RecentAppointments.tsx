
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "@/types";
import { cn } from "@/lib/utils";

interface RecentAppointmentsProps {
  appointments: Appointment[];
  className?: string;
}

const statusColors = {
  'Scheduled': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
  'No-Show': 'bg-yellow-100 text-yellow-800'
};

const RecentAppointments: React.FC<RecentAppointmentsProps> = ({ appointments, className }) => {
  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(`${dateStr}T${timeStr}`);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr className="text-left text-sm">
                <th className="font-medium px-4 py-3 w-[180px]">Patient</th>
                <th className="font-medium px-4 py-3 w-[150px]">Date & Time</th>
                <th className="font-medium px-4 py-3">Doctor</th>
                <th className="font-medium px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="text-sm">
                  <td className="px-4 py-3 font-medium">{appointment.patientName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(appointment.date, appointment.time)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {appointment.doctor || 'Not assigned'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge className={cn("font-normal", statusColors[appointment.status])}>
                      {appointment.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAppointments;
