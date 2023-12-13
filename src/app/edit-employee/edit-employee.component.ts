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
  showResultMessage = false;
  resultMessage = '';

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

    this.EditEmployeeService.updateEmployeeData(updatedEmployee).subscribe(
      (user: any) => {
        console.log('Modifica andata a buon fine, nuovi dati: ', user);
        this.employeeModified.emit();
        this.resultMessage = 'User modified successfully';
        this.showResultMessage = true;
        setInterval(() => {
          this.showResultMessage = false;
        }, 2500);
      },
      (error) => {
        console.error(`Si è verificato un errore:`, error);
        this.resultMessage = 'Error during update ';
        this.showResultMessage = true;
        setInterval(() => {
          this.showResultMessage = false;
        }, 2500);
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
          editPassword: '',
        });
      }
    });
  }
}
