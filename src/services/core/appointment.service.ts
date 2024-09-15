import { Appointment } from 'interfaces/Appointment';
import connection from '../../providers/database';
/**
 * Creates a new Appointment
 * @param appointmentData 
 * @returns the data from the created appointment otherwise throws an error
 */
export async function createAppointment(appointmentData: Appointment) {
    try {
        const query = 'INSERT INTO CITAS ( dia, hora, estadoCita, idServicio, idHistoria_Medica, idUsuarioCC, idDocCC) VALUES(?, ?, ?, ?, ?, ?, ?)';
        const values = [appointmentData.dia, appointmentData.hora, appointmentData.estadoCita, appointmentData.idServicio,
        appointmentData.idHistoria_Medica, appointmentData.idUsuarioCC, appointmentData.idDocCC];
        const [result]: any = await connection.query(query, values);
        return { id: result.insertId, ...appointmentData };
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
}
/**
 * Gets all the appointments on the database
 * @returns appointments otherwise throws an error
 */
export async function getAllAppointments() {
    try {
        const query = 'SELECT * FROM CITAS';
        const [rows]: any = await connection.query(query);
        return rows;
    } catch (error) {
        console.error("Error retrieving appointments:", error);
        throw error;
    }
}
/**
 * Gets an appointment by its id
 * @param id of the appointment
 * @returns an appointment otherwise throws an error
 */
export async function getAppointmentById(id: number) {
    try {
        const query = 'SELECT * FROM CITAS WHERE idCita = ?';
        const [rows]: any = await connection.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving appointment by ID:", error);
        throw error;
    }
}
/**
 * Gets an appointment by its user
 * @param userId the CC of the user
 * @returns an appointment otherwise throws an error
 */
export async function getAppointmentByUser(userId: number) {
    try {
        const query = 'SELECT * FROM CITAS WHERE idDocCC = ? OR idUsuarioCC = ?';
        const [rows]: any = await connection.query(query, [userId, userId]);
        return rows;
    } catch (error) {
        console.error("Error retrieving appointments by user:", error);
        throw error;
    }
}
/**
 * Updates an appointment by giving its id and new data
 * @param id of the appointment
 * @param appointmentData 
 * @returns the appointment with the new data
 */
export async function updateAppointmentById(id: number, appointmentData: any) {
    try {
        const query = 'UPDATE CITAS SET dia = ?, hora = ?, estadoCita = ?, idServicio = ?, idHistoria_Medica = ?, idUsuarioCC = ?, idDocCC = ? WHERE idCita = ?';
        const values = [appointmentData.dia, appointmentData.hora, appointmentData.estadoCita, appointmentData.idServicio,
        appointmentData.idHistoria_Medica, appointmentData.idUsuarioCC, appointmentData.idDocCC, id];
        const [result]: any = await connection.query(query, values);
        if (result.affectedRows > 0) {
            return { id, ...appointmentData };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error updating appointment:", error);
        throw error;
    }
}

export async function deleteAppointmentById(id: number) {
    try {
        const query = 'DELETE * FROM CITAS WHERE idCita = ?';
        const [rows]: any = await connection.query(query, [id]);
        return rows;
    } catch (error) {
        console.error("Error deleting appointment", error);
        throw error;
    }
}