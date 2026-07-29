import { Injectable, effect, signal } from '@angular/core';

export interface UserPreferences {
  reducedMotion: boolean;
  emailDigests: boolean;
  courseAnnouncements: boolean;
  twoFactorAuth: boolean;
}

const STORAGE_KEY = 'devhub-preferences';

const DEFAULTS: UserPreferences = {
  reducedMotion: false,
  emailDigests: true,
  courseAnnouncements: true,
  twoFactorAuth: false,
};

function load(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
  private readonly _preferences = signal<UserPreferences>(load());
  readonly preferences = this._preferences.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._preferences()));
    });
  }

  set<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]): void {
    this._preferences.update((prefs) => ({ ...prefs, [key]: value }));
  }
}
