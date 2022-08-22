
import axios from "axios";

const BOOKING_REQUEST_QUEUE_ENDPOINT = process.env.REACT_APP_BOOKING_REQUEST_QUEUE_ENDPOINT

const sendRequest = async (service, params) => {
    
    const paramsString = {}
    for (let param in params) {
        if( (typeof param) !== "object" ){
            paramsString[param] = `${params[param]}`
        }else{
            paramsString[param] = JSON.stringify(params[param])
        } 
    }

    const body = {
        "messages": [
        ]
    }
    const message = {
        data: "",
        attributes: {
            service: service,
            ...paramsString
        }
    }
    console.log("MESSAGE", message)
    body.messages.push(message)

    return await axios.post(BOOKING_REQUEST_QUEUE_ENDPOINT, body)
}


export const BookingRequests = {
    sendRequest
};