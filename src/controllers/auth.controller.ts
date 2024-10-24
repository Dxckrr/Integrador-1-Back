import { Request, Response } from "express";
import { createUser, getUserByEmail, getUserById, validatePassword } from '../services/core/user.service';
import jwt from 'jsonwebtoken';
import { User } from "../interfaces/User";
/**
 * Registers a user
 * @param req 
 * @param res 
 */
export const signup = async (req: Request, res: Response) => {
    //Get values from request
    const numberId = req.body.CC;
    const nameUser = req.body.nombreUsuario;
    const lastNameUser = req.body.apellidoUsuario;
    const emailUser = req.body.emailUsuario;
    const pwd = req.body.pwdUsuario;
    const siteUser: number = req.body.idSede ?? null;
    const idRol: number = req.body.idRol;
    const estadoUsuario = req.body.estadoUsuario;
    const idEspecialidad = req.body.idEspecialidad ?? null;
    const idHoja_Vida = req.body.idHoja_Vida ?? null;
    const idTipoPaciente = req.body.idTipoPaciente;


    const user: User = {
        CC: numberId,
        nombreUsuario: nameUser,
        apellidoUsuario: lastNameUser,
        emailUsuario: emailUser,
        pwdUsuario: pwd,
        idSede: siteUser,
        idRol: idRol,
        estadoUsuario: estadoUsuario,
        idEspecialidad: idEspecialidad,
        idHoja_Vida: idHoja_Vida,
        idTipoPaciente: idTipoPaciente
    }

    try {
        const response = await createUser(user);
        if (response) {
            console.log("Response de singup", response);
            res.status(200).header('auth-token', response.token).json({ success: true, message: 'Usuario creado exitosamente.', userCreate: response.userCreate });
        } else {
            res.status(404).json({ success: false, message: 'Error creando usuario.' });
        }
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(404).json({ success: false, message: 'Error creando usuario.' });
    }
};
/**
 * Authenticates a user by checking their email and password, and then logs them in.
 * 
 * @param req email && password
 * @param res
 * @returns if success , users data otherwise throws an error
 */
export const signin = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user: any = await getUserByEmail(email);

        console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: 'El usuario no existe.' });
        }

        const correctPassword: boolean = await validatePassword(password, user?.pwdUsuario || '');

        if (!correctPassword) {
            return res.status(404).json({ success: false, message: 'La contraseña no es correcta.' });
        }
        const token: string = jwt.sign({ _id: user.CC }, process.env.TOKEN_SECRET || ' ', {
            expiresIn: 60 * 60 * 3  //una hora
        });
        res.cookie("token", token);
        return res.status(200).header('auth-token', token).json(user);
    } catch (error) {
        console.error("Error during login: ", error);
        return res.status(404).json({ success: false, message: 'Error interno del servidor.' });
    }
};


/**
 * Gets the user profile from a token
 * @param req jwt id
 * @param res 
 * @returns the user session otherwise throws an error
 */
export const profile = async (req: Request, res: Response) => {
    console.log(req.CC)
    const user: User | null = await getUserById(req.CC);
    if (!user) {
        console.log(user)
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(user);
};

