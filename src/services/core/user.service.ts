import { User, MedicalRecord } from '../../interfaces/User';
import connection from "../../providers/database";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * Creates a new user
 * @param user 
 * @returns 
 */

export async function createUser(user: User) {
    try {
        const hashedPassword = await encryptPassword(user.pwdUsuario);

        const query = 'INSERT INTO USUARIOS SET CC=?, nombreUsuario=?, apellidoUsuario=?,emailUsuario=? , pwdUsuario=?, idSede=?, idRol=?, estadoUsuario=?,idEspecialidad=?, idHoja_Vida=?,idTipoPaciente=? ';
        const result: any = await connection.query(query,
            [user.CC, user.nombreUsuario, user.apellidoUsuario, user.emailUsuario,
                hashedPassword, user.idSede, user.idRol, user.estadoUsuario, user.idEspecialidad, user.idHoja_Vida, user.idTipoPaciente
            ]);
        const userId = (result[0].insertId)
        console.log("userId", userId)
        const token = jwt.sign({ _id: result[0].insertId }, process.env.TOKEN_SECRET || '')
        if (!result) {
            return { success: false, message: 'Error creating user.', token: token, userCreate: user };
        }
        console.log('User created successfully.', result);

        //in case exist a medic user, only if you are admin
        // if (user.idRol == 3) {
        //     // const serviceConsul = await getServiceWithDescripByName2(especialidad);
        //     // const idService = serviceConsul?.id ?? 0;
        //     const addMedico = await addMedicidUserIdService(userId, especialidad);
        //     return { success: true, message: 'User, dir and phone created successfully.', token: token, userCreate: { user, phoneUserData, address, addMedico } };
        // }
        return { success: true, message: 'User, dir and phone created successfully.', token: token, userCreate: { user } };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user.' };
    }
};

/**
 * Encrypts the password 
 * @param password 
 * @returns 
 */
export async function encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Validates the password with the encrypted password saved
 * @param password 
 * @param hashedPassword 
 * @returns 
 */
export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
        return false;
    }
}
/**
 * Gets a user by its email prop
 * @param email 
 * @returns 
 */
export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const query = 'SELECT * FROM USUARIOS WHERE emailUsuario = ?';
        const [rows]: any = await connection.query(query, [email]);
        if (rows.length > 0) {
            return rows[0] as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        return null;
    }
}
/**
 * Gets the user by its id
 * @param id
 * @returns 
 */
