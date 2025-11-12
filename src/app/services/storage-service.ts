import { Injectable, signal } from '@angular/core';
import type { ServiceItemInterface } from '../interfaces/service-item-interface';
import { PackageInterface } from '../interfaces/package-interface';

@Injectable({ providedIn: 'root' })
export class StorageService {


  private pages: string[] = ['window-cleaning', 'high-ceiling', 'commercial-residential', 'power-washing'];

  private content = [{
      page: this.pages[0],
      services: [
        { id: 's1', title: 'Residential cleaning', text: 'Our luxury residential cleaning service offers both regular and deep cleaning. From bedrooms and living areas to kitchens and bathrooms, only eco-friendly products. Professional team of 1 to 4 members. ', icon: 'icon-service-01' },
        { id: 's2', title: 'Post construction cleaning', text: 'Cleonox Cleaning service can provide post construction cleaning to general contractors, business owners, apartment owners, and any other businesses.', icon: 'icon-service-02' },
        { id: 's3', title: 'Office cleaning', text: 'We offer customized office cleaning in NYC, including sweeping, mopping, vacuuming, dusting, sanitizing, and trash removal.', icon: 'icon-service-03' },
        { id: 's4', title: 'Janitorial service', text: 'Cleonox Cleaning Service is the number one stop for all janitorial services in NYC. Our cleaning staff does a fantastic job in keeping your business sanitized and safe for customers and staff.', icon: 'icon-service-04' },
        { id: 's5', title: 'Floor Cleaning, Restoration & Polishing', text: 'Our trained team provides professional floor care for residential and commercial buildings using high-grade buffers, strippers, wax, and polish to restore shine and durabilit.', icon: 'icon-service-05' },
        { id: 's6', title: 'High ceiling cleaning', text: 'Our high ceiling cleaning service safely removes dust, cobwebs, and buildup from hard-to-reach areas such as beams, vents, chandeliers, and light fixtures. Using professional ladders and extension tools, we restore a clean, polished look to any high space', icon: 'icon-service-06' }
      ],
    }, {
      page: this.pages[1],
      services: [
        { id: 's1', title: 'Residential cleaning', text: 'Our luxury residential cleaning service offers both regular and deep cleaning...', icon: 'icon-service-01' },
        { id: 's2', title: 'Post construction cleaning', text: 'Cleonox Cleaning service can provide post construction cleaning...', icon: 'icon-service-02' },
        { id: 's3', title: 'Office cleaning', text: 'We offer customized office cleaning in NYC...', icon: 'icon-service-03' },
        { id: 's4', title: 'Janitorial service', text: 'Cleonox Cleaning Service is the number one stop for all janitorial services...', icon: 'icon-service-04' },
        { id: 's5', title: 'Floor Cleaning, Restoration & Polishing', text: 'Our trained team provides professional floor care...', icon: 'icon-service-05' },
        { id: 's6', title: 'High ceiling cleaning', text: 'Our high ceiling cleaning service safely removes dust, cobwebs...', icon: 'icon-service-06' }
      ],
    }, {
      page: this.pages[2],
      services: [
        { id: 's1', title: 'Residential cleaning', text: 'Our luxury residential cleaning service offers both regular and deep cleaning. From bedrooms and living areas to kitchens and bathrooms, only eco-friendly products. Professional team of 1 to 4 members. ', icon: 'icon-service-01' },
        { id: 's2', title: 'Post construction cleaning', text: 'Cleonox Cleaning service can provide post construction cleaning to general contractors, business owners, apartment owners, and any other businesses.', icon: 'icon-service-02' },
        { id: 's3', title: 'Office cleaning', text: 'We offer customized office cleaning in NYC, including sweeping, mopping, vacuuming, dusting, sanitizing, and trash removal.', icon: 'icon-service-03' },
        { id: 's4', title: 'Janitorial service', text: 'Cleonox Cleaning Service is the number one stop for all janitorial services in NYC. Our cleaning staff does a fantastic job in keeping your business sanitized and safe for customers and staff.', icon: 'icon-service-04' },
        { id: 's5', title: 'Floor Cleaning, Restoration & Polishing', text: 'Our trained team provides professional floor care for residential and commercial buildings using high-grade buffers, strippers, wax, and polish to restore shine and durabilit.', icon: 'icon-service-05' },
        { id: 's6', title: 'High ceiling cleaning', text: 'Our high ceiling cleaning service safely removes dust, cobwebs, and buildup from hard-to-reach areas such as beams, vents, chandeliers, and light fixtures. Using professional ladders and extension tools, we restore a clean, polished look to any high space', icon: 'icon-service-06' }
      ],
    }, {
      page: this.pages[3],
      services: [
        { id: 's1', title: 'Residential cleaning', text: 'Our luxury residential cleaning service offers both regular and deep cleaning...', icon: 'icon-service-01' },
        { id: 's2', title: 'Post construction cleaning', text: 'Cleonox Cleaning service can provide post construction cleaning...', icon: 'icon-service-02' },
        { id: 's3', title: 'Office cleaning', text: 'We offer customized office cleaning in NYC...', icon: 'icon-service-03' },
        { id: 's4', title: 'Janitorial service', text: 'Cleonox Cleaning Service is the number one stop for all janitorial services...', icon: 'icon-service-04' },
        { id: 's5', title: 'Floor Cleaning, Restoration & Polishing', text: 'Our trained team provides professional floor care...', icon: 'icon-service-05' },
        { id: 's6', title: 'High ceiling cleaning', text: 'Our high ceiling cleaning service safely removes dust, cobwebs...', icon: 'icon-service-06' }
      ],
    }
  ]


