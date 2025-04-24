
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@/services/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaChart from "@/components/dashboard/AreaChart";
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";
import { Loader2, BarChart as BarChartIcon, LineChart, PieChart as PieChartIcon, FileDown } from "lucide-react";
import { exportToPDF } from "@/utils/exportUtils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("patients");
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: DashboardService.getStats,
  });

  // Handle exporting analytics data to PDF
  const handleExportPDF = () => {
    try {
      let title = "";
      let content = "";

      switch (activeTab) {
        case "patients":
          title = "Patient Analytics Report";
          content = generatePatientAnalyticsContent();
          break;
        case "revenue":
          title = "Revenue Analytics Report";
          content = generateRevenueAnalyticsContent();
          break;
        case "distribution":
          title = "Distribution Analytics Report";
          content = generateDistributionAnalyticsContent();
          break;
      }

      exportToPDF(title, content);
      toast.success("PDF export initiated");
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toast.error("Failed to export to PDF");
    }
  };

  // Generate content for patient analytics PDF
  const generatePatientAnalyticsContent = () => {
    return `
      <h2>Monthly Patient Visits</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Month</th>
          <th>Visits</th>
        </tr>
        ${stats?.monthlyPatientVisits.map(item => `
          <tr>
            <td>${item.month}</td>
            <td>${item.visits}</td>
          </tr>
        `).join('')}
      </table>

      <h2>Patient Distribution by Department</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Department</th>
          <th>Patients</th>
        </tr>
        ${stats?.departmentDistribution.map(item => `
          <tr>
            <td>${item.department}</td>
            <td>${item.patients}</td>
          </tr>
        `).join('')}
      </table>
    `;
  };

  // Generate content for revenue analytics PDF
  const generateRevenueAnalyticsContent = () => {
    const totalRevenue = stats?.revenueData.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
    const highestRevenue = Math.max(...(stats?.revenueData.map(item => Number(item.amount)) || [0]));
    const avgRevenue = totalRevenue / (stats?.revenueData.length || 1);

    return `
      <h2>Revenue Highlights</h2>
      <p><strong>Total Annual Revenue:</strong> $${totalRevenue.toLocaleString()}</p>
      <p><strong>Highest Monthly Revenue:</strong> $${highestRevenue.toLocaleString()}</p>
      <p><strong>Average Monthly Revenue:</strong> $${Math.round(avgRevenue).toLocaleString()}</p>

      <h2>Monthly Revenue</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Month</th>
          <th>Amount (USD)</th>
        </tr>
        ${stats?.revenueData.map(item => `
          <tr>
            <td>${item.month}</td>
            <td>$${Number(item.amount).toLocaleString()}</td>
          </tr>
        `).join('')}
      </table>
    `;
  };

  // Generate content for distribution analytics PDF
  const generateDistributionAnalyticsContent = () => {
    return `
      <h2>Department Distribution</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Department</th>
          <th>Patients</th>
        </tr>
        ${stats?.departmentDistribution.map(item => `
          <tr>
            <td>${item.department}</td>
            <td>${item.patients}</td>
          </tr>
        `).join('')}
      </table>

      <h2>Appointment Status</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Status</th>
          <th>Count</th>
        </tr>
        ${stats?.appointmentStatus.map(item => `
          <tr>
            <td>${item.status}</td>
            <td>${item.count}</td>
          </tr>
        `).join('')}
      </table>
    `;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-120px)] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading analytics data...</p>
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportPDF}>
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs
          defaultValue="patients"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="w-full justify-start">
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Patient Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <BarChartIcon className="h-4 w-4" />
              <span>Revenue Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Distribution</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <AreaChart
                title="Monthly Patient Visits"
                data={stats?.monthlyPatientVisits || []}
                xKey="month"
                yKey="visits"
                description="Patient visits over the past year"
                height={350}
              />
              <BarChart
                title="Patient Distribution by Department"
                data={stats?.departmentDistribution || []}
                xKey="department"
                yKey="patients"
                description="Current patient distribution"
                height={350}
                color="#6366f1"
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Patient Visit Trends</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <AreaChart
                  title=""
                  data={stats?.monthlyPatientVisits || []}
                  xKey="month"
                  yKey="visits"
                  height={400}
                  color="#0891b2"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <BarChart
                title="Monthly Revenue"
                data={stats?.revenueData || []}
                xKey="month"
                yKey="amount"
                description="Revenue in USD"
                height={350}
                color="#8b5cf6"
              />
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.revenueData && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold">
                            ${stats.revenueData.reduce((sum, item) => sum + Number(item.amount), 0).toLocaleString()}
                          </h3>
                          <p className="text-sm text-muted-foreground">Total Annual Revenue</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            ${Math.max(...stats.revenueData.map(item => Number(item.amount))).toLocaleString()}
                          </h3>
                          <p className="text-sm text-muted-foreground">Highest Monthly Revenue</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            ${Math.round(stats.revenueData.reduce((sum, item) => sum + Number(item.amount), 0) / stats.revenueData.length).toLocaleString()}
                          </h3>
                          <p className="text-sm text-muted-foreground">Average Monthly Revenue</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <AreaChart
                  title=""
                  data={stats?.revenueData || []}
                  xKey="month"
                  yKey="amount"
                  height={400}
                  color="#d946ef"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-3">
              <PieChart
                title="Patients by Department"
                data={departmentData}
                description="Distribution across departments"
                height={300}
              />
              <PieChart
                title="Appointment Status"
                data={statusData}
                description="Current appointment status"
                height={300}
                colors={['#3b82f6', '#22c55e', '#ef4444', '#f59e0b']}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Distribution Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.departmentDistribution && (
                      <div>
                        <h3 className="text-lg font-semibold">
                          {stats.departmentDistribution.sort((a, b) => b.patients - a.patients)[0].department}
                        </h3>
                        <p className="text-sm text-muted-foreground">Department with most patients</p>
                      </div>
                    )}
                    {stats?.appointmentStatus && (
                      <div>
                        <h3 className="text-lg font-semibold">
                          {stats.appointmentStatus.reduce((sum, item) => sum + item.count, 0)} Total Appointments
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((stats.appointmentStatus.find(s => s.status === 'Completed')?.count || 0) /
                            stats.appointmentStatus.reduce((sum, item) => sum + item.count, 0) * 100)}% Completion Rate
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <BarChart
                title="Patient Distribution"
                data={stats?.departmentDistribution || []}
                xKey="department"
                yKey="patients"
                height={350}
                color="#0ea5e9"
              />
              <BarChart
                title="Appointment Status Distribution"
                data={stats?.appointmentStatus || []}
                xKey="status"
                yKey="count"
                height={350}
                color="#f97316"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
