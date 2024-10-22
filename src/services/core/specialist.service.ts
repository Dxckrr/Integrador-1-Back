// services/MedicService.ts

import { User } from "interfaces/User";
import connection from "providers/database";


// Crear especialista
export async function createMedic(medic: User): Promise<User | null> {
    try {
        if (medic.idRol !== 3) { // idRol 3 para especialistas
            throw new Error("El usuario debe tener el rol de especialista (idRol = 3).");
        }

        const query = `INSERT INTO ESPECIALISTAS SET ?`;
        const result: any = await connection.query(query, [medic]);

        if (result.affectedRows > 0) {
            medic.CC = result.insertId; // Obtener el ID generado
            return medic;
        }
        return null;
    } catch (error) {
        console.error("Error creating medic:", error);
        throw error;
    }
}

// Actualizar especialista
export async function updateMedic(CC: string, updatedMedic: Partial<User>): Promise<User | null> {
    try {
        const query = `UPDATE ESPECIALISTAS SET ? WHERE CC = ? AND idRol = ?`;
        const result: any = await connection.query(query, [updatedMedic, CC, 3]); // idRol 3 para especialistas

        if (result.affectedRows > 0) {
            return { CC, ...updatedMedic } as User;
        }
        return null;
    } catch (error) {
        console.error("Error updating medic:", error);
        throw error;
    }
}

// Eliminar especialista
export async function deleteMedic(CC: string): Promise<boolean> {
    try {
        const query = `DELETE FROM ESPECIALISTAS WHERE CC = ? AND idRol = ?`;
        const result: any = await connection.query(query, [CC, 3]); // idRol 3 para especialistas

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting medic:", error);
        throw error;
    }
}
