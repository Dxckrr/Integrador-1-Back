export interface Appointment {
    idCita: number,
    dia: Date,
    hora: string,
    estadoCita: boolean,
    idServicio: number,
    idHistoria_Medica: number,
    idUsuarioCC: string,
    idDocCC: string
}