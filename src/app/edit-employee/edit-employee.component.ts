import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEmployeeService } from '../edit-employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  // Iniezione del servizio API nel costruttore del componente
  constructor(private EditEmployeeService: EditEmployeeService) { }

  onSubmit(form:any){
    console.log(form)
  }

  onSubmitReactive(){
    if (this.editEmployeeForm.valid) { //verifico se il form è valido
      console.log(this.editEmployeeForm.value);
      // Gestione dei dati o chiamata a un servizio per inviare i dati
      // Invia i dati al servizio API per l'aggiornamento nel database
      this.EditEmployeeService.updateEmployeeData(this.editEmployeeForm.value).subscribe(
        (response: any) => {
          console.log('Dati aggiornati con successo nel database:', response);
          this.editEmployeeForm.reset(); // Resetta il form dopo l'invio dei dati
        },
        (error: any) => {
          console.error('Si è verificato un errore durante l\'aggiornamento dei dati:', error);
          // Gestire l'errore come necessario
        }
      );
    } else {
      console.log('Il form non è valido.');
    }
  }
  
  editEmployeeForm!: FormGroup;
  
  datiUtente: any;

  ngOnInit(): void {
    this.editEmployeeForm = new FormGroup({
      editName: new FormControl(null, Validators.required),
      editSurname: new FormControl(null, Validators.required),
      editPassword: new FormControl(null, Validators.required),
    });

    const userData = localStorage.getItem('utenteLoggato');
    if (userData) {
      // Converte la stringa JSON in un oggetto JavaScript
      this.datiUtente = JSON.parse(userData);
    } else {
      console.log('Nessun dato utente trovato nella Local Storage');
    }
  }
}
