import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Cosmetics } from 'src/app/interfaces/cosmetics';
import { AdminCategoryService } from 'src/app/services/admin-category.service';
import { AdminCosmeticService } from 'src/app/services/admin-cosmetic.service';

@Component({
  selector: 'app-add-caterogy-level-1',
  templateUrl: './add-caterogy-level-1.component.html',
  styleUrls: ['./add-caterogy-level-1.component.css']
})
export class AddCaterogyLevel1Component {

  category = new Category();
  errMessage: string = '';

  constructor(public _service: AdminCategoryService, private router: Router, private activateRoute: ActivatedRoute) { }

  public setCategory(f: Category) {
    this.category = f;
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

  postCategory() {
    this._service.postCategory(this.category).subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    alert("Thêm danh mục thành công")
    this.goBack();
  }

  goBack() {
    this.router.navigate(['admin-category-management']);
  }
}
