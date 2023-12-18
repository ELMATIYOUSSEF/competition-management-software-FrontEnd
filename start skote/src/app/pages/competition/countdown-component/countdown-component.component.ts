import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-component',
  templateUrl: './countdown-component.component.html',
  styleUrls: ['./countdown-component.component.scss']
})
export class CountdownComponentComponent implements OnInit, OnDestroy {

  @Input() endDate: Date;
  x: any;
  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.x);
  }

  startCountdown(): void {
    this.x = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.endDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      document.getElementById("demo").innerHTML = countdownText;

      if (distance < 0) {
        clearInterval(this.x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }
}


