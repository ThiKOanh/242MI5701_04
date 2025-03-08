// snowfall.service.ts
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnowfallService {
  private snowflakes: any[] = [];
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;

  constructor(private ngZone: NgZone) { }

  initializeSnowfall() {
    this.createCanvas();
    for (let i = 0; i < 200; i++) {
      this.snowflakes.push(this.createSnowflake());
    }
    this.animateSnowfall();
  }

  private animationFrame = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const snowflake of this.snowflakes) {
      this.drawSnowflake(snowflake);
      this.updateSnowflake(snowflake);
    }

    this.animationFrameId = requestAnimationFrame(this.animationFrame);
  };

  removeSnowfall() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }

  private createCanvas() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw new Error('Could not get 2D context for canvas');
    }

    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
  }

  private createSnowflake() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 1
    };
  }

  private drawSnowflake(snowflake: any) {
    this.ctx.beginPath();
    this.ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  }

  private updateSnowflake(snowflake: any) {
    snowflake.y += snowflake.speed;

    if (snowflake.y > this.canvas.height) {
      snowflake.y = 0;
    }
  }

  private animateSnowfall() {
    this.ngZone.runOutsideAngular(() => {
      this.animationFrame();
    });
  }
}
