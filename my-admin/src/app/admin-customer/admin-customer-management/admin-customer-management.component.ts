import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCustomerService } from 'src/app/services/admin-customer.service';

@Component({
  selector: 'app-admin-customer-management',
  templateUrl: './admin-customer-management.component.html',
  styleUrls: ['./admin-customer-management.component.css']
})
export class AdminCustomerManagementComponent {
  customers:any;
  errMessage:string=""
  page: number = 1;
  count : number = 0 ;
  result: number = 0;
  value: any;

  constructor(public _service: AdminCustomerService, private router: Router){
    this._service.getCustomers().subscribe({
      next:(data)=>{this.customers=data},
      error:(err)=>{this.errMessage=err}
    })
  }

  totalCustomer(data: string | any[]){
    debugger  
  this.value=data    
  return this.result = data.length
}

viewCustomerDetail(f:any){
  this.router.navigate(['admin-customer-detail-management',f._id])
 }
}
