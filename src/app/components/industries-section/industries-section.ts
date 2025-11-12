import { Component } from '@angular/core';

@Component({
  selector: 'app-industries-section',
  standalone: true,
  imports: [],
  templateUrl: './industries-section.html',
  styleUrl: './industries-section.sass'
})
export class IndustriesSection {

  industriesList: string[] = ['Health & wellness clinics', 'Educational centers', 'Non-profit organizations', 'Office buildings', 'Event centers', 'Art galleries', 'Medical offices', 'Banks & financial institutions', 'Retail spaces & showrooms', 'Religious buildings', 'Gyms & fitness studios', 'Luxury Houses and Condo'];
}
