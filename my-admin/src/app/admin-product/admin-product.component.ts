import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCosmeticService } from '../services/admin-cosmetic.service';
import { PaginatePipe } from 'ngx-pagination';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})

export class AdminProductComponent {
  [x: string]: any;
  cosmetics: any;
  errMessage: string = '';
  constructor(public _service: AdminCosmeticService, private router: Router, private activateRoute: ActivatedRoute) {
    this._service.getCosmetics().subscribe({
      next: (data) => {
        // Lấy danh sách các Cosmetics
        this.cosmetics = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  addCosmetic() {
    this.router.navigate(['add-product']);
  }

  viewDetailCosmetic(f: any) {
    this.router.navigate(['product-detail', f._id]);
  }

  updateCosmetic(f: any) {
    this.router.navigate(['product-detail/edit', f._id]);
  }

  deleteCosmetic(_id: any) {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this._service.deleteCosmetic(_id).subscribe({
        next: () => {
          // Reload the page after deleting the product
          location.reload();
        },
        error: (err) => {
          this.errMessage = err;
        }
      });
    }
  }
}
