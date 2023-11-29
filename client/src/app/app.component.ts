import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  {
  myForm: FormGroup;
  isFadeOut = false;
  constructor(private formBuilder: FormBuilder , private http: HttpClient) { 
    this.myForm = this.formBuilder.group({
      name: ['' , Validators.required],
      email: ['' , Validators.email],
      password: ['' , Validators.required]
    })
  }

  onsubmit(){
   if(this.myForm.valid){
    console.warn(this.myForm.value);
    this.http.post('http://localhost:3000/save', this.myForm.value).subscribe(
      {
        next: (responses) => {
          console.log(responses);
          setTimeout(() => {
            this.isFadeOut = true;
          }, 500);
          this.myForm.reset()
        },
        error: (errors) => console.error('Error occurred:', errors),
        complete: () => console.log('completed')
      }
    );
   }
  }
}
