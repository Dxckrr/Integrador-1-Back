// services/OperatorService.ts

import { User } from "interfaces/User";
import connection from "providers/database";

// Crear operador
export async function createOperator(operator: User): Promise<User | null> {
    try {
        if (operator.idRol !== 2) { // idRol 2 para operadores
            throw new Error("El usuario debe tener el rol de operador (idRol = 2).");
        }

        const query = `INSERT INTO OPERADORES SET ?`;
        const result: any = await connection.query(query, [operator]);

        if (result.affectedRows > 0) {
            operator.CC = result.insertId;
            return operator;
        }
        return null;
    } catch (error) {
        console.error("Error creating operator:", error);
        throw error;
    }
}

// Actualizar operador
export async function updateOperator(CC: string, updatedOperator: Partial<User>): Promise<User | null> {
    try {
        const query = `UPDATE OPERADORES SET ? WHERE CC = ? AND idRol = ?`;
        const result: any = await connection.query(query, [updatedOperator, CC, 2]); // idRol 2 para operadores

        if (result.affectedRows > 0) {
            return { CC, ...updatedOperator } as User;
        }
        return null;
    } catch (error) {
        console.error("Error updating operator:", error);
        throw error;
    }
}

// Eliminar operador
export async function deleteOperator(CC: string): Promise<boolean> {
    try {
        const query = `DELETE FROM OPERADORES WHERE CC = ? AND idRol = ?`;
        const result: any = await connection.query(query, [CC, 2]); // idRol 2 para operadores

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting operator:", error);
        throw error;
    }
}
