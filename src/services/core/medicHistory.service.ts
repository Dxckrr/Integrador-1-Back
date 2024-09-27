import connection from "providers/database";

export async function getMedicalHistoryByUserId(id: number): Promise<MedicHistory | null> {
    try {
        const query = 'SELECT * FROM HISTORIA_MEDICA WHERE idHoja_Vida = ?';
        const [rows]: any = await connection.query(query, [id]);
        
        if (rows.length > 0) {
            return rows[0] as MedicHistory;
        } else {
            return null;  
        }
    } catch (error) {
        console.error("Error retrieving medical history:", error);
        throw error;
    }
}
