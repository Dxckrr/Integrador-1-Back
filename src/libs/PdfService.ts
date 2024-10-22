import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
//import { Services } from "../interfaces/Services";
import { User, MedicalRecord } from "../interfaces/User";
import { margins } from 'pdfkit/js/page';
//import { Appointment } from '../interfaces/Appointment';
//import { Site } from 'interfaces/Site';

export async function buildHistoryClinicPdf(infoHistoryMedic: any) {
    const patientData = {};
    if (infoHistoryMedic) {
        const age = calcularEdad(infoHistoryMedic.fecha_Nac);
        const patientData = {
            // Datos paciente
            num_id: infoHistoryMedic.CC || '',
            gender: infoHistoryMedic.gender || '',
            age: age || '',
            name: infoHistoryMedic.nombreUsuario || '',
            lastname: infoHistoryMedic.apellidoUsuario || '',
            birthdate: infoHistoryMedic.fecha_Nac ? formatDate(infoHistoryMedic.fecha_Nac) : '',
            disability: infoHistoryMedic.disability || 'No',

            // Consulta
            name_medic: infoHistoryMedic.nombreMedico || '',
            lastname_medic: infoHistoryMedic.apellidoMedico || '',
            fecha_rev: infoHistoryMedic.fecha_Rev ? formatDate(infoHistoryMedic.fecha_Rev) : '',
            hora_rev: infoHistoryMedic.hora_Rev || '',
            nameService: infoHistoryMedic.idEspecialidad || '',
            siteName: "Sanavit",  // Valor predeterminado ya proporcionado
            motive: infoHistoryMedic.motivo || '',
            descrip_motive: infoHistoryMedic.descripcion_Motivo || '',

            // Signos vitales
            blood_presure: infoHistoryMedic.presion_Sangre || '',
            normal_blood_presure: infoHistoryMedic.presion_Sangre_Prom || '',
            pulse: infoHistoryMedic.pulso || '',
            saturation: infoHistoryMedic.saturacion || '',
            height: infoHistoryMedic.altura || '',
            weight: infoHistoryMedic.peso || '',

            // Antecedentes
            perinatales: infoHistoryMedic.perinatales || 'Ninguno',
            patologicos: infoHistoryMedic.patologicos || 'Ninguno',
            quirurgicos: infoHistoryMedic.quirurgicos || 'Ninguno',
            alergias: infoHistoryMedic.alergias || 'Ninguna',
            vacunas: infoHistoryMedic.vacunas || '',
            familiares: infoHistoryMedic.familiares || 'Ninguno',

            // Resumen
            conclusion: infoHistoryMedic.conclusion || ''
        }
    }

    const htmlPath = path.join(__dirname, 'mocks', 'HistoryClinic.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);

    const pdf = await generatePdf(htmlContent);

    return pdf;
}
/**
 * Generates the pdf to pacient's CV
 * @param userData 
 * @returns 
 */
export async function buildCVUserPdf(userData: any) {
    const patientData = {}
    if (userData) {
        const patientData = {
            // Información personal
            cc: userData.CC || '',
            sex: userData.sexo || '',
            ame: userData.nombreUsuario || '',
            last_name: userData.apellidoUsuario || '',
            date: formatDate(userData.fecha_nacimiento) || '',
            // Información Administrativa
            salario: userData.salarioNeto || '',
            cargo: userData.cargo || '',
            // Información de contacto
            number_phone: userData.telefonoUsuario || '',
            correo: userData.emailUsuario || '',
            // Dirección de residencia
            direc: userData.direccion || '',
            // Datos de contacto de emergencia
            name_complete: userData.contacto_emergencia_nombre || '',
            parente: userData.contacto_emergencia_parentesco || '',
            telefono: userData.contacto_emergencia_telefono || ''
        }
    }
    const htmlPath = path.join(__dirname, 'mocks', 'PacientCV.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);
    const pdf = await generatePdf(htmlContent);
    return pdf;
}

/**
 * Generates the pdf to the employee's CV
 * @param userData 
 * @returns 
 */
export async function buildCVEmployeePdf(userData: any) {
    const patientData = {}
    if (userData) {
        const age = calcularEdad(userData.fecha_nacimiento);
        const patientData = {
            // Información personal
            cc: userData.CC || '',
            sex: userData.sexo || '',
            name: userData.nombreUsuario || '',
            last_name: userData.apellidoUsuario || '',
            date: userData.fecha_nacimiento ? formatDate(userData.fecha_nacimiento) : '',

            // Información de contacto
            number_phone: userData.telefonoUsuario || '',
            correo: userData.emailUsuario || '',

            // Dirección de residencia
            direc: userData.direccion || '',

            // Datos contacto emergencia
            name_complete: userData.contacto_emergencia_nombre || '',
            parente: userData.contacto_emergencia_parentesco || '',
            telefono: userData.contacto_emergencia_telefono || ''
        }
    }
    const htmlPath = path.join(__dirname, 'mocks', 'EmployeeCV.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);
    const pdf = await generatePdf(htmlContent);
    return pdf;
}
export async function buildOrderdf(userData: any) {
    const patientData = {}
    if (userData){
        const age = calcularEdad(userData.fecha_nacimiento);
        const patientData = {
            // //Informacion personal
            cc: userData.CC,
            age: userData.fecha_Nac,
            name: userData.nombreUsuario,
            last_name: userData.apellidoUsuario,
            date: formatDate(userData.fecha_nacimiento),
            // // Diagnostico paciente
            diagnostico: userData.diagnostico,
            // // Recomendaciones
            recomendaciones: userData.recomendaciones,
            // info especialista
            especialista: userData.nombre_especialista,
            especialidad: userData.firm,
            cc_especialista: userData.cc,
        }
    }
    const htmlPath = path.join(__dirname, 'mocks', 'MedicOrder.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);
    const pdf = await generatePdf(htmlContent);
    return pdf;
}
export async function buildPayStubpdf(userData: any) {
    const patientData = {};
    if (userData){
        const age = calcularEdad(userData.fecha_nacimiento);
        const patientData = {
            name: userData.nombreUsuario || '',
            last_name: userData.apellidoUsuario || '',
            cc: userData.CC || '',
            date: userData.fecha_cita || '',
            hora: userData.hora_cita || '',
            description: userData.descripcion || '',
            especiality: userData.especialidad || '',
            num_cantidad: userData.cantidad || '',
            num_precio_u: userData.precio_unitario || '',
            num_total: userData.total || '',
            num_sub_ttl: userData.subtotal || '',
            num_impst: userData.impuesto || '',
            num_ttl: userData.total_pagar || '',
            banca: userData.bancoA || '',
            bancb: userData.bancoB || '',
            bancc: userData.bancoC || '',
            date_limit: userData.fecha_limite || '',
        }
    }
    const htmlPath = path.join(__dirname, 'mocks', 'PayStub.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);
    const pdf = await generatePdf(htmlContent);
    return pdf;
}
export async function buildBillPdf(userData: any) {
    const patientData = {};
    if (userData){
        const age = calcularEdad(userData.fecha_nacimiento);
        const patientData = {
            // name: userData.nombreUsuario || '',
            // last_name: userData.apellidoUsuario || '',
            
        }
    }
    const htmlPath = path.join(__dirname, 'mocks', 'Bill.html');
    const htmlContent = await replacePlaceholders(htmlPath, patientData);
    const pdf = await generatePdf(htmlContent);
    return pdf;
}

function calcularEdad(fechaNacimiento: string) {
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


async function generatePdf(htmlContent: any) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    const fs = require('fs');
    const path = require('path');
    // Lee el archivo HTML del pie de página

    // const footerPath = path.join(__dirname, 'mocks','HCFooter.html');
    // const footerTemplate = fs.readFileSync(footerPath, 'utf8');

    const pdfOptions: any = {
        path: 'hc.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '30px',
            bottom: '100px',
            left: '10px',
            right: '0px'
        },
        //displayHeaderFooter: true,
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