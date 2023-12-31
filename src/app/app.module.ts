import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from "@azure/msal-angular";
import { PublicClientApplication,InteractionType } from "@azure/msal-browser";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"; // Import

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: "10fef432-a87c-4a1c-b0c8-fee50fe63ab2", // Application (client) ID from the app registration
          authority:
            "https://login.microsoftonline.com/f5a1ae0d-25b0-4844-b8a5-be3d96efbd37", // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: "http://localhost:4200", // This is your redirect URI
          postLogoutRedirectUri: "http://localhost:4200"
        },
        cache: {
          cacheLocation: "localStorage"
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
        authRequest: {
          scopes: ["user.read"],
        },
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
          ["http://localhost:8080", ["api://10fef432-a87c-4a1c-b0c8-fee50fe63ab2/rvkrat.readwrite"]],
        ]),
      }
    ),
  ],
  providers: [MsalGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
