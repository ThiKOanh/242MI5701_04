import { ViewChild } from '@angular/core';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { AuthService } from '../SERVICES/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../SERVICES/profile.service';
import { Customers, Delivery } from '../Interfaces/Customer';
import { OrdersService } from '../SERVICES/orders.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isLoggedIn = true;
  currentUser: any;
  errMessage: string = '';
  customers: any;
  delivery = new Delivery();

  orders: [] = [];
  cusOrders: any;

  customer = new Customers();
  deliverys: any;

  public setProfile(c: Customers) {
    this.customer = c;
  }

  public setDelivery(d: Delivery) {
    this.delivery = d;
  }

  constructor(
    private authService: AuthService,
    private _orderService: OrdersService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _service: ProfileService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();

    this._orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
    this._orderService.getOrderCustomer(this.currentUser.Name).subscribe({
      next: (data) => {
        this.cusOrders = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }

  viewOrderDetail(orderId: any) {
    this.router.navigate(['/app-order-detail/detail/', orderId]);
  }
  Name: any;
  phonenumber: any;
  Mail: any;
  Address: any;
  Gender: any;
  BOD: any;

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('CurrentUser')!);
    if (user) {
      this._service.getCustomer(user.phonenumber).subscribe({
        next: (data) => {
          this.customer = data;
        },
        error: (err) => {
          this.errMessage = err;
        },
      });
      this._service.getDelivery(user.phonenumber).subscribe({
        next: (data) => {
          this.delivery = data;
        },
        error: (err) => {
          this.errMessage = err;
        },
      });    }
  }

  postDelivery() {
    this._service.postDelivery(this.delivery).subscribe({
      next: (data) => {
        this.delivery = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.adding = false;
    this.addNewAddress = true;
  }
  id: any = 'address';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }

  st: any = 'status--all';
  tabStatus(sts: any) {
    this.st = sts;
    console.log(this.st);
  }

  avatarUrl = 'assets/image/profile/avt.png';

  editing = false;

  edit() {
    this.editing = true;
    this.adding = false;
    this.editingAddress = false;
  }

  putCustomer() {
    this._service.updateCustomer(this.customer).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  saveInfor() {
    this.editing = false;
  }

  onFileSelected(event: any, customer: Customers) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      customer.Image = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  cancelEdit() {
    this.editing = false;
  }

  defaultAddress = 'true';

  nameAddressAdd: string = '';
  phoneAddressAdd = '';
  addressDeliveryAdd: string = '';

  nameAddressNew: string = '';
  phoneAddressNew = '';
  addressDeliveryNew: string = '';

  adding = false;
  addNewAddress = false;

  addAddress() {
    this.nameAddressAdd = ' ';
    this.phoneAddressAdd = ' ';
    this.addressDeliveryAdd = ' ';

    this.adding = true;
    this.editing = false;
    this.editingAddress = false;
  }


  cancelAddress() {
    this.adding = false;
  }
  // edit địa chỉ
  nameAddressEdit: string = ' ';
  phoneAddressEdit = '';
  addressDeliveryEdit: string = '';
  editingAddress = false;

  editAddress() {
    this.editingAddress = true;
    this.adding = false;
    this.editing = false;
  }

  putDelivery() {
    this._service.updateDelivery(this.delivery).subscribe({
      next: (data) => {
        this.deliverys = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.editingAddress = false;
  }

  saveEditAddress() {
    this.delivery.Address = this.deliverys.Address; 
  }
  cancelEditAddress() {
    this.Name = this.Name;
    this.phonenumber = this.phonenumber;
    this.Address = this.Address;
    this.editingAddress = false;
  }
}