export interface User {
    CC: string;
    nombreUsuario: string,
    apellidoUsuario: string,
    emailUsuario: string,
    pwdUsuario: string,
    idSede?: number,
    idRol: number,
    estadoUsuario?: boolean,
    idEspecialidad?: number,
    idHoja_Vida?: number,
    idTipoPaciente?: number
}