
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardService, AppointmentService, InventoryService } from "@/services/api";
import { DashboardStats, Appointment, InventoryItem } from "@/types";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AreaChart from "@/components/dashboard/AreaChart";
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";
import RecentAppointments from "@/components/dashboard/RecentAppointments";
import InventoryStatus from "@/components/dashboard/InventoryStatus";
import { Loader2, Users, Calendar, Activity, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: DashboardService.getStats,
  });

  const { data: appointments, isLoading: isAppointmentsLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: AppointmentService.getAll,
  });

  const { data: inventory, isLoading: isInventoryLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: InventoryService.getAll,
  });

  // Filter for upcoming appointments
  const upcomingAppointments = appointments
    ? appointments
        .filter(
          (app) =>
            new Date(app.date) >= new Date() && app.status === "Scheduled"
        )
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)
    : [];

  if (isStatsLoading || isAppointmentsLoading || isInventoryLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-120px)] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">
              Loading dashboard data...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Prepare data for pie chart
  const departmentData = stats?.departmentDistribution.map(dept => ({
    name: dept.department,
    value: dept.patients
  })) || [];

  // Prepare data for appointment status
  const statusData = stats?.appointmentStatus.map(status => ({
    name: status.status,
    value: status.count
  })) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Patients"
            value={stats?.totalPatients || 0}
            icon={<Users className="h-full w-full" />}
            description="Registered patients"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Appointments"
            value={stats?.totalAppointments || 0}
            icon={<Calendar className="h-full w-full" />}
            description="All time"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Today's Appointments"
            value={stats?.todayAppointments || 0}
            icon={<Activity className="h-full w-full" />}
            description="Scheduled for today"
          />
          <StatCard
            title="Upcoming Appointments"
            value={stats?.upcomingAppointments || 0}
            icon={<TrendingUp className="h-full w-full" />}
            description="Next 30 days"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <AreaChart
            title="Monthly Patient Visits"
            data={stats?.monthlyPatientVisits || []}
            xKey="month"
            yKey="visits"
            description="Patient visits over the past year"
          />
          <BarChart
            title="Monthly Revenue"
            data={stats?.revenueData || []}
            xKey="month"
            yKey="amount"
            description="Revenue in USD"
            color="#6366f1"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <PieChart
            title="Patients by Department"
            data={departmentData}
            description="Distribution across departments"
            className="md:col-span-1"
          />
          <RecentAppointments
            appointments={upcomingAppointments}
            className="md:col-span-2"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <InventoryStatus
            items={inventory || []}
            className="md:col-span-1"
          />
          <PieChart
            title="Appointment Status"
            data={statusData}
            description="Current appointment status"
            className="md:col-span-1"
            colors={['#3b82f6', '#22c55e', '#ef4444', '#f59e0b']}
          />
          <BarChart
            title="Department Distribution"
            data={stats?.departmentDistribution || []}
            xKey="department"
            yKey="patients"
            description="Patients by department"
            color="#8b5cf6"
            className="md:col-span-1"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
