import express from 'express';
import { PatientController } from '../controllers/patientController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management endpoints
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 *       500:
 *         description: Server error
 */
router.get('/', PatientController.getAllPatients);

/**
 * @swagger
 * /api/patients/search:
 *   get:
 *     summary: Search patients by name
 *     tags: [Patients]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of matching patients
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.get('/search', PatientController.searchPatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient details
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
router.get('/:id', PatientController.getPatientById);

/**
 * @swagger
 * /api/patients/{id}/with-appointments:
 *   get:
 *     summary: Get a patient with their appointments
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient with appointments
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
router.get('/:id/with-appointments', PatientController.getPatientWithAppointments);

/**
 * @swagger
 * /api/patients/{id}/appointments:
 *   get:
 *     summary: Get patient appointments
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: List of patient appointments
 *       500:
 *         description: Server error
 */
router.get('/:id/appointments', PatientController.getPatientAppointments);

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contact_info
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               contact_info:
 *                 type: string
 *               address:
 *                 type: string
 *               medical_history:
 *                 type: string
 *               appointment_history:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               insurance_provider:
 *                 type: string
 *               insurance_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post('/', PatientController.createPatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact_info:
 *                 type: string
 *               address:
 *                 type: string
 *               medical_history:
 *                 type: string
 *               appointment_history:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               insurance_provider:
 *                 type: string
 *               insurance_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
router.put('/:id', PatientController.updatePatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       204:
 *         description: Patient deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/:id', PatientController.deletePatient);

export default router;
