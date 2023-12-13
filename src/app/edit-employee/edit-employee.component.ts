import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEmployeeService } from '../edit-employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm = new FormGroup({
    editName: new FormControl(''),
    editSurname: new FormControl(''),
    editPassword: new FormControl(''),
  });

  @Output() employeeModified = new EventEmitter<void>();

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
  }

  datiUtente: any;

  utenteId = this.EditEmployeeService.id;

  ngOnInit(): void {
    this.EditEmployeeService.fetchEmployeeById(this.EditEmployeeService.id);

    this.EditEmployeeService.employee$.subscribe((employee) => {
      if (employee) {
        this.editEmployeeForm.setValue({
          editName: employee.name || '',
          editSurname: employee.surname || '',
          editPassword: employee.password || '',
        });
      }
    });
  }
}
