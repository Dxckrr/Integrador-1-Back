import { MedicHistory } from "interfaces/MedicHistory";
import connection from "../../providers/database";

/**
 * Crea una nueva historia médica (Historia_Medica)
 * @param historiaMedica 
 * @returns 
 */
export async function createHistoriaMedica(historiaMedica: MedicHistory) {
    try {
        const query = `
            INSERT INTO HISTORIA_MEDICA 
            (
                tipoSangre, genero, fecha_Nac, discapacidad, fecha_Rev, 
                hora_Rev, motivo, descripcion_Motivo, presion_Sangre, 
                presion_Sangre_Prom, pulso, saturacion, altura, peso, 
                perinatales, patologicos, quirurgicos, vacunas, familiares, conclusion
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const result: any = await connection.query(query, [
            historiaMedica.tipoSangre,
            historiaMedica.genero,
            historiaMedica.fecha_Nac,
            historiaMedica.discapacidad,
            historiaMedica.fecha_Rev,
            historiaMedica.hora_Rev,
            historiaMedica.motivo,
            historiaMedica.descripcion_Motivo,
            historiaMedica.presion_Sangre,
            historiaMedica.presion_Sangre_Prom,
            historiaMedica.pulso,
            historiaMedica.saturacion,
            historiaMedica.altura,
            historiaMedica.peso,
            historiaMedica.perinatales,
            historiaMedica.patologicos,
            historiaMedica.quirurgicos,
            historiaMedica.vacunas,
            historiaMedica.familiares,
            historiaMedica.conclusion
        ]);

        const idHistoriaMedica = result[0].insertId;
        console.log("HistoriaMedica ID:", idHistoriaMedica);

        if (!result) {
            return { success: false, message: 'Error creando la historia médica.' };
        }
        return { success: true, message: 'Historia médica creada con éxito.', idHistoriaMedica };

    } catch (error) {
        console.error('Error creando la historia médica:', error);
        return { success: false, message: 'Error creando la historia médica.' };
    }
}

/**
 * Retrieves a medical history by user ID
 * @param userId 
 * @returns 
 */
export async function getMedicalHistoryById(id: number): Promise<any | null> { // Ajusta el tipo según tu implementación
    try {
        const query = 'SELECT * FROM HISTORIA_MEDICA WHERE idHistoria_Medica = ?'; // Asegúrate de ajustar el query
        const [rows]: any = await connection.query(query, [id]);
        if (rows.length > 0) {
            return rows[0]; // Ajusta según el formato de datos
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error obteniendo la historia médica:", error);
        throw error;
    }
}
