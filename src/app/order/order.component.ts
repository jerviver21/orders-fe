import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { KeycloakService } from 'keycloak-angular';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BuyRequest } from '../model/buyrequest.model';
import { Order } from '../model/order.model';
import { PaymentData } from '../model/payment.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl:'./order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  form:UntypedFormGroup | undefined;

  constructor(private service:OrderService, private keycloak: KeycloakService) {

  }

  ngOnInit() {
    console.log("initializing component!!!");

    this.form = new UntypedFormGroup({
      'totalPrice': new UntypedFormControl(null),
      'description': new UntypedFormControl(null),
      'ccv': new UntypedFormControl(null),
      'cardNumber': new UntypedFormControl(null),
      'expirationDate': new UntypedFormControl(null)
    });

    this.service.findAll().subscribe(elements => {
      //console.log(elements);
    }, error => {
      //console.log(error);
    });
  }

  onSubmit() {
    let request:BuyRequest = new BuyRequest();
    request.order = new Order();
    request.paymentData = new PaymentData();

    request.order.description = this.form?.value.description;
    request.order.totalPrice = this.form?.value.totalPrice;
    request.paymentData.cardNumber = this.form?.value.cardNumber;
    request.paymentData.expDate = this.form?.value.expirationDate;
    request.paymentData.ccv = this.form?.value.ccv;

    this.service.createOrder(request).subscribe(response => {
      console.log(response);
    });

  }
  
}

