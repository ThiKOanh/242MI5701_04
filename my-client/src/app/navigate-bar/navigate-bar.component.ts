import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../SERVICES/auth.service';
import { SearchService } from '../SERVICES/search.service';
import { CosmeticService } from '../SERVICES/cosmetic.service';
import { Cosmetics } from '../Interfaces/Cosmetic';

@Component({
  selector: 'app-navigate-bar',
  templateUrl: './navigate-bar.component.html',
  styleUrls: ['./navigate-bar.component.css']
})
export class NavigateBarComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any;
  category: string = '';
  categories: any[] | undefined;
  cosmetics: any;
  cartItems: any[] = [];
  quantityItem: number = 0;
  displayItem: boolean = true;
  errMessage: string = '';
  Name: any;

  isDropdownVisible: boolean = false;

  constructor(
    private searchService: SearchService,
    private _http: HttpClient,
    public _service: CosmeticService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.loadData();

    this._service.getCart().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.quantityItem = this.cartItems.length;
        this.displayItem = this.cartItems.length > 0;
        this.cd.detectChanges();
      }
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('CurrentUser')!);
    if (user) {
      this.Name = user.Name;
    }
  }

  logOut() {
    const confirmed = confirm('Bạn có muốn đăng xuất không?');
    if (confirmed) {
      sessionStorage.removeItem('CurrentUser');
      this.router.navigate(['/']);
      window.location.reload();
    }
  }

  keyword: string = '';

  search() {
    this.searchService.setKeyword(this.keyword);
    this.router.navigate(['/app-search-result']);
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

  selectCategory(category: string): void {
    this.router.navigate(['/app-category', category]);
  }

  isFixed = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isFixed = window.scrollY > 320;
  }
}
