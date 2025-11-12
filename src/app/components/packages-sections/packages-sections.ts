import { Component, computed, inject } from '@angular/core';
import { PackageInterface } from '../../interfaces/package-interface';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage-service';

type PackageWithSet = PackageInterface & { set: Set<string> };

@Component({
  selector: 'app-packages-sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages-sections.html',
  styleUrl: './packages-sections.sass'
})
export class PackagesSections {
  
  private storage = inject(StorageService);

  packagesWithSets = computed<PackageWithSet[]>(() =>
    this.storage.offerPackages().map(p => ({ ...p, set: new Set(p.items) }))
  );

  premiumItems = computed<string[]>(() => {
    const pkgs = this.storage.offerPackages();
    const premium = pkgs.find(p => p.name.toLowerCase() === 'premium');
    if (premium) return premium.items;
    const fallback = pkgs.reduce((acc, cur) => (cur.items.length > acc.items.length ? cur : acc), { name: '', items: [] } as PackageInterface);
    return fallback.items ?? [];
  });

  isIncluded(pkg: PackageWithSet, item: string): boolean {
    return pkg.set.has(item);
  }
}
