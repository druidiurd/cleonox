import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.sass'
})
export class TopBar {

  isOpen = signal(false);

  onHamburger(): void {
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

}