export async function getUserById(id: number): Promise<User | null> {
    try {
        const query = 'SELECT * FROM USUARIOS WHERE CC = ?';
        const [rows]: any = await connection.query(query, [id]);
        if (rows.length > 0) {
            return rows[0] as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
}

/**
 * Gets the user name by its id
 * @param id
 * @returns
 */
export async function getUserNameById(id: number): Promise<User | null> {
    try {
        const query = `SELECT CONCAT(nombreUsuario, ' ', apellidoUsuario)  as nombreCompleto FROM USUARIOS WHERE CC = ?`;
        const [rows]: any = await connection.query(query, [id]);
        if (rows.length > 0) {
            return rows[0] as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
}
/**
 * Gets all users by its role
 * @param id
 * @returns 
 */

export async function getAllUsersByRole(role: number): Promise<User | null> {
    try {
        const query = 'SELECT * FROM USUARIOS WHERE idRol = ?';
        const [rows]: any = await connection.query(query, [role]);
        if (rows.length > 0) {
            return rows[0] as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
}
/**
 * 
 * @param role 
 * @returns 
 */
export async function getAllPacients(): Promise<User | null> {
    try {
        const query = 'SELECT CC AS pacientID, nombreUsuario AS name, apellidoUsuario AS lastname FROM USUARIOS WHERE idRol = 4;';
        const [rows]: any = await connection.query(query);
        return rows;
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
}
/**
 * Gets all doctors by speciality
 * @param id
 * @returns 
 */

export async function getAllDoctorsBySpeciality(id: number): Promise<User[] | null> {
    try {
        const query = 'SELECT * FROM USUARIOS WHERE idEspecialidad = ? AND idRol = 3';
        const [rows]: any = await connection.query(query, [id]);
        const medics: User[] = [];
        if (rows.length > 0) {
            medics.push(rows[0] as User);
        }
        return medics
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
}
/**
 * Gets the information to generate the history clinic
 * @param userId 
 * @param appoinmentId 
 * @returns 
 */
export async function getHistoryClinicInfo(userId: string, appoinmentId: number) {
    try {
        const query = `SELECT historia.fecha_Rev, historia.hora_Rev, cita.idServicio, -- Datos cita
                        pacient.nombreUsuario, pacient.apellidoUsuario, pacient.CC, -- Datos paciente
                            medic.nombreUsuario AS nombreMedico, medic.apellidoUsuario AS apellidoMedico, medic.idEspecialidad, -- Datos mÃ©dico
                            historia.motivo , historia.descripcion_Motivo, -- Consulta
                            historia.presion_Sangre, historia.presion_Sangre_Prom, historia.pulso, historia.saturacion, historia.altura, historia.peso, -- Signos vitales
                            historia.perinatales, historia.patologicos, historia.quirurgicos, historia.vacunas, historia.familiares, -- Antecedentes
                            historia.conclusion
                            FROM CITAS cita
                        JOIN USUARIOS medic ON cita.idDocCC = medic.CC
                        JOIN USUARIOS pacient ON cita.idUsuarioCC = pacient.CC
                            JOIN HISTORIA_MEDICA historia ON cita.idHistoria_Medica = historia.idHistoria_Medica
                            WHERE cita.idUsuarioCC = ? AND cita.idCita = ?
                        `;
        const [rows]: any = await connection.query(query, [userId, appoinmentId]);
        if (rows.length > 0) {
            return { ...rows[0] } as MedicalRecord;
        } else {
            return null;
        }
        return rows;
    } catch (error) {
        console.error("Error generating pdf:", error);
        throw error;
    }
}
/**
 * Gets the information to generate cv
 * @param userId 
 * @param appoinmentId 
 * @returns 
 */
export async function getCVInfo(userId: string) {
    try {
        const query = `SELECT usuario.nombreUsuario, usuario.apellidoUsuario, usuario.CC, hojaVida.fecha_nacimiento, hojaVida.sexo, 
                        hojaVida.telefonoUsuario, usuario.emailUsuario,
                        hojaVida.direccion,
                        hojaVida.contacto_emergencia_nombre, hojaVida.contacto_emergencia_telefono, hojaVida.contacto_emergencia_parentesco,
                        hojaVida.contacto_emergencia_correo, hojaVida.cargo, hojaVida.fechaIngreso, hojaVida.tipoContrato, hojaVida.salarioNeto, hojaVida.cargo
                    FROM USUARIOS usuario JOIN HOJAS_VIDA hojaVida ON hojaVida.idHoja_Vida = usuario.CC
                    WHERE usuario.CC = ?
                        `;
        const [rows]: any = await connection.query(query, [userId]);
        if (rows.length > 0) {
            return { ...rows[0] };
        } else {
            return null;
        }
        return rows;
    } catch (error) {
        console.error("Error generating pdf:", error);
        throw error;
    }
}
/**
 * 
 * @param userId 
 * @param appoinmentId 
 * @returns 
 */
export async function getOrderInfo(orderId: number) {
    try {
        const query = `SELECT usuario.CC, usuario.nombreUsuario, usuario.apellidoUsuario, orden.diagnostico, orden.recomendaciones,
            medico.CC, medico.nombreUsuario, medico.apellidoUsuario, cita.idServicio
            FROM ORDENES_MEDICAS orden 
            JOIN CITAS cita ON cita.idCita = orden.idCita
            JOIN USUARIOS usuario ON usuario.CC = cita.idCita
            JOIN USUARIOS medico ON medico.CC = cita.idDocCC
            WHERE orden.idCita = ?`;
        const [rows]: any = await connection.query(query, [orderId]);
        if (rows.length > 0) {
            return { ...rows[0] };
        } else {
            return null;
        }
        return rows;
    } catch (error) {
        console.error("Error generating pdf:", error);
        throw error;
    }
}
export async function getPayStubInfo(id: number) {
    try {
        const query = `SELECT usuario.CC, usuario.nombreUsuario, usuario.apellidoUsuario, orden.diagnostico, orden.recomendaciones,
            medico.CC, medico.nombreUsuario, medico.apellidoUsuario, cita.idServicio
            FROM ORDENES_MEDICAS orden 
            JOIN CITAS cita ON cita.idCita = orden.idCita
            JOIN USUARIOS usuario ON usuario.CC = cita.idCita
            JOIN USUARIOS medico ON medico.CC = cita.idDocCC
            WHERE orden.idCita = ?`;
        const [rows]: any = await connection.query(query, [id]);
        if (rows.length > 0) {
            return { ...rows[0] };
        } else {
            return null;
        }
        return rows;
    } catch (error) {
        console.error("Error generating pdf:", error);
        throw error;
    }
}

