// deals.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CosmeticService } from '../SERVICES/cosmetics.service';
import { AuthService } from '../SERVICES/auth.service';
import { SnowfallService } from '../SERVICES/snowfall.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit, OnDestroy {
  cosmetics: any;
  errMessage!: string;
  cartItems: any;
  quantityItem: any;
  display!: boolean;
  currentUser: any;
  center: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private _service: CosmeticService,
    private router: Router,
    private _authService: AuthService,
    private snowfallService: SnowfallService
  ) {

    this._service.getCosmeticCategory('X_Beaurity').subscribe({
      next: (data: any) => {
        this.cosmetics = data;
      },
      error: (err: string) => {
        this.errMessage = err;
      },
    });

    this._service.getCart().subscribe({
      next: (data: any) => {
        this.cartItems = data;
        this.quantityItem = this.cartItems.length;
        if (this.cartItems.length > 0) {
          this.display = false;
        }
      }
    });
    this.currentUser = this._authService.getCurrentUser();
  }

  viewCosmeticDetail(f: any) {
    this.router.navigate(['app-product-detail', f._id]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }

  addToCart(cos: any): void {
    cos.quantity = 1;
    this._service.addToCart(cos).subscribe(
      (response: any) => {
        console.log(response);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.snowfallService.initializeSnowfall();
  }

  ngOnDestroy() {
    this.snowfallService.removeSnowfall();
  }
}
