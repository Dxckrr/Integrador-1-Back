import connection from '../../providers/database';
/**
 * Get a medical authorization
 * @returns appointments otherwise throws an error
 */
export async function getAuthorizationById(id: number) {
    try {
        const query = `
            SELECT 
                om.idOrden_Medica,
                om.idCita,
                om.estadoOM,
                om.fecha,
                om.diagnostico,
                om.ordenes,
                om.recomendaciones,
                CONCAT(pacient.nombreUsuario, ' ', pacient.apellidoUsuario) AS pacientName,
                CONCAT(medic.nombreUsuario, ' ', medic.apellidoUsuario) AS medicName
            FROM ORDENES_MEDICAS om
            JOIN CITAS cita ON om.idCita = cita.idCita
            JOIN USUARIOS medic ON cita.idDocCC = medic.CC
            JOIN USUARIOS pacient ON cita.idUsuarioCC = pacient.CC
            WHERE om.idOrden_Medica = ?
        `;
        const [rows]: any = await connection.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving appointments:", error);
        throw error;
    }
}


export async function updateAuthorization(id: number) {
    try {
        const query = `UPDATE ORDENES_MEDICAS SET estadoOM = 1 WHERE idOrden_Medica = ?`;
        const [rows]: any = await connection.query(query, [id]);
        if (rows.affectedRows > 0) {
            return id
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving appointments:", error);
        throw error;
    }
}