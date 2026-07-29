import { Injectable } from '@angular/core';

declare const google: any;

const GSI_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

@Injectable({ providedIn: 'root' })
export class GoogleIdentityService {
  private scriptLoadPromise: Promise<void> | null = null;

  private loadScript(): Promise<void> {
    if (!this.scriptLoadPromise) {
      this.scriptLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = GSI_SCRIPT_SRC;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
        document.head.appendChild(script);
      });
    }
    return this.scriptLoadPromise;
  }

  async requestAccessToken(clientId: string): Promise<string> {
    await this.loadScript();

    return new Promise<string>((resolve, reject) => {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid email profile',
        callback: (response: { access_token?: string; error?: string }) => {
          if (response.access_token) {
            resolve(response.access_token);
          } else {
            reject(new Error(response.error ?? 'Google sign-in failed'));
          }
        },
      });
      tokenClient.requestAccessToken();
    });
  }
}
