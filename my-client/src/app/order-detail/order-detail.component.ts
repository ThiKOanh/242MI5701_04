import { Component } from '@angular/core';
import { OrdersService } from '../SERVICES/orders.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  order: any;
  price: number = 0;
  total: number = 0;
  errMessage: string = "";

  constructor(
    private _orderService: OrdersService,
    private router: Router,
    private activateRoute: ActivatedRoute)
    {
      activateRoute.paramMap.subscribe(
        (param) => {
          let id = param.get('id');
          if (id != null) {
            this.searchOrder(id);
        }
      });
    }

  searchOrder(_id: string) {
    this._orderService.getOrder(_id).subscribe({
      next: (data) => {
        this.order = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  //tìm thành tiền cho từng sản phẩm
  findSum(item: any) {
    this.price = parseFloat(item.Price.replace(".", ""));
    this.total = this.price * item.quantity;
    return this.total.toLocaleString("vi-VN", { minimumFractionDigits: 0 });
  }

  gotoHome() {
    this.router.navigate(['/app-home']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}


