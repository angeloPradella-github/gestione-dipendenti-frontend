import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  @Output() employeeAdded = new EventEmitter<void>();

  constructor(private httpClient: HttpClient) {}

  isSuccess(): boolean {
    return this.showResponseResult.toLowerCase().includes('correttamente');
  }

  onSubmitReactive() {
    const formData = this.aggiungiUtenteForm.value;

    this.httpClient.post('http://localhost:8080/users/new', formData).subscribe(
      (response) => {
        console.log('Risposta dal server:', response);
        this.aggiungiUtenteForm.reset();
        this.showResponseResult = 'Utente creato correttamente';
        this.employeeAdded.emit();
      },
      (error) => {
        console.error('Errore durante la chiamata API:', error);
        this.showResponseResult = "Errore durante il salvataggio dell'utente";
      }
    );
  }

  aggiungiUtenteForm!: FormGroup;

  showResponseResult: string = '';

  ngOnInit(): void {
    this.aggiungiUtenteForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl(null, [Validators.required]),
    });
  }
}
