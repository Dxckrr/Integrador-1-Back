import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
//import { Services } from "../interfaces/Services";
import { User } from "../interfaces/User";
import { margins } from 'pdfkit/js/page';
//import { Appointment } from '../interfaces/Appointment';
//import { Site } from 'interfaces/Site';

// export async function buildPdf(medic : User, client : User, medicService : Services, infoHistoryMedic : any, site: Site) {
export async function buildPdf() {
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
        num_id: "1001234567",  // Documento de identidad del cliente (mockup)
        gender: "Masculino",  // Género del paciente
        age: 35,  // Edad del paciente (mockup)
        name: "Juan",  // Nombre del cliente
        lastname: "Pérez",  // Apellido del cliente
        birthdate: "1988-04-15",  // Fecha de nacimiento formateada
        disability: "Ninguna",  // Información de discapacidad
        name_medic: "María",  // Nombre del médico
        lastname_medic: "González",  // Apellido del médico
        fecha_rev: "2024-09-09",  // Fecha de revisión formateada
        hora_rev: "10:30",  // Hora de la revisión
        nameService: "Consulta General",  // Nombre del servicio médico
        siteName: "Clínica Salud Total",  // Nombre del lugar donde se realiza el servicio
        motive: "Chequeo anual",  // Motivo de la consulta
        descrip_motive: "Revisión de rutina y control de peso",  // Descripción del motivo de la consulta
        blood_presure: "120/80",  // Presión arterial del paciente
        normal_blood_presure: "120/80",  // Presión arterial considerada normal
        pulse: 72,  // Pulso del paciente
        saturation: 98,  // Saturación de oxígeno del paciente
        height: 175,  // Altura del paciente (cm)
        weight: 75,  // Peso del paciente (kg)
        perinatales: "Sin complicaciones",  // Historial perinatal
        patologicos: "Ninguno",  // Historial de enfermedades patológicas
        quirurgicos: "Apendicectomía",  // Intervenciones quirúrgicas previas
        vacunas: "COVID-19, Influenza",  // Vacunas recibidas
        familiares: "Hipertensión en la familia",  // Historial familiar
        conclusion: "Paciente en buenas condiciones generales",  // Conclusión del médico
    }
    
    const htmlPath = path.join(__dirname, 'mocks', 'HistoryClinic.html');
    
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