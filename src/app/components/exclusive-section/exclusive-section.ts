import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Інтерфейс для елемента переваги
export interface FeatureItem {
  id: string;
  iconPath: string; // Шлях до SVG іконки
  description: string;
}

@Component({
  selector: 'app-exclusive-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exclusive-section.html',
  styleUrl: './exclusive-section.sass'
})
export class ExclusiveSection {

  featuresItems: FeatureItem[] = [
    {
      id: '1',
      iconPath: '/media/icons/advantages/01.svg',
      description: 'Discounts for long-term contracts'
    },
    {
      id: '2',
      iconPath: '/media/icons/advantages/02.svg',
      description: 'Flexable working schedule 24/7'
    },
    {
      id: '3',
      iconPath: '/media/icons/advantages/03.svg',
      description: '24/7 Office support for smooth workflow'
    },
    {
      id: '4',
      iconPath: '/media/icons/advantages/04.svg',
      description: 'Special packages for commercial premises'
    }
  ];

}
