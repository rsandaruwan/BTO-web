import { NgModule,APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationTopComponent } from './components/navigation-top/navigation-top.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeNewComponent } from './pages/home-new/home-new.component';
import { SwiperModule } from 'swiper/angular';
import { MatSelectModule } from '@angular/material/select';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavNewComponent } from './components/side-nav-new/side-nav-new.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomHttpInterceptor } from './services/spinner/http-interceptor';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MatRadioModule } from '@angular/material/radio';
import { AllProductComponent } from './pages/all-product/all-product.component';
import { ProductComponent } from './components/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerReviewComponent } from './components/customer-review/customer-review.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FeatuedProductPopupComponent } from './components/popups/featued-product-popup/featued-product-popup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AboutUsNewComponent } from './pages/about-us-new/about-us-new.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LottieModule } from "ngx-lottie";
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ProfileShopingDetailsComponent } from './components/profile-shoping-details/profile-shoping-details.component';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';
import { CredentialDataComponent } from './components/popups/credential-data/credential-data.component';
import { FooterSecComponent } from './components/footer-sec/footer-sec.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { CartCommingSoonComponent } from './components/popups/cart-comming-soon/cart-comming-soon.component';
import { VideoFullComponent } from './components/popups/video-full/video-full.component'; 
import { UserProfileComponent } from './pages/user-profile/user-profile.component'; 
import { PaymentConfirmationComponent } from './pages/payment-confirmation/payment-confirmation.component';
import { TestPageComponent } from './pages/test-page/test-page.component'; 
export function initializeApp(appConfig: any) {
  return () => appConfig.load();
}
import player from "lottie-web";
import { AppConfig } from './app.config';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,

    FooterComponent,
    HomeNewComponent,
    SideNavComponent,
    SideNavNewComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    AllProductComponent,
    ProductComponent,
    CustomerReviewComponent,
    RatingStarsComponent,
    AllRecipesComponent,
    RecipeComponent,
    FeatuedProductPopupComponent,
    AboutUsNewComponent,
    ContactUsComponent,
    OrderReviewComponent,
    ProfileComponent,
    ProfileInformationComponent,
    ProfileShopingDetailsComponent,
    ProfileChangePasswordComponent,
    NavigationTopComponent,
    CredentialDataComponent,
    FooterSecComponent,
    TestimonialsComponent,
    CredentialsComponent,
    SingleProductComponent,
    SingleRecipeComponent,
    LoginComponent,
    RegisterComponent,
    CartCommingSoonComponent,
    VideoFullComponent,
    UserProfileComponent,
    PaymentConfirmationComponent,
    TestPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
    }),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  },
  AppConfig,
       { provide: APP_INITIALIZER,
         useFactory: initializeApp,
         deps: [AppConfig], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
