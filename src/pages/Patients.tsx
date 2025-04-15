
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PatientService } from "@/services/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, Search, User } from "lucide-react";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: patients, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: PatientService.getAll,
  });

  const filteredPatients = patients?.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-120px)] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading patients...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
          <div className="flex gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patients..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to="/patients/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPatients?.map((patient) => (
            <Link key={patient.id} to={`/patients/${patient.id}`}>
              <Card className="h-full cursor-pointer p-4 transition-all hover:shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.contactInfo}</p>
                    {patient.dateOfBirth && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        DOB: {patient.dateOfBirth}
                      </p>
                    )}
                    {patient.gender && (
                      <p className="text-xs text-muted-foreground">Gender: {patient.gender}</p>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {filteredPatients?.length === 0 && (
            <div className="col-span-full flex h-32 items-center justify-center rounded-md border border-dashed p-8">
              <p className="text-center text-muted-foreground">
                {searchTerm
                  ? "No patients match your search criteria."
                  : "No patients found. Add some patients to get started."}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
