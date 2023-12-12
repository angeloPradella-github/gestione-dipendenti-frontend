import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEmployeeService } from '../edit-employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  // Iniezione del servizio API nel costruttore del componente
  constructor(private EditEmployeeService: EditEmployeeService) {}

  editName1 = '';
  onSubmit(form: any) {
    console.log(form);
  }

  onSubmitReactive() {
    const updatedEmployee = {
      name: this.editEmployeeForm.get('editName')?.value,
      surname: this.editEmployeeForm.get('editSurname')?.value,
      password: this.editEmployeeForm.get('editPassword')?.value,
      id: this.EditEmployeeService.id,
    };

    // Chiamata per l'aggiornamento dell'utente nel servizio
    // this.EditEmployeeService.fetchEmployeeById(
    //   this.EditEmployeeService.employee.name.id
    // );
    this.EditEmployeeService.updateEmployeeData(updatedEmployee).subscribe(
      (user: any) => {
        console.log(user);
      },
      (error) => {
        console.error(`Si è verificato un errore:`, error);
      }
    );

    // Esegui qui la chiamata HTTP per aggiornare l'utente con i nuovi valori

    // Aggiorna anche il servizio locale con il nuovo utente
    // this.EditEmployeeService.employee = updatedEmployee;
  }

  editEmployeeForm!: FormGroup;

  datiUtente: any;

  utenteId = this.EditEmployeeService.id;

  ngOnInit(): void {
    this.EditEmployeeService.fetchEmployeeById(this.EditEmployeeService.id);

    this.EditEmployeeService.employee$.subscribe((employee) => {
      if (employee) {
        console.log(employee.name);
        // this.editName1 = employee.name;
        this.editEmployeeForm = new FormGroup({
          editName: new FormControl(employee.name),
          editSurname: new FormControl(employee.surname),
          editPassword: new FormControl(employee.password),
        });
      }
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
