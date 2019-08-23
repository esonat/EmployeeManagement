import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from "@angular/forms";
import {ApiService} from '../../service/api.service';
import {Router} from '@angular/router';

export interface Department{
  value:string;
  viewValue:string;
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addForm:FormGroup;
  submitted=false;

  departments: Department[]=[
    {value:'Accounting',viewValue:'Accounting'},
    {value:'Management',viewValue:'Management'},
    {value:'Sales',viewValue:'Sales'}
  ];

  constructor(private router:Router,public fb:FormBuilder,private apiService:ApiService) { }

  ngOnInit() {
    this.addForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      dateofbirth:['',Validators.required],
      selectDepartment:['Accounting',Validators.required]
    })
  }

  date(e){
    var convertDate=new Date(e.target.value).toISOString().substring(0,10);
    this.addForm.get('dateofbirth').setValue(convertDate,{
      onlyself:true
    })
  }
  
  get f(){return this.addForm.controls;}

  onSubmit(){
    this.submitted=true;

    if(this.addForm.invalid){
      return;
    }

    var employee={
      "firstname":this.addForm.get('firstname').value,
      "lastname":this.addForm.get('lastname').value,
      "dateofbirth":this.addForm.get('dateofbirth').value,
      "department":this.addForm.get('selectDepartment').value
    }

    this.apiService.addEmployee(employee).subscribe((res)=>{
      this.router.navigate(['list-employee']);
    });
  }

  title='EmployeeManagement'
}
