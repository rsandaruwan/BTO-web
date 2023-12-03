import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
// import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AllProductComponent } from './pages/all-product/all-product.component';
import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
// import { HomeComponent } from './pages/home/home.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { HomeNewComponent } from './pages/home-new/home-new.component';
import { AboutUsNewComponent } from './pages/about-us-new/about-us-new.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PaymentConfirmationComponent } from './pages/payment-confirmation/payment-confirmation.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeNewComponent
  },
  {
    path: 'about-us',
    component: AboutUsNewComponent
  },
  {
    path: 'about-us/:data',
    component: AboutUsNewComponent
  },
  // {
  //   path: 'test',
  //   component: TestComponent
  // },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
   {
    path: 'test',
    component: TestPageComponent
  },
  {
    path: 'activate-account',
    component: RegisterComponent
  },
  {
    path: 'test',
    component: HomeNewComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },

  {
    path: 'view-recipe/:recipe_url',
    component: SingleRecipeComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'products',
    component: AllProductComponent
  },
  {
    path: 'products/:sub_cat',
    component: AllProductComponent
  },
 
  {
    path: 'recipes',
    component: AllRecipesComponent
  },
  {
    path: 'recipes/:product_url',
    component: AllRecipesComponent
  },

  {
    path: 'unknown-error',
    component: HomeNewComponent,
  },
  {
    path: 'product/:product_url',
    component: SingleProductComponent
  },
  {
    path: 'payment-confirmation',
    component: PaymentConfirmationComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
