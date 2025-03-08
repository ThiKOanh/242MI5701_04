import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CosmeticService } from '../SERVICES/cosmetic.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  [x: string]: any;
  category: string = '';
  categories: any[] | undefined;
  cosmetics: any;
  cartItems: any[] = [];
  quantityItem: number = 0;
  displayItem: boolean = true;
  errMessage: string = '';
  Name: any;

  constructor(
    public _service: CosmeticService,
    private router: Router,
    private activateRoute: ActivatedRoute  ) {
    this.loadData();
  }
  navigateToCategory(category: string): void {
    this.router.navigate(['/app-category', category]).then(() => {
      this.scrollToTop();
    });
  }
  navigateToHome() {
    this.router.navigate(['/']).then(() => {
      const chungnhanAnToanSection = document.getElementById('chungnhanAnToan');
      if (chungnhanAnToanSection) {
        chungnhanAnToanSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    });
  }

  ngAfterViewInit(): void {
    this.activateRoute.fragment.subscribe(fragment => {
      if (fragment === 'top') {
        this.scrollToTop();
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.router.navigate(['/app-category', category]).then(() => {
      this.scrollToTop();
    });
  }
  isFixed = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isFixed = window.scrollY > 320;
  }
}
