// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { BooksService } from './shared/services/books.service';
import { ToasterService } from './shared/services/toaster.service';

// Comonents
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { BookComponent } from './book/book.component';

// Pipes
import { FilterTitlePipe } from './shared/pipes/filter-title.pipe';
import { DeleteBookComponent } from './book/delete-book/delete-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    BookComponent,
    FilterTitlePipe,
    DeleteBookComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([]),
    ToastModule.forRoot()
  ],
  providers: [BooksService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
