export interface Satisfaction {
  id?: number;                  // Opcional ya que se auto-incrementa
  calificacion: number;         // Star rating (1 a 5)
  nivel_satisfaccion: number;    // Satisfaction level (1 a 5)
  area_a_mejorar?: string;        // Área de mejora, puede ser opcional si no se selecciona
  recomendacion: boolean; //
  comentarios?: string;         // Comentarios adicionales, puede ser opcional
  fecha?: Date;                 // Fecha de la encuesta, opcional ya que puede ser auto-generada por el sistema
}
