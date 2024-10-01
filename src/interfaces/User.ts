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

export interface MedicalRecord {
    //Datos paciente
    CC: string,
    //sexo: string,
    nombreUsuario: string,
    apellidoUsuario: string,
    //fechaNacimiento: string,
    //discapacidades?: string,
    //Consulta
    nombreMedico: string,
    apellidoMedico: string,
    idEspecialidad: string,
    fecha_Rev: Date,
    hora_Rev: string,
    motivo: string,
    descripcion_Motivo: string,
    //Signos vitales
    presion_Sangre?: string;
    presion_Sangre_Prom?: string;
    pulso?: string;
    saturacion?: string;
    altura?: number;
    peso?: number;
    //Antecentes
    perinatales?: string;
    patologicos?: string;
    quirurgicos?: string;
    //alergias?: string;
    vacunas?: string;
    familiares?: string;
    //Resumen
    conclusion: string;
}