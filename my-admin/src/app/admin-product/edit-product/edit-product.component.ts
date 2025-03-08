import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cosmetics } from 'src/app/interfaces/cosmetics';
import { AdminCosmeticService } from 'src/app/services/admin-cosmetic.service';
import { AdminCategoryService } from 'src/app/services/admin-category.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  cosmetics: any;
  categories: any
  cosmetic = new Cosmetics();
  errMessage: string = '';

  constructor(public _service: AdminCosmeticService,
    public _fs: AdminCategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute) 
    {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchCosmetic(id);
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
    // Lấy danh sách các category trong CategoryData
    this._fs.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  public setCosmetic(f: Cosmetics) {
    this.cosmetic = f;
  }
  searchCosmetic(_id: string) {
    this._service.getCosmetic(_id).subscribe({
      next: (data) => {
        this.cosmetic = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  putCosmetic() {
    this._service.putCosmetic(this.cosmetic).subscribe({
      next: (data) => { this.cosmetic = data },
      error: (err) => { this.errMessage = err }
    }),
    alert("Sửa sản phẩm thành công!")
    this.goBack()
  }

  goBack() {
    this.router.navigate(['product-management']);
  }

  onFileSelected(event: any, cosmetic: Cosmetics) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cosmetic.Image = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
