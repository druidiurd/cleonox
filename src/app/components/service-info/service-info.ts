import { Component, Input, signal, computed } from '@angular/core';
import { NgFor } from '@angular/common';
import { StorageService } from '../../services/storage-service';
import type { ServiceItemInterface } from '../../interfaces/service-item-interface';

@Component({
  selector: 'app-service-info',
  standalone: true,
  imports: [NgFor],
  templateUrl: './service-info.html',
  styleUrls: ['./service-info.sass']
})
export class ServiceInfoComponent {
  // локальний сигнал для сторінки (реактивний)
  private _page = signal<string | null>(null);
  // Публічний computed масив сервісів для рендеру. Залежить від _page().
  servicesForRender = computed(() => {
    const p = this._page();
    if (!p) return [];
    return this.storage.getServicesForPage(p) ?? [];
  });

  // входящий параметр — може бути встановлений як [page]="'...'" або page="..."
  @Input()
  set page(value: string | null) {
    // безпечний чек (можеш додати валідацію page)
    this._page.set(value);
  }

  get page(): string | null {
    return this._page();
  }

  constructor(private storage: StorageService) {}

  trackById(_: number, item: ServiceItemInterface) {
    return item.id ?? item.title;
  }
}