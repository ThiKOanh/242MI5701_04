import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Cosmetics } from 'src/app/interfaces/cosmetics';
import { AdminCategoryService } from 'src/app/services/admin-category.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-edit-category-level-1',
  templateUrl: './edit-category-level-1.component.html',
  styleUrls: ['./edit-category-level-1.component.css']
})
export class EditCategoryLevel1Component {
  category = new Category();
  errMessage: string = '';
  categories: any;

  constructor(private _service: AdminCategoryService, private router: Router, private activateRoute: ActivatedRoute) {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchCategory(id);
      }
    });
  }

  public setCategory(category: Category) {
    this.category = category;
  }
  
  onFileSelected(event: any, category: Category) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      category.Image = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  searchCategory(_id: string) {
    this._service.getCategory(_id).subscribe({
      next: (data) => {
        console.log('Category Data:', data);
        this.category = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  putCategory() {
    this._service.putCategory(this.category).subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    alert("Sửa danh mục thành công!");
    this.goBack();
  }

  goBack() {
    this.router.navigate(['admin-category-management']);
  }
}
