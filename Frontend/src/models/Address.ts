import { Clients } from "./Client";

export interface Address{
    address_id : number;
    country : string;
    county : string;
    city : string;
    additional_info : string;
    clientList:Clients[];
}