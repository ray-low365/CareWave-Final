
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PatientService } from "@/services/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Edit, 
  Loader2, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  User 
} from "lucide-react";
import AddPatientForm from "@/components/patients/AddPatientForm";
import EditPatientForm from "@/components/patients/EditPatientForm";
import { Patient } from "@/types";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: patients, isLoading, refetch } = useQuery({
    queryKey: ["patients"],
    queryFn: PatientService.getAll,
  });

  const deletePatientMutation = useMutation({
    mutationFn: (id: number) => PatientService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete patient");
    }
  });

  const filteredPatients = patients?.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSuccess = () => {
    refetch();
  };

  const handleEditPatient = (patient: Patient) => {
    setPatientToEdit(patient);
  };

  const handleDeletePatient = (patient: Patient) => {
    setPatientToDelete(patient);
  };

  const confirmDeletePatient = () => {
    if (patientToDelete) {
      deletePatientMutation.mutate(patientToDelete.id);
      setPatientToDelete(null);
    }
  };

  const handleViewPatient = (id: number) => {
    navigate(`/patients/${id}`);
  };

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
            <Button onClick={() => setAddPatientOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPatients?.map((patient) => (
            <Card key={patient.id} className="h-full cursor-pointer p-4 transition-all hover:shadow-md relative">
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewPatient(patient.id)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditPatient(patient)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeletePatient(patient)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div 
                className="flex items-start space-x-4"
                onClick={() => handleViewPatient(patient.id)}
              >
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
      
      <AddPatientForm 
        open={addPatientOpen} 
        onOpenChange={setAddPatientOpen} 
        onSuccess={handlePatientSuccess} 
      />

      {patientToEdit && (
        <EditPatientForm
          open={!!patientToEdit}
          onOpenChange={() => setPatientToEdit(null)}
          patient={patientToEdit}
          onSuccess={handlePatientSuccess}
        />
      )}

      <AlertDialog open={!!patientToDelete} onOpenChange={() => setPatientToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {patientToDelete?.name}'s record and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeletePatient}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Patients;
