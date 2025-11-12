import { Component } from '@angular/core';
import { PageHeader } from "../page-header/page-header";
import { ServiceInfoComponent } from "../service-info/service-info";
import { IndustriesSection } from "../industries-section/industries-section";
import { SafetySection } from "../safety-section/safety-section";
import { PackagesSections } from "../packages-sections/packages-sections";
import { GallerySection } from "../gallery-section/gallery-section";
import { ReviewsSection } from "../reviews-section/reviews-section";
import { PromotionsSection } from "../promotions-section/promotions-section";
import { ExclusiveSection } from "../exclusive-section/exclusive-section";

@Component({
  selector: 'app-commercial-residential',
  standalone: true,
  imports: [PageHeader, ServiceInfoComponent, IndustriesSection, SafetySection, PackagesSections, GallerySection, GallerySection, ReviewsSection, PromotionsSection, ExclusiveSection],
  templateUrl: './commercial-residential.html',
  styleUrl: './commercial-residential.sass'
})
export class CommercialResidential {

}
