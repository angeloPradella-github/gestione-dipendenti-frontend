import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  onSubmit(form:any){
    console.log(form)
  }

  onSubmitReactive(){
    console.log(this.aggiungiUtenteForm.value)
    this.aggiungiUtenteForm = new FormGroup({
      nome: new FormControl(''),
      cognome: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      ruolo: new FormControl(''),

      
    });
  }
  
  aggiungiUtenteForm!: FormGroup;
  
  
  ngOnInit(): void {
    this.aggiungiUtenteForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      cognome: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      ruolo: new FormControl(null, [Validators.required]),
    });
  }

}
