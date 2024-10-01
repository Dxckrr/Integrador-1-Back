import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
//import { Services } from "../interfaces/Services";
import { User, MedicalRecord } from "../interfaces/User";
import { margins } from 'pdfkit/js/page';
//import { Appointment } from '../interfaces/Appointment';
//import { Site } from 'interfaces/Site';

export async function buildHistoryClinicPdf(infoHistoryMedic : MedicalRecord) {
    const age = 35;
    const patientData={
        //Datos paciente
        num_id : infoHistoryMedic.CC,
        gender : "M", //infoHistoryMedic.gender,
        age : age,
        name : infoHistoryMedic.nombreUsuario,
        lastname : infoHistoryMedic.apellidoUsuario,
        birthdate : "01/03/2005", //formatDate(infoHistoryMedic.fecha_Nac),
        disability : "No", //infoHistoryMedic.disability,
        //Consulta
        name_medic : infoHistoryMedic.nombreMedico,
        lastname_medic : infoHistoryMedic.apellidoMedico,
        fecha_rev : formatDate(infoHistoryMedic.fecha_Rev),
        hora_rev : infoHistoryMedic.hora_Rev,
        nameService : infoHistoryMedic.idEspecialidad,
        siteName : "cra 544,4 23",
        motive : infoHistoryMedic.motivo,
        descrip_motive : infoHistoryMedic.descripcion_Motivo,
        //Signos vitales
        blood_presure : infoHistoryMedic.presion_Sangre,
        normal_blood_presure : infoHistoryMedic.presion_Sangre_Prom,
        pulse : infoHistoryMedic.pulso,
        saturation : infoHistoryMedic.saturacion,
        height : infoHistoryMedic.altura,
        weight : infoHistoryMedic.peso,
        //Antecedentes
        perinatales : infoHistoryMedic.perinatales,
        patologicos : infoHistoryMedic.patologicos,
        //medicamentos : infoHistoryMedic.medicamentos,
        quirurgicos : infoHistoryMedic.quirurgicos,
        vacunas : infoHistoryMedic.vacunas,
        familiares : infoHistoryMedic.familiares,
        //Resumen
        conclusion : infoHistoryMedic.conclusion,
    }

    const htmlPath = path.join(__dirname, 'mocks', 'HistoryClinic.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);

    const pdf = await generatePdf(htmlContent);
    
    return pdf;
}
export async function buildCVPdf(userData : any) {
    //const age = calcularEdad(userData.fecha_nacimiento);
    const patientData={
        // //Informacion personal
        // cc : userData.CC,
        // sex : userData.sexo,
        // age : age,
        // name : userData.nombreUsuario,
        // last_name : userData.apellidoUsuario,
        // date : formatDate(userData.fecha_nacimiento),
        // //Informacion de contacto
        // number_phone : userData.telefonoUsuario,
        // correo : userData.emailUsuario,
        // //Direccion de residencia
        // direc : userData.direccion,
        // //Datos contacto emergencia
        // name_complete : userData.contacto_emergencia_nombre,
        // parente : userData.contacto_emergencia_parentesco,
        
    }

    const htmlPath = path.join(__dirname, 'mocks', 'PacientCV.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);

    const pdf = await generatePdf(htmlContent);
    
    return pdf;
}
export async function buildOrderdf(userData : any) {
    //const age = calcularEdad(userData.fecha_nacimiento);
    const patientData={
        // //Informacion personal
        // cc : userData.CC,
        // sex : userData.sexo,
        // age : age,
        // name : userData.nombreUsuario,
        // last_name : userData.apellidoUsuario,
        // date : formatDate(userData.fecha_nacimiento),
        // //Informacion de contacto
        // number_phone : userData.telefonoUsuario,
        // correo : userData.emailUsuario,
        // //Direccion de residencia
        // direc : userData.direccion,
        // //Datos contacto emergencia
        // name_complete : userData.contacto_emergencia_nombre,
        // parente : userData.contacto_emergencia_parentesco,
        
    }

    const htmlPath = path.join(__dirname, 'mocks', 'MedicOrder.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);

    const pdf = await generatePdf(htmlContent);
    
    return pdf;
}
export async function buildPayStubpdf(userData : any) {
    //const age = calcularEdad(userData.fecha_nacimiento);
    const patientData={
        
    }
    const htmlPath = path.join(__dirname, 'mocks', 'PayStub.html');
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
    
    // const footerPath = path.join(__dirname, 'mocks','HCFooter.html');
    // const footerTemplate = fs.readFileSync(footerPath, 'utf8');

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
        //footerTemplate: footerTemplate,
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