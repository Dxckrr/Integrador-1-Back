import { OrdenMedica } from "../../interfaces/Order";
import connection from "../../providers/database";

/**
 * Creates a new medical order (Orden Medica)
 * @param ordenMedica 
 * @returns 
 */
export async function createOrdenMedica(ordenMedica: OrdenMedica) {
    try {
        const query = `
            INSERT INTO ORDENES_MEDICAS 
            (idCita, estadoOM, fecha, diagnostico, ordenes, recomendaciones) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result: any = await connection.query(query, [
            ordenMedica.idCita,
            ordenMedica.estadoOM,
            new Date(), // La fecha se genera automáticamente
            ordenMedica.diagnostico,
            ordenMedica.ordenes,
            ordenMedica.recomendaciones
        ]);

        const idOrdenMedica = result[0].insertId;
        console.log("OrdenMedica ID:", idOrdenMedica);

        if (!result) {
            return { success: false, message: 'Error creating medical order.' };
        }
        return { success: true, message: 'Medical order created successfully.', idOrdenMedica };
    } catch (error) {
        console.error('Error creating medical order:', error);
        return { success: false, message: 'Error creating medical order.' };
    }
}


/**
 * Retrieves a medical order by its ID
 * @param id 
 * @returns 
 */
export async function getOrdenMedicaById(id: number): Promise<OrdenMedica | null> {
    try {
        const query = 'SELECT * FROM ORDENES_MEDICAS WHERE idOrden_Medica = ?';
        const [rows]: any = await connection.query(query, [id]);
        if (rows.length > 0) {
            return rows[0] as OrdenMedica;
        } else {
            console.log(`No medical order found with ID: ${id}`);
            return null;
        }
    } catch (error) {
        console.error("Error retrieving medical order:", error);
        throw error;
    }
}


/**
 * Retrieves all medical orders
 * @returns 
 */
export async function getAllOrdenesMedicas(): Promise<OrdenMedica[] | null> {
    try {
        const query = 'SELECT * FROM ORDENES_MEDICAS';
        const [rows]: any = await connection.query(query);
        if (rows.length > 0) {
            return rows as OrdenMedica[];
        } else {
            console.log('No medical orders found.');
            return null;
        }
    } catch (error) {
        console.error("Error retrieving medical orders:", error);
        throw error;
    }
}

export async function getOrdenesMedicasByUsuarioId(idUsuarioCC: string): Promise<OrdenMedica[] | null> {
    try {
        const query = `
            SELECT om.* 
            FROM ORDENES_MEDICAS om
            JOIN CITAS c ON om.idCita = c.idCita
            WHERE c.idUsuarioCC = ?;
        `;
        const [rows]: any = await connection.query(query, [idUsuarioCC]);

        if (rows.length > 0) {
            return rows as OrdenMedica[];
        } else {
            console.log(`No medical orders found for user with ID: ${idUsuarioCC}`);
            return null;
        }
    } catch (error) {
        console.error(`Error retrieving medical orders for user with ID: ${idUsuarioCC}`, error);
        throw error;
    }
}




