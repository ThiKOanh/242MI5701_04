import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminCategoryService } from '../services/admin-category.service';
import { SearchService } from '../services/search.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-caterogy',
  templateUrl: './admin-caterogy.component.html',
  styleUrls: ['./admin-caterogy.component.css']
})
export class AdminCaterogyComponent {
  categories: any[] = [];
  [x: string]: any;
  errMessage: string = '';
  imageUrlCat: any[] = [];
  keyword: string = '';
  resultCount: any;

  constructor(
    public _service: AdminCategoryService, 
    private searchService: SearchService,
    private http: HttpClient,
    private router: Router, 
    private activateRoute: ActivatedRoute
  ) {
    this._service.getCategories().subscribe({
      next: (data) => {
        // Lấy danh sách các Cosmetics
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this.searchService.keyword$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(keyword => this.http.get<any[]>(`http://localhost:3000/searchCategory?keyword=${keyword}`))
      )
      .subscribe(categories => {
        this.categories = categories;
        this.resultCount = categories.length;
      }, error => {
        console.error(error);
      });
  }

  changeCat: string = '';
  tabChange(tab: any) {
    this.changeCat = tab;
    console.log(this.changeCat)
  }

  addCatLevel1() {
    this.router.navigate(['add-category-level-1']);
  }

  editCatLevel1(category: any) {
    this.router.navigate(['edit-category-level1', category._id]);
  }

  deleteCategory(_id: any) {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      this._service.deleteCategory(_id).subscribe({
        next: () => {
          // Reload the page after deleting the category
          location.reload();
        },
        error: (err) => {
          this.errMessage = err;
        }
      });
    }
  }
  
  viewCategoryDetail(category: any) {
    // Assuming you have a route to navigate to category details
    this.router.navigate(['category-detail', category._id]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }
}
