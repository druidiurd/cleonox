import { Component } from '@angular/core';
import { Gallery } from "../gallery/gallery";

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  imports: [Gallery],
  templateUrl: './gallery-section.html',
  styleUrl: './gallery-section.sass'
})
export class GallerySection {

}
