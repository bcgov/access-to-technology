//// Controller is going to call the service
//// 3. Clean this up. Pass the data object itself.
import * as express from "express";
import * as viewService from '../services/view.service'

export const getAllProviders = async (req: express.Request, res: express.Response) => {
    try {
        const response = await viewService.getAllProviderIntakes()
        // Response is a message ID string.
        //console.log('Successfully sent message:', response);
        console.log("RESPONSE: ", response)
        return res.status(200).send(response);
    } catch (e: any) {
        console.log("catching")
        let statusCode: number = e.message;
        //console.log('Error sending message:', error);
        console.log("ERROR")
        console.log(e)
        if (statusCode === 400) {
            console.log("Bad Request");
            return res.status(400).send(e.errorInfo)
        }
        if (statusCode == 401) {
            console.log("Authentication Error");
            return res.status(401).send();
        }
        else {
            console.log(e);
            return res.status(500).send("Internal Server Error");
        }
    }
};