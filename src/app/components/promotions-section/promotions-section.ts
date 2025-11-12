import { Component, signal, computed, inject, ElementRef, ViewChild, effect, OnDestroy } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common'; // Додано NgStyle
import { takeUntil, timer } from 'rxjs';
import { Subject } from 'rxjs';

// Інтерфейс для елемента акції
export interface PromotionItem {
  id: string;
  imageUrl: string;
  overlayColor: string; // Колір для накладання на зображення
  // overlayTitle: string;
  // overlaySubtitle: string;
  title: string;
  description: string;
  validity: string;
}

@Component({
  selector: 'app-promotions-section',
  imports: [CommonModule, NgStyle],
  templateUrl: './promotions-section.html',
  styleUrl: './promotions-section.sass'
})
export class PromotionsSection {
  @ViewChild('promotionsGrid') promotionsGrid!: ElementRef<HTMLElement>;

  promotionsItems = signal<PromotionItem[]>([
    {
      id: '1',
      imageUrl: '/media/promotions/01.png', // Зображення з прикладу
      overlayColor: 'rgba(0, 191, 165, 0.8)', // Бірюзовий колір
      // overlayTitle: 'Get $50 OFF',
      // overlaySubtitle: 'your first cleaning',
      title: 'First-Time Client Offer',
      description: 'New to Cleonox? Get $50 OFF your first cleaning (minimum $500 order). Your first impression deserves our best shine.',
      validity: 'The promotion is valid until October 27, 2025.'
    },
    {
      id: '2',
      imageUrl: '/media/promotions/02.png', // Зображення з прикладу
      overlayColor: 'rgba(255, 165, 0, 0.8)', // Помаранчевий колір
      // overlayTitle: 'Monthly or quarterly',
      // overlaySubtitle: 'maintenance up to 20%',
      title: 'Property Manager Package',
      description: 'For property managers, realtors & restaurants: Monthly or quarterly maintenance plan – up to 20% off.',
      validity: 'The promotion is valid until October 27, 2025.'
    },
    {
      id: '3',
      imageUrl: '/media/promotions/03.png',
      overlayColor: 'rgba(100, 149, 237, 0.8)', // Синій колір
      // overlayTitle: 'Deep Cleaning',
      // overlaySubtitle: 'Special Offer',
      title: 'Spring Cleaning Special',
      description: 'Get your home sparkling clean with our deep cleaning service. Limited time offer!',
      validity: 'The promotion is valid until November 30, 2025.'
    },
    {
      id: '4',
      imageUrl: '/media/promotions/04.png',
      overlayColor: 'rgba(60, 179, 113, 0.8)', // Зелений колір
      // overlayTitle: 'Eco-Friendly',
      // overlaySubtitle: 'Cleaning Discount',
      title: 'Green Cleaning Package',
      description: 'Choose our eco-friendly cleaning options and get 15% off your next service.',
      validity: 'The promotion is valid until December 31, 2025.'
    },{
      id: '5',
      imageUrl: '/media/promotions/05.png',
      overlayColor: 'rgba(60, 179, 113, 0.8)', // Зелений колір
      // overlayTitle: 'Eco-Friendly',
      // overlaySubtitle: 'Cleaning Discount',
      title: 'Green Cleaning Package',
      description: 'Choose our eco-friendly cleaning options and get 15% off your next service.',
      validity: 'The promotion is valid until December 31, 2025.'
    },{
      id: '6',
      imageUrl: '/media/promotions/06.png',
      overlayColor: 'rgba(60, 179, 113, 0.8)', // Зелений колір
      // overlayTitle: 'Eco-Friendly',
      // overlaySubtitle: 'Cleaning Discount',
      title: 'Green Cleaning Package',
      description: 'Choose our eco-friendly cleaning options and get 15% off your next service.',
      validity: 'The promotion is valid until December 31, 2025.'
    }, {
      id: '7',
      imageUrl: '/media/promotions/07.png',
      overlayColor: 'rgba(60, 179, 113, 0.8)', // Зелений колір
      // overlayTitle: 'Eco-Friendly',
      // overlaySubtitle: 'Cleaning Discount',
      title: 'Green Cleaning Package',
      description: 'Choose our eco-friendly cleaning options and get 15% off your next service.',
      validity: 'The promotion is valid until December 31, 2025.'
    }, {
      id: '8',
      imageUrl: '/media/promotions/08.png',
      overlayColor: 'rgba(60, 179, 113, 0.8)', // Зелений колір
      // overlayTitle: 'Eco-Friendly',
      // overlaySubtitle: 'Cleaning Discount',
      title: 'Green Cleaning Package',
      description: 'Choose our eco-friendly cleaning options and get 15% off your next service.',
      validity: 'The promotion is valid until December 31, 2025.'
    }
    ]);

  currentIndex = signal(0);
  itemsPerPage = signal(1); // Для початку 1, потім можна адаптувати

  canScrollLeft = computed(() => this.currentIndex() > 0);

  canScrollRight = computed(() => {
    const totalItems = this.promotionsItems().length;
    const currentIdx = this.currentIndex();
    const itemsPerPg = this.itemsPerPage();
    // Перевіряємо, чи є ще елементи для прокрутки вправо
    return currentIdx + itemsPerPg < totalItems;
  });

  paginationDots = computed<number[]>(() => {
    const totalItems = this.promotionsItems().length;
    const itemsPerPg = this.itemsPerPage();
    const numDots = Math.ceil(totalItems / itemsPerPg);
    return Array.from({ length: numDots }, (_, i) => i);
  });

  activeDotIndex = computed(() => Math.floor(this.currentIndex() / this.itemsPerPage()));

  private autoScrollInterval: any;
  private readonly destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const currentIdx = this.currentIndex();
      if (this.promotionsGrid) {
        requestAnimationFrame(() => {
          const itemWidth = this.promotionsGrid.nativeElement.children[0]?.clientWidth || 0;
          const gap = 20; // З promotions.component.sass
          const offset = currentIdx * (itemWidth + gap);
          this.promotionsGrid.nativeElement.style.transform = `translateX(-${offset}px)`;
        });
      }
    });

    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startAutoScroll(): void {
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      if (this.canScrollRight()) {
        this.scrollRight(false);
      } else {
        this.currentIndex.set(0);
      }
    }, 3000);
  }

  private stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  private pauseAndResumeAutoScroll(): void {
    this.stopAutoScroll();
    timer(2000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.startAutoScroll();
      });
  }

  scrollLeft(interacted: boolean = true): void {
    if (this.canScrollLeft()) {
      this.currentIndex.update(current => Math.max(0, current - 1));
      if (interacted) {
        this.pauseAndResumeAutoScroll();
      }
    }
  }

  scrollRight(interacted: boolean = true): void {
    if (this.canScrollRight()) {
      this.currentIndex.update(current => {
        const totalItems = this.promotionsItems().length;
        const itemsPerPg = this.itemsPerPage();
        return Math.min(totalItems - itemsPerPg, current + 1);
      });
      if (interacted) {
        this.pauseAndResumeAutoScroll();
      }
    }
  }

  goToPage(pageIndex: number, interacted: boolean = true): void {
    this.currentIndex.set(pageIndex * this.itemsPerPage());
    if (interacted) {
      this.pauseAndResumeAutoScroll();
    }
  }
}
