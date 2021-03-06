import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OrderEvaluationComponent } from './components/order-evaluation/order-evaluation.component';
import { SocialPerformanceComponent } from './components/social-performance/social-performance.component';
import { EnterSocialPerformancePageComponent } from './pages/enter-social-performance-page/enter-social-performance-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BonusComputationCollectionPageComponent } from './pages/bonus-computation-collection-page/bonus-computation-collection-page.component';
import { SocialPerformanceFormComponent } from './components/social-performance-form/social-performance-form.component';
import { EmployeeAndYearSelectorComponent } from './components/employee-and-year-selector/employee-and-year-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { SocialPerformanceTargetsFormComponent } from './components/social-performance-targets-form/social-performance-targets-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    MenuBarComponent,
    NotFoundPageComponent,
    DashboardPageComponent,
    OrderEvaluationComponent,
    SocialPerformanceComponent,
    EnterSocialPerformancePageComponent,
    BonusComputationCollectionPageComponent,
    SocialPerformanceFormComponent,
    EmployeeAndYearSelectorComponent,
    RegisterComponent,
    SocialPerformanceTargetsFormComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
