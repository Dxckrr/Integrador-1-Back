import { User } from '../interfaces/User';
import connection from "../providers/database";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * Metodo para la creacion de usuarios 
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
 * Function para encryption de la contraseña 
 * @param password 
 * @returns 
 */
export async function encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Comparación de la contraseña que da el user 
 * vs la contraseña guardada en la base de datos
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
 * Metodo selct para obtener el usuario por email
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
 * Metodo select para obtener el usuario por el idUser
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
