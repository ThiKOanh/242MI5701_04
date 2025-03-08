import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CosmeticService } from '../SERVICES/cosmetic.service';
import { Cosmetics } from '../Interfaces/Cosmetic';
import { AuthService } from '../SERVICES/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  quantity: number = 1;
  cosmetic: any;
  errMessage: string = '';
  cosmetics: any;
  currentUser: any;
  isLogin: boolean = false;
  categories: any[] | undefined;

  declare window: Window & typeof globalThis;
  constructor(
    private activateRoute: ActivatedRoute,
    private _service: CosmeticService,
    private router: Router,
    private _authService: AuthService
  ) {
    activateRoute.paramMap.subscribe((param) => {
      let cosmeticId = param.get('id');
      if (cosmeticId != null) {
        this.searchCosmetic(cosmeticId);
      }
    });

    this._service.getCosmetics().subscribe({
      next: (data) => {
        // Lấy danh sách các Cosmetics
        this.cosmetics = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this.currentUser = this._authService.getCurrentUser();
  }

  loadData(): void {
    this._service.getCosmetics().subscribe({
      next: (data) => {
        this.cosmetics = data;
        this.categories = this.extractCategories(data);
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  extractCategories(data: any[]): any[] {
    const categories = Array.from(
      new Set(data.map((x: { Category: any }) => x.Category))
    );
    return categories.map((category) => {
      return {
        Category: category,
        SubCategories: Array.from(
          new Set(
            data
              .filter((x: { Category: any }) => x.Category === category)
              .map((x: { SubCategory: any }) => x.SubCategory)
          )
        ),
      };
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/app-category', category])
  }

  searchCosmetic(cosmeticId: string) {
    this._service.getCosmetic(cosmeticId).subscribe({
      next: (data) => {
        this.cosmetic = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Xem thêm chi tiết sản phẩm
  expandDiv: boolean = false;
  showMore() {
    this.expandDiv = true;
  }

  HiddenMore() {
    this.expandDiv = false;
  }

  // Thêm vào giỏ hàng
  addToCart(cos: any): void {
    this.cosmetic.quantity = this.quantity;
    this._service.addToCart(cos).subscribe(
      (response) => {
        console.log(response);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
        window.location.reload();
        // Thêm sản phẩm vào giỏ hàng thành công
      },
      (error) => {
        console.log(error);
        // Xảy ra lỗi khi thêm sản phẩm vào giỏ hàng
      }
    );
  }

  // Add this method to handle subcategory change
  onSubCategoryChange(subCategory: string): void {
    this.router.navigate(['/app-category', this.cosmetic.Category], { queryParams: { subCategory: subCategory } });
  }

  selectCategory(category: string): void {
    this.router.navigate(['/app-category', category])
  }

  addToCartToBuy(cos: any): void {
    this.cosmetic.quantity = this.quantity;
    this._service.addToCart(cos).subscribe(
      response => {
        console.log(response);

        // Set the 'checked' property of the first checkbox element to true
        const checkboxElement = document.querySelector('.shopping__cart-left--detail-row-check input[type="checkbox"]') as HTMLInputElement;
        if (checkboxElement) {
          checkboxElement.checked = true;
        }

        // Navigate to the payment page
        if (this.currentUser != null) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              selectedItems: JSON.stringify([cos])
            }
          };
          this.router.navigate(['app-payment'], navigationExtras);
        } else {
          this.isLogin = true;
        }
      },
      error => {
        console.log(error);
        // Handle error when adding the product to the cart
      }
    );
  }
  viewCosmeticDetail(f: any) {
    this.router.navigate(['app-product-detail', f._id]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }

  addToCartSame(cos: any): void {
    cos.quantity = 1;
    this._service.addToCart(cos).subscribe(
      (response: any) => {
        console.log(response);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
        window.location.reload();
        // Thêm sản phẩm vào giỏ hàng thành công
      },
      (error: any) => {
        console.log(error);
        // Xảy ra lỗi khi thêm sản phẩm vào giỏ hàng
      }
    );
  }

  //popup
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() confirmed = new EventEmitter<boolean>();

  onLogin() {
    this.confirmed.emit(true);
    this.router.navigate(['app-login']);
  }

  onBack() {
    this.confirmed.emit(false);
    this.isLogin = false;
  }
}