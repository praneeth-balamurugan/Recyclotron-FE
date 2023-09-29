import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HomeAvailableScrapsComponent } from './home/home-available-scraps/home-available-scraps.component';
import { PrimengModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './shared/header/navbar/navbar.component';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { AccountService } from './account/account.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { JwtInterceptor } from './account/jwt.interceptor';
import { AddAdminComponent } from './user/add-admin/add-admin.component';
import { EditMyDetailComponent } from './user/edit-my-detail/edit-my-detail.component';
import { AddScrapComponent } from './user/add-scrap/add-scrap.component';
import { DatePipe } from '@angular/common';
import { UserService } from './user/user.service';
import { UserAddedScrapComponent } from './user/user-added-scrap/user-added-scrap.component';
import { DeleteDialogComponent } from './helper/delete-dialog/delete-dialog.component';
import { AdminViewScrapComponent } from './user/admin-view-scrap/admin-view-scrap.component';
import { LockConformationDialogComponent } from './helper/lock-conformation-dialog/lock-conformation-dialog.component';
import { AdminScrapTableComponent } from './user/admin-scrap-table/admin-scrap-table.component';
import { ScrapComponent } from './scrap/scrap.component';
import { ScrapService } from './scrap/scrap.service';
import { NoScrapComponent } from './helper/no-scrap/no-scrap.component';
import { ScrapViewComponent } from './scrap/scrap-view/scrap-view.component';
import { HomeService } from './home/home.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeAvailableScrapsComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    AboutComponent,
    AddAdminComponent,
    EditMyDetailComponent,
    AddScrapComponent,
    UserAddedScrapComponent,
    DeleteDialogComponent,
    AdminViewScrapComponent,
    LockConformationDialogComponent,
    AdminScrapTableComponent,
    ScrapComponent,
    NoScrapComponent,
    ScrapViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimengModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    MessageService,
    DatePipe,
    AccountService,
    UserService,
    HomeService,
    ScrapService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
