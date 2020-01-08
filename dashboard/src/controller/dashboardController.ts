import request = require('request');
import {BoardData} from "../model/BoardData";


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
                resolve(JSON.parse(body))
            });
        }));
    }

    public constructPath() : string {
        const path =  "https://" + this.queryParams.hostname + "/" +
            this.queryParams.type +"?" +
            "filter[stop]=" + this.queryParams.stop +
            "&" +
            "filter[route_type]=" + this.queryParams.route_type+
            "&" +
            //"filter[min_time]="+ this.queryParams.time +
            // "&" +
            "filter[direction_id]=" + this.queryParams.direction +
            "&" +
            "include=" + this.queryParams.include;
        return path;
    }

    public extractData(response: any) {
        let data = new Array();
        for(let i =0;i< response.data.length ;i++){
            const item = response.data[i];
            let boardData: BoardData = new BoardData();
            if(item.type == "prediction" && item.attributes.departure_time != null){
                if(boardData.carrier = item.relationships.route.data.id.substring(0,2) == "CR"){
                    boardData.carrier = "MBTA";
                }
                boardData.time = item.attributes.departure_time;
                boardData.status = item.attributes.status;
                boardData.destination = item.relationships.route.data.id;
                boardData.track = "TBD";
                if(item.relationships.vehicle.data != null) {
                    if(item.relationships.vehicle.data.id.startsWith("block")){
                        boardData.train = item.relationships.vehicle.data.id.split("_")[1];
                    }else {
                        boardData.train = item.relationships.vehicle.data.id;
                    }
                }
                console.log(boardData);
                data.push(boardData);
            }
        }
        return data;
    }
}
