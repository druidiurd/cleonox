import { Component, signal, computed, inject, ElementRef, ViewChild, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage-service'; // Припустимо, що у вас є такий сервіс
import { takeUntil, timer } from 'rxjs';
import { Subject } from 'rxjs';

// Інтерфейс для елемента відгуку
export interface ReviewItem {
  id: string;
  avatar: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews-section.html',
  styleUrl: './reviews-section.sass'
})
export class ReviewsSection implements OnDestroy {
  private storage = inject(StorageService); // Якщо потрібен StorageService

  @ViewChild('reviewsGrid') reviewsGrid!: ElementRef<HTMLElement>;

  reviewsItems = signal<ReviewItem[]>([
    { id: '1', avatar: '/media/avatars/user.png', name: 'Alex Stanton', rating: 5, text: 'Я очень доволен сервисом! У CARPROF низкие цены и большой выбор автомобилей с хорошими условиями покупки. Кроме того, сотрудники очень приветливы.', date: '21 июля 2022 года' },
    { id: '2', avatar: '/media/avatars/user.png', name: 'Jane Doe', rating: 4, text: 'Great service, very professional and efficient. My car looks brand new!', date: '15 августа 2022 года' },
    { id: '3', avatar: '/media/avatars/user.png', name: 'John Smith', rating: 5, text: 'Highly recommend Cleonox! They did an amazing job with my office cleaning.', date: '01 сентября 2022 года' },
    { id: '4', avatar: '/media/avatars/user.png', name: 'Anna K.', rating: 5, text: 'Fast and reliable. The team was very friendly and paid attention to every detail.', date: '10 октября 2022 года' },
    { id: '5', avatar: '/media/avatars/user.png', name: 'Mike R.', rating: 4, text: 'Good value for money. My apartment was spotless after their visit.', date: '05 ноября 2022 года' },
    { id: '6', avatar: '/media/avatars/user.png', name: 'Sarah L.', rating: 5, text: 'Exceptional service! They exceeded my expectations. Will definitely use them again.', date: '20 декабря 2022 года' },
  ]);

  currentIndex = signal(0);
  itemsPerPage = signal(1);

  canScrollLeft = computed(() => this.currentIndex() > 0);

  canScrollRight = computed(() => {
    const totalItems = this.reviewsItems().length;
    const currentIdx = this.currentIndex();
    const itemsPerPg = this.itemsPerPage();
    return currentIdx + itemsPerPg < totalItems;
  });

  paginationDots = computed<number[]>(() => {
    const totalItems = this.reviewsItems().length;
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
      if (this.reviewsGrid) {
        requestAnimationFrame(() => {
          const itemWidth = this.reviewsGrid.nativeElement.children[0]?.clientWidth || 0;
          const gap = 20; // З reviews.component.sass
          const offset = currentIdx * (itemWidth + gap);
          this.reviewsGrid.nativeElement.style.transform = `translateX(-${offset}px)`;
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
        const totalItems = this.reviewsItems().length;
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

  // Допоміжна функція для створення масиву зірок
  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}