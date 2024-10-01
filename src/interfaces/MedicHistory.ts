export interface MedicHistory {
    idHistoria_Medica: number;
    tipoSangre: string;
    genero: string;
    fecha_Nac: Date;
    discapacidad?: string; // Puede ser opcional
    fecha_Rev: Date;
    hora_Rev: string;
    motivo: string;
    descripcion_Motivo?: string; // Puede ser opcional
    presion_Sangre?: string; // Puede ser opcional
    presion_Sangre_Prom?: string; // Puede ser opcional
    pulso?: string; // Puede ser opcional
    saturacion?: string; // Puede ser opcional
    altura?: number; // Puede ser opcional
    peso?: number; // Puede ser opcional
    perinatales?: string; // Puede ser opcional
    patologicos?: string; // Puede ser opcional
    quirurgicos?: string; // Puede ser opcional
    vacunas?: string; // Puede ser opcional
    familiares?: string; // Puede ser opcional
    conclusion?: string; // Puede ser opcional
  }
  