import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  onSubmitReactive(){
    console.log(this.aggiungiUtenteForm.value)
    this.aggiungiUtenteForm.reset()
    this.showResponseResult = "utente creato correttamente"

  }
  
  aggiungiUtenteForm!: FormGroup;
  
  showResponseResult: string = ""
  
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
