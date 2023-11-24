import { Order } from "./order.model";
import { PaymentData } from "./payment.model";

export class BuyRequest {
    public order:Order | undefined;
    public paymentData:PaymentData | undefined;
}