  // *****
  // SERVICES
  // *****
  private _services = signal<ServiceItemInterface[]>([
    { id: 's1', title: 'Residential cleaning', text: 'Our luxury residential cleaning service offers both regular and deep cleaning...', icon: 'icon-service-01' },
    { id: 's2', title: 'Post construction cleaning', text: 'Cleonox Cleaning service can provide post construction cleaning...', icon: 'icon-service-02' },
    { id: 's3', title: 'Office cleaning', text: 'We offer customized office cleaning in NYC...', icon: 'icon-service-03' },
    { id: 's4', title: 'Janitorial service', text: 'Cleonox Cleaning Service is the number one stop for all janitorial services...', icon: 'icon-service-04' },
    { id: 's5', title: 'Floor Cleaning, Restoration & Polishing', text: 'Our trained team provides professional floor care...', icon: 'icon-service-05' },
    { id: 's6', title: 'High ceiling cleaning', text: 'Our high ceiling cleaning service safely removes dust, cobwebs...', icon: 'icon-service-06' }
  ]);
  public services = this._services.asReadonly();
  getServicesForPage(page: string): ServiceItemInterface[] {
    const found = this.content.find(c => c.page === page);
    if (found) { return found.services as ServiceItemInterface[]; }
    return this._services();
  }


  // *****
  // PACKAGES
  // *****
  private _offerPackages = signal<PackageInterface[]>([
    {
      name: 'Basic',
      items: [
        'General dusting, vacuuming, and mopping',
        'Bathroom and kitchen cleaning',
        'Trash removal',
        'Mirrors and glass spot cleaning'
      ]
    },
    {
      name: 'Standard',
      items: [
        'General dusting, vacuuming, and mopping',
        'Bathroom and kitchen cleaning',
        'Trash removal',
        'Mirrors and glass spot cleaning',
        'Baseboards, vents, and high-touch area sanitizing',
        'Interior windows and window frames',
        'Appliance exterior & cabinet fronts'
      ]
    },
    {
      name: 'Premium',
      subName: '(deep)',
      items: [
        'General dusting, vacuuming, and mopping',
        'Bathroom and kitchen cleaning',
        'Trash removal',
        'Mirrors and glass spot cleaning',
        'Baseboards, vents, and high-touch area sanitizing',
        'Interior windows and window frames',
        'Appliance exterior & cabinet fronts',
        'Inside appliances & cabinets',
        'High-ceiling, chandelier & light fixture cleaning',
        'Eco-friendly premium products',
        '1–4 cleaner team for faster results',
        'Steam cleaning',
        'Window cleaning Inside/Outside'
      ]
    }
  ]);
  public offerPackages = this._offerPackages.asReadonly();

  
}