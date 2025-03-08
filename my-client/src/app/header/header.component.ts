import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  banners: string[] = ['assets/images/Banner web.png', 'assets/images/Banner_Xmas.png'];
  currentBannerIndex: number = 0;
  currentBanner: string = this.banners[this.currentBannerIndex];

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.rotateBanners();
  }

  rotateBanners() {
    setInterval(() => {
      this.ngZone.run(() => {
        this.showNextBanner();
        this.cdr.detectChanges(); // Force change detection
      });
    }, 5000);
  }

  showNextBanner() {
    this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    this.currentBanner = this.banners[this.currentBannerIndex];
  }
}