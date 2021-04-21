import {ModuleWithProviders, NgModule} from '@angular/core';
import { IJixieConfig } from './jixie-config';


@NgModule()
export class NgxJixieAnalyticsModule {
  public static forRoot(
    config: IJixieConfig,
  ): ModuleWithProviders<NgxJixieAnalyticsModule> {
    return {
      ngModule: NgxJixieAnalyticsModule,
      providers: [
        {
          provide: 'jixieConfig',
          useValue: config,
        }
      ]
    };
  }
}
