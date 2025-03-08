import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCosmeticService } from 'src/app/services/admin-cosmetic.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  cosmetic: any;
  errMessage: string = '';
  constructor(public _service: AdminCosmeticService, private router: Router, private activateRoute: ActivatedRoute) {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchCosmetic(id);
      }
    });
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
  
  goBack() {
    this.router.navigate(['product-management']);
  }
}
