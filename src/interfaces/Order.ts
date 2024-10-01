export interface OrdenMedica {
  idOrden_Medica?: number;
  idCita: number;
  estadoOM: number;
  fecha?: Date; 
  diagnostico: string;
  ordenes: string;
  recomendaciones: string;
}
