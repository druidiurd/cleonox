import { Component, signal, computed, inject, ElementRef, ViewChild, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage-service';
import { takeUntil, timer } from 'rxjs'; // Для автоматичної прокрутки
import { Subject } from 'rxjs'; // Для очищення інтервалів

// Інтерфейс для елемента галереї
export interface GalleryItem {
  id: string;
  beforeImage: string; // URL або шлях до зображення "до"
  afterImage: string;  // URL або шлях до зображення "після"
  alt: string;         // Альтернативний текст для зображень
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.sass'
})
export class Gallery implements OnDestroy{
  private storage = inject(StorageService);

  @ViewChild('galleryGrid') galleryGrid!: ElementRef<HTMLElement>; // Додаємо ViewChild

  galleryItems = signal<GalleryItem[]>([
    { id: '1', beforeImage: '/media/gallery/1b.jpg', afterImage: '/media/gallery/1a.png', alt: 'Building exterior before cleaning' },
    { id: '2', beforeImage: '/media/gallery/2b.png', afterImage: '/media/gallery/2a.png', alt: 'Floor before cleaning' },
    { id: '3', beforeImage: '/media/gallery/3b.png', afterImage: '/media/gallery/3a.png', alt: 'Room before renovation' },
    { id: '4', beforeImage: '/media/gallery/4b.png', afterImage: '/media/gallery/4a.png', alt: 'Another floor before cleaning' },
    { id: '5', beforeImage: '/media/gallery/5b.png', afterImage: '/media/gallery/5a.png', alt: 'Building exterior before cleaning' },
    { id: '6', beforeImage: '/media/gallery/6b.png', afterImage: '/media/gallery/6a.png', alt: 'Floor before cleaning' },
    { id: '7', beforeImage: '/media/gallery/7b.png', afterImage: '/media/gallery/7a.png', alt: 'Room before renovation' },
  ]);

  currentIndex = signal(0);
  itemsPerPage = signal(4); // Можна зробити адаптивним

  canScrollLeft = computed(() => this.currentIndex() > 0);

  canScrollRight = computed(() => {
    const totalItems = this.galleryItems().length;
    const currentIdx = this.currentIndex();
    const itemsPerPg = this.itemsPerPage();
    return currentIdx + itemsPerPg < totalItems;
  });

  paginationDots = computed<number[]>(() => {
    const totalItems = this.galleryItems().length;
    const itemsPerPg = this.itemsPerPage();
    const numDots = Math.ceil(totalItems / itemsPerPg);
    return Array.from({ length: numDots }, (_, i) => i);
  });

  activeDotIndex = computed(() => Math.floor(this.currentIndex() / this.itemsPerPage()));

  private autoScrollInterval: any;
  private readonly destroy$ = new Subject<void>(); // Для очищення підписок

  constructor() {
    // Ефект для оновлення transform: translateX
    effect(() => {
      const currentIdx = this.currentIndex();
      if (this.galleryGrid) {
        // Використовуємо requestAnimationFrame для більш плавної анімації
        requestAnimationFrame(() => {
          const itemWidth = this.galleryGrid.nativeElement.children[0]?.clientWidth || 0;
          const gap = 20; // З gallery.component.sass
          const offset = currentIdx * (itemWidth + gap);
          this.galleryGrid.nativeElement.style.transform = `translateX(-${offset}px)`;
        });
      }
    });

    this.startAutoScroll(); // Запускаємо автоматичну прокрутку при ініціалізації
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startAutoScroll(): void {
    this.stopAutoScroll(); // Зупиняємо попередній інтервал, якщо він є
    this.autoScrollInterval = setInterval(() => {
      if (this.canScrollRight()) {
        this.scrollRight(false); // Прокручуємо вправо, не викликаючи паузу
      } else {
        // Якщо досягли кінця, повертаємося на початок
        this.currentIndex.set(0);
      }
    }, 3000); // Прокрутка кожні 3 секунди
  }

  private stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  private pauseAndResumeAutoScroll(): void {
    this.stopAutoScroll();
    timer(2000) // Пауза 2 секунди
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
        const totalItems = this.galleryItems().length;
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
