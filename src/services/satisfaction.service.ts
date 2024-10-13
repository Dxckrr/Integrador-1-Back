import { Satisfaction } from "interfaces/Satisfaction";
import connection from "../providers/database";

/**
 * Inserts a survey
 * @param date 
 * @returns 
 */
export async function registerSurveyData(satisfaction: Satisfaction) {
    try {
        const query = `INSERT INTO ENCUESTA_SATISFACCION (calificacion, nivel_satisfaccion, area_a_mejorar, comentarios , recomendacion)
        VALUES(?,?,?,?,?);`
        const values = [satisfaction.calificacion, satisfaction.nivel_satisfaccion, satisfaction.area_a_mejorar, satisfaction.comentarios, satisfaction.recomendacion];
        const [result]: any = await connection.query(query, values);
        return { id: result.insertId, ...satisfaction };
    } catch (error) {
        console.error("Error creating satisfactionData:", error);
        throw error;
    }
}
/**
 * Gets all satisfaction survey data
 * @param date 
 * @returns 
 */
export async function getAllSurveysData() {
    try {
        const query = 'SELECT * FROM ENCUESTA_SATISFACCION';
        const [rows]: any = await connection.query(query);

        if (rows.length > 0) {
            return rows
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error retrieving appointments:", error);
        return null;
    }
}
