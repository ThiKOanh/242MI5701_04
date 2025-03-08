import { Component } from '@angular/core';
import { AdminOrderService } from 'src/app/services/admin-order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { AdminCustomerService } from 'src/app/services/admin-customer.service';

@Component({
  selector: 'app-admin-incomplete-order',
  templateUrl: './admin-incomplete-order.component.html',
  styleUrls: ['./admin-incomplete-order.component.css']
})
export class AdminIncompleteOrderComponent {
  orders: any;
  customer: any;
  errMessage: string = ""
  result: number = 0;
  value: any;
  order = new Order()

  public setOrder(o: Order) {
    this.order = o
  }

  constructor(public _service: AdminOrderService, private _fs: AdminCustomerService, private router: Router) { }
  ngOnInit() {
    this._service.searchUncompletedOrder().subscribe({
      next: (data) => { this.orders = data },
      error: (err) => { this.errMessage = err }
    })
  }

  totalOrder(data: string | any[]) {
    debugger
    this.value = data
    return this.result = data.length
  }

  orderConfirm(_id: any) {
    if (window.confirm('Bạn có chắc muốn xác nhận đơn hàng này?')) {
      this._service.getOrderConfirm(_id).subscribe({
        next: (data) => { location.reload()},
        error: (err) => { this.errMessage = err }
      })
    }
  }

  deleteOrder(_id: any) {
    if (window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      this._service.deleteOrder(_id).subscribe({
        next: (data) => { location.reload()},
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
