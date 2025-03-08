import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CosmeticService } from '../SERVICES/cosmetic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  category: string = '';
  categories: any[] | undefined;
  cosmetics: any[] | undefined;
  quantity: number = 1;
  randomFeaturedCosmetics: any[] | undefined;
  cosmeticCategory: any;
  cosmetic: any;
  errMessage: string = '';
  displayProduct: boolean = true;

  constructor(public _service: CosmeticService, private router: Router, private activateRoute: ActivatedRoute) { }

  viewCosmeticDetail(f: any) {
    this.router.navigate(['app-product-detail', f._id]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }

  addToCart(cos: any): void {
    cos.quantity = 1;
    this._service.addToCart(cos).subscribe(
      (response: any) => {
        console.log(response);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
        window.location.reload();
        // Thêm sản phẩm vào giỏ hàng thành công
      },
      (error: any) => {
        console.log(error);
        // Xảy ra lỗi khi thêm sản phẩm vào giỏ hàng
      }
    );
  }

  ngOnInit(): void {
    const numRandomCosmetics = 5; // Số lượng sản phẩm ngẫu nhiên cần hiển thị
    this._service.getCosmetics().subscribe({
      next: (data) => {
        this.cosmetics = data;
        this.randomFeaturedCosmetics = this.getRandomCosmetics(numRandomCosmetics, data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getRandomCosmetics(numRandomCosmetics: number, sourceCosmetics: any[] | undefined = this.cosmetics) {
    const totalCosmetics = sourceCosmetics?.length ?? 0;
    const randomIndices: number[] = [];
    while (randomIndices.length < numRandomCosmetics && totalCosmetics > 0) {
      const randomIndex = Math.floor(Math.random() * totalCosmetics);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    const randomCosmetics = randomIndices.map(index => sourceCosmetics?.[index]);
    return randomCosmetics;
  }
}