import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
//import { Services } from "../interfaces/Services";
import { User } from "../interfaces/User";
import { margins } from 'pdfkit/js/page';
//import { Appointment } from '../interfaces/Appointment';
//import { Site } from 'interfaces/Site';

export async function buildPdf(medic : User, client : User, infoHistoryMedic : any) {
//export async function buildPdf() {
    const age = 35;
    const patientData={
        // num_id : client.CC,
        // //gender : infoHistoryMedic.gender,
        // age : age,
        // name : client.nombreUsuario,
        // lastname : client.apellidoUsuario,
        // birthdate : formatDate(infoHistoryMedic.fecha_Nac),
        // //disability : infoHistoryMedic.disability,
        // //name_medic : medic.nombreUsuario,
        // //lastname_medic : medic.apellidoUsuario,
        // fecha_rev : formatDate(infoHistoryMedic.fecha_Rev),
        // //hora_rev : infoHistoryMedic.hora_Rev,
        // //nameService : medicService.nameService,
        // //siteName : site.nameSite,
        // motive : infoHistoryMedic.motive,
        // descrip_motive : infoHistoryMedic.descrip_motive,
        // blood_presure : infoHistoryMedic.blood_presure,
        // normal_blood_presure : infoHistoryMedic.normal_blood_presure,
        // pulse : infoHistoryMedic.pulse,
        // saturation : infoHistoryMedic.saturation,
        // height : infoHistoryMedic.height,
        // weight : infoHistoryMedic.weight,
        // perinatales : infoHistoryMedic.perinatales,
        // patologicos : infoHistoryMedic.patologicos,
        // quirurgicos : infoHistoryMedic.quirurgicos,
        // vacunas : infoHistoryMedic.vacunas,
        // familiares : infoHistoryMedic.familiares,
        // conclusion : infoHistoryMedic.conclusion,
        "num_id": "2009876543",  // Documento de identidad del cliente (mockup)
        "gender": "Femenino",  // Género del paciente
        "age": 28,  // Edad del paciente (mockup)
        "name": "Ana",  // Nombre del cliente
        "lastname": "Martínez",  // Apellido del cliente
        "birthdate": "1996-06-22",  // Fecha de nacimiento formateada
        "disability": "Ninguna",  // Información de discapacidad
        "name_medic": "Carlos",  // Nombre del médico
        "lastname_medic": "Rodríguez",  // Apellido del médico
        "fecha_rev": "2024-09-15",  // Fecha de revisión formateada
        "hora_rev": "14:00",  // Hora de la revisión
        "nameService": "Examen de Laboratorio",  // Nombre del servicio médico
        "siteName": "Hospital Vida Saludable",  // Nombre del lugar donde se realiza el servicio
        "motive": "Chequeo general",  // Motivo de la consulta
        "descrip_motive": "Análisis rutinario de salud y estudios de laboratorio",  // Descripción del motivo de la consulta
        "blood_presure": "115/75",  // Presión arterial del paciente
        "normal_blood_presure": "120/80",  // Presión arterial considerada normal
        "pulse": 68,  // Pulso del paciente
        "saturation": 99,  // Saturación de oxígeno del paciente
        "height": 160,  // Altura del paciente (cm)
        "weight": 60,  // Peso del paciente (kg)
        "perinatales": "Sin complicaciones",  // Historial perinatal
        "patologicos": "Sin antecedentes",  // Historial de enfermedades patológicas
        "quirurgicos": "Cesárea",  // Intervenciones quirúrgicas previas
        "vacunas": "Hepatitis B, Tétanos",  // Vacunas recibidas
        "familiares": "Diabetes en la familia",  // Historial familiar
        "conclusion": "Paciente en estado saludable con resultados normales en pruebas"  // Conclusión del médico
    }
    
    //const htmlPath = path.join(__dirname, 'mocks', 'HistoryClinic.html');
    const htmlPath = path.join(__dirname, 'mocks', 'hojaVidaPaciente.html');

    const htmlContent = await replacePlaceholders(htmlPath, patientData);

    
    const pdf = await generatePdf(htmlContent);
    
    return pdf;
}

function calcularEdad(fechaNacimiento : string) {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mesActual = fechaActual.getMonth();
    const mesNacimiento = fechaNac.getMonth();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNac.getDate())) {
        edad--;
    }
    
    return edad;
}


async function replacePlaceholders(htmlPath: any, patientData: any) {
    let htmlContent = await fs.readFile(htmlPath, 'utf-8');
    
    Object.keys(patientData).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        htmlContent = htmlContent.replace(regex, patientData[key]);
    });
    
    return htmlContent;
}


async function generatePdf(htmlContent : any) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(htmlContent);
    
    const fs = require('fs');
    const path = require('path');
    // Lee el archivo HTML del pie de página
    const footerPath = path.join(__dirname, 'mocks','HCFooter.html');
    const footerTemplate = fs.readFileSync(footerPath, 'utf8');

    const pdfOptions:any = {
        path: 'hc.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '30px',
            bottom: '100px',
            left: '10px',
            right: '0px'
        },
        displayHeaderFooter: true,
        footerTemplate: footerTemplate,
        preferCSSPageSize: true,
    };
    const pdf = await page.pdf(pdfOptions);

    await browser.close();
    return pdf;
}

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}