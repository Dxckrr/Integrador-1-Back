import connection from "../providers/database";

/**
 * Gets all hours in a day
 * @param date 
 * @returns 
 */
export async function getAppointmentsByDate(date: string): Promise<string[] | null> {
    try {
        const query = 'SELECT hora FROM CITAS WHERE dia = ?';
        const [rows]: any = await connection.query(query, [date]);

        if (rows.length > 0) {
            return rows.map((row: any) => row.hora);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error retrieving appointments:", error);
        return null;
    }
}
