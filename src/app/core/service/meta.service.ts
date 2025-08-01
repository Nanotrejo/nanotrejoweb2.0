import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title ? `${title} - NanoTrejo` : 'NanoTrejo - Portfolio');
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }) {
    const defaults = {
      title: 'NanoTrejo - Portfolio',
      description: 'Portfolio personal de desarrollo web y experiencias',
      image: '/assets/images/nano-img-400.webp',
      url: 'https://nanotrejo.dev'
    };

    const meta = { ...defaults, ...config };

    this.meta.updateTag({ name: 'description', content: meta.description });
    this.meta.updateTag({ property: 'og:title', content: meta.title });
    this.meta.updateTag({ property: 'og:description', content: meta.description });
    this.meta.updateTag({ property: 'og:image', content: meta.image });
    this.meta.updateTag({ property: 'og:url', content: meta.url });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }
}