import connection from "../providers/database";

/**
 * Gets the number of specialties registered in the database
 * @param  
 * @returns 
 */
export async function getNumberOfSpecialites() {
    try {
        const query = 'SELECT COUNT(*) AS totalEspecialidades FROM ESPECIALIDADES WHERE idSede = 2;';
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
/**
 * Gets the specialty more frequent
 * @param  
 * @returns 
 */
export async function getMoreAskedSpecialty() {
    try {
        const query = `SELECT E.nombreEspecialidad, COUNT(C.idServicio) AS cantidadPedidos
                        FROM CITAS C
                        JOIN SERVICIOS S ON C.idServicio = S.idServicio
                        JOIN ESPECIALIDADES E ON S.idEspecialidad = E.idEspecialidad 
                        GROUP BY E.nombreEspecialidad
                        ORDER BY cantidadPedidos DESC
                        LIMIT 1;`;
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
/**
 * Gets the number of users in the database
 * @param  
 * @returns 
 */
export async function getNumberOfUsers() {
    try {
        const query = `SELECT COUNT(*) AS totalUsuarios
                        FROM USUARIOS;`;
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
/**
 * Gets the number of users in the database
 * @param  
 * @returns 
 */
export async function getNumberOfPatients() {
    try {
        const query = `SELECT COUNT(*) AS totalSoloUsuarios
                        FROM USUARIOS
                        WHERE idRol = 4;
                        `;
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
/**
 * Gets the number of users in the database
 * @param  
 * @returns 
 */
export async function getNumberOfSpecialist() {
    try {
        const query = `SELECT COUNT(*) AS totalSoloUsuarios
                        FROM USUARIOS
                        WHERE idRol = 3;
                        `;
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
/**
 * Gets the number of users in the database
 * @param  
 * @returns 
 */
export async function getNumberOfOperators() {
    try {
        const query = `SELECT COUNT(*) AS totalSoloUsuarios
                        FROM USUARIOS
                        WHERE idRol = 2;
                        `;
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
/**
 * Gets the number of services in the database
 * @param  
 * @returns 
 */
export async function getNumberOfServices() {
    try {
        const query = `SELECT COUNT(*) AS totalServicios
                        FROM SERVICIOS S
                        JOIN ESPECIALIDADES E ON S.idEspecialidad = E.idEspecialidad
                        WHERE E.idSede = 2;
                        `;
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
/**
 * Gets the service more frequent
 * @param  
 * @returns 
 */
export async function getMoreAskedServicee() {
    try {
        const query = `SELECT S.nombreServicio, COUNT(*) AS cantidadPedidos
                        FROM CITAS C
                        JOIN SERVICIOS S ON C.idServicio = S.idServicio
                        JOIN ESPECIALIDADES E ON S.idEspecialidad = E.idEspecialidad
                        WHERE E.idSede = 2
                        GROUP BY S.nombreServicio
                        ORDER BY cantidadPedidos DESC
                        LIMIT 1;
                        `;
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
/**
 * Gets the number of emergencies in the database
 * @param  
 * @returns 
 */
export async function getNumberOfEmergencies() {
    try {
        const query = `SELECT COUNT(*) AS totalEmergencias
                        FROM EMERGENCIAS;
                        `;
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
/**
 * Gets the number of appointments done in the database
 * @param  
 * @returns 
 */
export async function getNumberOfAppointmentsDone() {
    try {
        const query = `SELECT COUNT(*) AS totalCitasRealizadas
                        FROM CITAS
                        WHERE estadoCita = 1;
                        `;
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
/**
 * Gets the last appointment done
 * @param  
 * @returns 
 */
export async function getLastAppointmentDone() {
    try {
        const query = `SELECT dia, idCita
                        FROM CITAS
                        WHERE idCita = (
                            SELECT MAX(idCita)
                            FROM CITAS
                            WHERE estadoCita = 1
                        );`;
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

/**
 * Gets the number of appointments NOT done in the database
 * @param  
 * @returns 
 */
export async function getNumberOfAppointments_OnWait() {
    try {
        const query = `SELECT COUNT(*) AS totalCitasPendientes
                        FROM CITAS
                        WHERE estadoCita = 0;`;
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
/**
 * Gets the last appointment done
 * @param  
 * @returns 
 */
export async function getLastAppointment_OnWait() {
    try {
        const query = `SELECT dia, idCita
                        FROM CITAS
                        WHERE idCita = (
                            SELECT MAX(idCita)
                            FROM CITAS
                            WHERE estadoCita = 0
                        );`;
                        
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
/**
 * Gets the total income from services
 * @param  
 * @returns 
 */
export async function getTotalIncome() {
    try {
        const query = `SELECT SUM(S.precioServicio) AS ingresosTotales
                        FROM CITAS C
                        JOIN SERVICIOS S ON C.idServicio = S.idServicio;`;
                        
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
/**
 * Gets number of appointments by month
 * @param  
 * @returns 
 */
export async function getAppointmentStadistics() {
    try {
        const query = `SELECT
                        e.nombreEspecialidad,
                        SUM(s.precioServicio) AS total_income  
                        FROM 
                            CITAS c
                        JOIN 
                            SERVICIOS s ON c.idServicio = s.idServicio
                        JOIN 
                            ESPECIALIDADES e ON s.idEspecialidad = e.idEspecialidad
                        GROUP BY 
                            e.nombreEspecialidad;`;
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