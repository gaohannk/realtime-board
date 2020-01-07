import request = require('request');

export class DashboardController{

    public queryParams: any;

    constructor(queryParams) {
        this.queryParams = queryParams;
    }

    public async callMBTA(path: string) {
        return new Promise( ((resolve, reject) => {
            request(path, (error, res, body) => {
                if(error) {
                    reject(error);
                }
                console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
                resolve(body)
            });
        }));
    }

    public constructPath() : string {
        const path =  "https://" + this.queryParams.hostname + "/" +
            this.queryParams.type +"?" +
            "filter[stop]=" + this.queryParams.stop +
            "&" +
            "filter[min_time]="+ this.queryParams.time;
        return path;
    }

    extractData(response: Promise<unknown>) {
        response
    }
}
