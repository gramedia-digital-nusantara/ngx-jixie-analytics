/**
 * inspired from package
 * https://www.npmjs.com/package/angular-google-tag-manager
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { IJixieConfig } from './jixie-config';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class JixieAnalyticService {
  private isLoaded = false;

  private browserGlobals = {
    windowRef(): any {
      return window;
    },
    documentRef(): any {
      return document;
    },
  };

  constructor(
    @Optional()
    @Inject('jixieConfig')
    public config: IJixieConfig = { accountId: null },
    @Optional() @Inject('jixieAccountId') public jixieAccountId: string,
  ) {
    if (this.config == null) {
      this.config = { accountId: null };
    }

    this.config = {
      ...this.config,
      accountId: jixieAccountId || this.config.accountId,
    };

    if (this.config.accountId == null) {
      throw new Error('Jixie account ID not provided.');
    }
  }

  public getJixieP(): any[] {
    const window = this.browserGlobals.windowRef();
    window.jixie_p = window.jixie_p || [];
    return window.jixie_p;
  }

  private pushOnJixieP(obj: object): void {
    const dataLayer = this.getJixieP();
    dataLayer.push(obj);
  }

  public addJixieToDom(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        return resolve(this.isLoaded);
      }
      const doc = this.browserGlobals.documentRef();

      const jixieScript = doc.createElement('script');
      jixieScript.async = true;
      jixieScript.src = this.applyQueryParams(
        'https://scripts.jixie.io/jixietracker.js',
      );
      jixieScript.addEventListener('load', () => {
        return resolve(this.isLoaded = true);
      });
      jixieScript.addEventListener('error', () => {
        return reject(false);
      });
      doc.head.insertBefore(jixieScript, doc.head.firstChild);
    });
  }

  public pushTag(item: object): Promise<void> {
    item = { accountId: this.config.accountId, ...item };

    return new Promise<void>((resolve, reject) => {
      if (!this.isLoaded) {
        this.addJixieToDom().then(() => {
          this.pushOnJixieP(item);
          return resolve();
        }).catch(() => reject());
      } else {
        this.pushOnJixieP(item);
        return resolve();
      }
    });
  }

  /**
   * hash to md5 string, required when you want hash user's email
   */
  public hash(data: string): string {
    return Md5.hashStr(data) as string;
  }

  private applyQueryParams(url: string): string {
    if (url.indexOf('?') === -1) {
      url += '?';
    }

    return (
      url +
      Object.keys(this.config)
        .filter((k) => this.config[k])
        .map((k) => `${k.toLowerCase()}=${this.config[k]}`)
        .join('&')
    );
  }
}
