import { Component, OnInit } from '@angular/core';
import { SearchService } from '../SERVICES/search.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CosmeticService } from '../SERVICES/cosmetic.service';
import { CategoryService } from '../SERVICES/category.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  cosmetics: any[] = [];
  resultCount: any;
  errMessage: string = '';
  categories: any[] | undefined;

  constructor(
    private searchService: SearchService,
    private http: HttpClient,
    public _service: CosmeticService,
    public _fs: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadSearchResults();
  }

  loadSearchResults(): void {
    this.searchService.keyword$.subscribe(keyword => {
      if (keyword) {
        this.http.get<any[]>(`http://localhost:3000/search?keyword=${keyword}`).subscribe(cosmetics => {
          this.cosmetics = cosmetics;
          this.resultCount = cosmetics.length;
        }, error => {
          console.error(error);
        });
      }
    });
  }

  loadData(): void {
    this._service.getCosmetics().subscribe({
      next: (data) => {
        this.cosmetics = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this._fs.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  viewCosmeticDetail(cosmetic: any) {
    this.router.navigate(['app-product-detail', cosmetic._id]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }

  addToCart(cos: any): void {
    cos.quantity = 1;
    this._service.addToCart(cos).subscribe(
      (response: any) => {
        
        alert('Thêm sản phẩm vào giỏ hàng thành công');console.log(response);
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
        // Handle the error if needed
      }
    );
  }
}