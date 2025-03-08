import { Component } from '@angular/core';
import { AdminOrderService } from '../services/admin-order.service';
import { Router } from '@angular/router';
import { AdminCustomerService } from '../services/admin-customer.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent {
  customer: any;
  orders: any;
  errMessage: string = ""
  result: number = 0;
  value: any;

  constructor(public _service: AdminOrderService, private router: Router, private _fs: AdminCustomerService) {
    this._service.getOrders().subscribe({
      next: (data) => { this.orders = data },
      error: (err) => { this.errMessage = err }  
    })
  }

  totalOrder(data: string | any[]) {
    debugger
    this.value = data
    return this.result = data.length
  }

  deleteOrder(_id: string) {
    if (window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      this._service.deleteOrder(_id).subscribe(
        {
          next: (data) => { 
            location.reload(); 
          },
          error: (err) => { this.errMessage = err }
        })
    }
  }

  viewOrderDetail(f: any) {
    this.router.navigate(['admin-order-detail', f._id])
  }

  searchCustomer(CustomerID: any) {
    this._fs.getCustomerDetail(CustomerID).subscribe({
      next: (data) => { this.customer = data },
      error: (err) => { this.errMessage = err }
    })
  }
}
