import {
  CreatePatientInput,
  CreatePatientOutput,
  DeletePatientInput,
  DeletePatientOutput,
} from "./types";

export interface IORCAAPIClient {
  createPatient(input: CreatePatientInput): Promise<CreatePatientOutput>;
  // updatePatient(params: UpdatePatientParams): Promise<void>;
  deletePatient(input: DeletePatientInput): Promise<DeletePatientOutput>;
  // getAppointments(patientID: string): Promise<Page<Appointment>>;
  // createAppointment(params: CreateAppointmentParams): Promise<void>;
  // updateAppointment(params: UpdateAppointmentParams): Promise<void>;
}
