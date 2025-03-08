import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cosmetics } from 'src/app/interfaces/cosmetics';
import { AdminCategoryService } from 'src/app/services/admin-category.service';
import { AdminCosmeticService } from 'src/app/services/admin-cosmetic.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  cosmetics: any;
  cosmetic = new Cosmetics();
  categories: any;
  categories_test: any;
  errMessage: string = '';

  constructor(public _service: AdminCosmeticService,
              public _fs: AdminCategoryService,
              private router: Router, 
              private activatedRoute: ActivatedRoute) 
  {
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
        this.categories_test = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  public setCosmetic(f: Cosmetics) {
    this.cosmetic = f;
  }
  
  onFileSelected(event: any, cosmetic: Cosmetics) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cosmetic.Image = reader.result!.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  postCosmetic() {
    //this.cosmetic.Create_date= ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()};
    this._service.postCosmetic(this.cosmetic).subscribe({
      next: (data) => {
        this.cosmetic = data;
        alert('Thêm sản phẩm thành công!');
        this.goBack();
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