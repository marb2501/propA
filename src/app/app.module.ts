import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { registerLocaleData } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { PopinfoComponent } from './components/popinfo/popinfo.component';
import { IonicSelectableModule  } from 'ionic-selectable';


import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

import { SuperTabsModule} from '@ionic-super-tabs/angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';//
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Network} from '@ionic-native/network/ngx';
import localeEsPe from '@angular/common/locales/es-PE';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';


registerLocaleData(localeEsPe, 'es');

@NgModule({
  declarations: [AppComponent, PopinfoComponent],
entryComponents: [PopinfoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot({
              driverOrder: ['indexeddb', 'sqlite', 'websql']
              }), 
            AppRoutingModule, 
            HttpClientModule, 
            IonicSelectableModule,
            SuperTabsModule.forRoot(),
            ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LocalNotifications,
    NativeGeocoder,
    Network,
    AudioManagement,
    AndroidPermissions,
    LocationAccuracy,
    Diagnostic,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-PE' },
    SocialSharing,
    Screenshot,
    OneSignal,
    HTTP,
    BackgroundMode,
    OpenNativeSettings,
    InAppBrowser,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
