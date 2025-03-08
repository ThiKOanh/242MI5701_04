import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { AdminCustomerService } from 'src/app/services/admin-customer.service';
import { AdminOrderService } from 'src/app/services/admin-order.service';

@Component({
  selector: 'app-admin-customer-detail-management',
  templateUrl: './admin-customer-detail-management.component.html',
  styleUrls: ['./admin-customer-detail-management.component.css']
})
export class AdminCustomerDetailManagementComponent {
  customer = new Customer();
  cusOrders: any[] = []
  errMessage:string=""

  constructor(private activateRoute:ActivatedRoute,
    private _fs:AdminCustomerService, 
    private router:Router,
    public _orderService:AdminOrderService)
    {
    activateRoute.paramMap.subscribe(
      (param)=>{
        let id=param.get('id')
        if(id!=null)
        {
          this.searchCustomer(id)
        }
      });
    }

  public setCustomer(f: Customer) {
    this.customer = f;
  }

  searchCustomer(_id: string) {
    this._fs.getCustomerDetail(_id).subscribe({
      next: (data) => {
        this.customer = data;
        // After loading the customer, automatically fetch orders
        if (this.customer && this.customer.CustomerName) {
          this.searchCustomerOrder(this.customer.CustomerName);
        }
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }

  searchCustomerOrder(name:string){
    this._orderService.getOrderCustomer(name).subscribe({
      next:(data)=>{this.cusOrders=data},
      error:(err)=>{this.errMessage=err}
    })
  }  

  goBack(){
    this.router.navigate(['admin-custoner-management'])
  }
  
  viewOrderDetail(f: any) {
    this.router.navigate(['admin-order-detail', f._id])
  }
}
