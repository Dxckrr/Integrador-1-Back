import connection from '../../providers/database';
import { Emergency } from 'interfaces/Emergency';
/**
 * Creates a new Appointment
 * @param appointmentData 
 * @returns the data from the created appointment otherwise throws an error
 */
export async function createEmergency(emergencyData: Emergency) {
    try {
        const query = 'INSERT INTO EMERGENCIAS (horaLlegada,estadoEmergencia, idTipo_Emergencia, descripcion, nombre, apellido, CC) VALUES(?, ?, ?, ?, ?, ?, ?)';
        const values = [new Date(),0, emergencyData.idTipo_Emergencia, emergencyData.descripcion,emergencyData.nombre ,emergencyData.apellido,emergencyData.CC];
        const [result]: any = await connection.query(query, values);
        return { id: result.insertId, ...emergencyData };
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
}
/**
 * Gets all the appointments on the database
 * @returns appointments otherwise throws an error
 */
export async function getEmergencies() {
    try {
        const query = `SELECT * FROM EMERGENCIAS`;
        const [rows]: any = await connection.query(query);
        return rows;
    } catch (error) {
        console.error("Error retrieving appointments:", error);
        throw error;
    }
}