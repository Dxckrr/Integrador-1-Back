// services/PatientService.ts

import { User } from "interfaces/User";
import connection from "providers/database";


// Actualizar paciente
export async function updatePatient(CC: string, updatedPatient: Partial<User>): Promise<User | null> {
    try {
        const query = `UPDATE PACIENTES SET ? WHERE CC = ? AND idRol = ?`;
        const result: any = await connection.query(query, [updatedPatient, CC, 4]); // idRol 4 para pacientes

        if (result.affectedRows > 0) {
            return { CC, ...updatedPatient } as User;
        }
        return null;
    } catch (error) {
        console.error("Error updating patient:", error);
        throw error;
    }
}

// Cambiar estado de un paciente
export async function changePatientStatus(CC: string, newStatus: boolean): Promise<User | null> {
    try {
        const query = `UPDATE PACIENTES SET estadoUsuario = ? WHERE CC = ? AND idRol = ?`;
        const result: any = await connection.query(query, [newStatus, CC, 4]); // idRol 4 para pacientes

        if (result.affectedRows > 0) {
            return { CC, estadoUsuario: newStatus } as User;
        }
        return null;
    } catch (error) {
        console.error("Error changing patient status:", error);
        throw error;
    }
}
