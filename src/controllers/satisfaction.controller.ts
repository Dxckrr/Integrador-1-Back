import { Request, Response } from 'express';
import { getAllSurveysData, registerSurveyData } from '../services/satisfaction.service';

/**
 * Creates a new appointment
 * @param req appointment data needed
 * @param res 
 */
export const registerSatisfactionData = async (req: Request, res: Response) => {
    try {
        const newSurveyResponse = await registerSurveyData(req.body);
        return res.status(201).json(newSurveyResponse);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
/**
 * Gets all data from satisfaction surveys 
 * @param req
 * @param res 
 */
export const getAllData = async (req: Request, res: Response) => {
    try {
        const surveys = await getAllSurveysData();
        return res.status(200).json(surveys);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};