import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Order } from "../model/order.model";
import { Observable } from "rxjs";
import { BuyRequest } from "../model/buyrequest.model";

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    constructor(private http:HttpClient) {}

    findAll():Observable<Order[]>{
        return this.http.get<Order[]>(`http://localhost:8081/orders`);
    }

    createOrder(request:BuyRequest):Observable<string> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        return  this.http.post<string>(`http://localhost:8081/orders`, 
                JSON.stringify(request), {headers: headers});
    }

}