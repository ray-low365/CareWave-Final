import { Request, Response } from 'express';
import { PatientService } from '../services/patientService';
import { AppointmentService } from '../services/appointmentService';

export const PatientController = {
  /**
   * Get all patients
   */
  getAllPatients: async (req: Request, res: Response) => {
    try {
      const patients = await PatientService.getAll();
      res.status(200).json(patients);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  },
  
  /**
   * Get a patient by ID
   */
  getPatientById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const patient = await PatientService.getById(id);
      res.status(200).json(patient);
    } catch (error: any) {
      if (error.message === 'Patient not found') {
        res.status(404).json({ error: true, message: error.message });
      } else {
        res.status(500).json({ error: true, message: error.message });
      }
    }
  },
  
  /**
   * Get a patient with their appointments
   */
  getPatientWithAppointments: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const patientWithAppointments = await PatientService.getWithAppointments(id);
      res.status(200).json(patientWithAppointments);
    } catch (error: any) {
      if (error.message === 'Patient not found') {
        res.status(404).json({ error: true, message: error.message });
      } else {
        res.status(500).json({ error: true, message: error.message });
      }
    }
  },
  
  /**
   * Create a new patient
   */
  createPatient: async (req: Request, res: Response) => {
    try {
      const newPatient = await PatientService.create(req.body);
      res.status(201).json(newPatient);
    } catch (error: any) {
      res.status(400).json({ error: true, message: error.message });
    }
  },
  
  /**
   * Update a patient
   */
  updatePatient: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedPatient = await PatientService.update(id, req.body);
      res.status(200).json(updatedPatient);
    } catch (error: any) {
      if (error.message === 'Patient not found') {
        res.status(404).json({ error: true, message: error.message });
      } else {
        res.status(400).json({ error: true, message: error.message });
      }
    }
  },
  
  /**
   * Delete a patient
   */
  deletePatient: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await PatientService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  },
  
  /**
   * Search patients by name
   */
  searchPatients: async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: true, message: 'Search query is required' });
      }
      
      const patients = await PatientService.search(query);
      res.status(200).json(patients);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  },
  
  /**
   * Get patient appointments
   */
  getPatientAppointments: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const appointments = await AppointmentService.getByPatientId(id);
      res.status(200).json(appointments);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  }
};
