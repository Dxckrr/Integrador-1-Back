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
        const values = [appointmentData.dia, appointmentData.hora, 0, appointmentData.idServicio,
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
        const query = `SELECT cita.idServicio AS 'type', CONCAT(medic.nombreUsuario, ' ', medic.apellidoUsuario) AS 'medicName', 
            CONCAT(cita.dia, ' ') AS 'date', cita.idCita AS 'id',
            CONCAT(pacient.nombreUsuario, ' ', pacient.apellidoUsuario) AS 'pacientName',
            pacient.emailUsuario AS 'pacientEmail', idUsuarioCC AS 'pacientID', hora AS 'time'
            FROM CITAS cita
            JOIN USUARIOS medic ON cita.idDocCC = medic.CC
            JOIN USUARIOS pacient ON cita.idUsuarioCC = pacient.CC 
            WHERE cita.estadoCita = 0`;
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
        const query = `SELECT cita.idServicio AS 'type', CONCAT(medic.nombreUsuario, ' ', medic.apellidoUsuario) AS 'medicName', 
        CONCAT(cita.dia, ' ') AS 'date', cita.idCita AS 'id',
        CONCAT(pacient.nombreUsuario, ' ', pacient.apellidoUsuario) AS 'pacientName',
        pacient.emailUsuario AS 'pacientEmail', idUsuarioCC AS 'pacientID', hora AS 'time'
        FROM CITAS cita
        JOIN USUARIOS medic ON cita.idDocCC = medic.CC
        JOIN USUARIOS pacient ON cita.idUsuarioCC = pacient.CC
        WHERE idUsuarioCC = ?`;
        const [rows]: any = await connection.query(query, [userId]);
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
        const query = 'UPDATE CITAS SET dia = ?, hora = ?, idHistoria_Medica = ? WHERE idCita = ?';
        const values = [appointmentData.dia, appointmentData.hora,
        appointmentData.idHistoria_Medica, id];
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
        const query = 'DELETE FROM CITAS WHERE idCita = ?';
        const [rows]: any = await connection.query(query, [id]);
        return rows;
    } catch (error) {
        console.error("Error deleting appointment", error);
        throw error;
    }
}
export async function getAppointmentsByService(service: number) {
    try {
        const query = `
            SELECT 
                MONTH(c.dia) AS month_num, 
                YEAR(c.dia) AS year, 
                SUM(s.precioServicio) AS total_income  
            FROM 
                CITAS c
            JOIN 
                SERVICIOS s ON c.idServicio = s.idServicio
            JOIN 
                ESPECIALIDADES e ON s.idEspecialidad = e.idEspecialidad
            WHERE 
                e.idEspecialidad = ? 
            GROUP BY 
                YEAR(c.dia), MONTH(c.dia)  
            ORDER BY 
                YEAR(c.dia), MONTH(c.dia) 
                ;
        `;
        const [rows]: any = await connection.query(query, [service]);  // Use category as parameter
        return rows;  // This will return an array of { month, total_income }
    } catch (error) {
        console.error("Error fetching appointments by category", error);
        throw error;
    }
}

export async function getAllAppointments_PRICE() {
    try {
        const query = `
            SELECT 
                c.dia AS appointment_date, 
                s.precioServicio AS service_price  
            FROM CITAS c
            JOIN 
                SERVICIOS s ON c.idServicio = s.idServicio  
            ORDER BY c.dia;
        `;
        const [rows]: any = await connection.query(query);  // Use category as parameter
        return rows;  // This will return an array of { month, total_income }
    } catch (error) {
        console.error("Error fetching appointments by category", error);
        throw error;
    }
}
