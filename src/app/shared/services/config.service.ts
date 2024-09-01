import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private apiUrl: string;

  constructor() {
    const userInput = window.location.host;
    this.apiUrl = this.setApiUrl(userInput);
  }

  private setApiUrl(userInput: string): string {
    return 'https://localhost:7007/';
  }

  getApiUrl(): string {
    return this.apiUrl;
  }
}
