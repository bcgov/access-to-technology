///// 1. change this view.service to GET getProviderIntakeAll
///// 2. Function inside the try and catch block: function being called from getProviderIntakeAll in mongo.js
import * as express from "express";
export const router = express.Router();

import { getProviderIntakeAll } from "../db/mongo"

export const sendMessage = async (token: string, content: string, title: string, dryRun: boolean): Promise<any> => {
    try {
        
        const message = {
            notification: {
                body: content,
                title: title
            },
            token: token
        }
        // Send a message to the device corresponding to the provided
        // registration token.
        //console.log(resp)
        //return resp
        
     
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

export const getAllProviderIntakes = async (): Promise<any> => {
    try {
        const data = await getProviderIntakeAll();
        console.log('**** data: ', data);
        return data;
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}


