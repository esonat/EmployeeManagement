import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from "@angular/forms";
import { Router,ActivatedRoute } from '@angular/router';
import {ApiService} from '../../service/api.service';
import { Employee } from 'src/app/model/employee';
import {EmployeeResponse} from 'src/app/model/employeeResponse';

export interface Department{
  value:string;
  viewValue:string;
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  selected:string = 'Accounting';
  editForm:FormGroup;
  submitted=false;
  id:number;
  private routeParameters:any;
  firstName:string;
  lastName:string;
  dateOfBirth:string;
  department:string;
  response:string;

  departments: Department[]=[
    {value:'Accounting',viewValue:'Accounting'},
    {value:'Management',viewValue:'Management'},
    {value:'Sales',viewValue:'Sales'}
  ];

  constructor(private fb:FormBuilder,private apiService:ApiService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
     
    this.routeParameters = this.route.params.subscribe(params => {
      this.id = +params['id'];
   }); 

    this.apiService.getEmployeeById(this.id).subscribe((res)=>{
        let data=JSON.stringify(res);
        let fieldValues=JSON.parse(data);
        
        let keys=Object.keys(fieldValues);
        let values=keys.map(k=>fieldValues[k]);

        this.firstName=values[1];
        this.lastName=values[2];
        this.dateOfBirth=values[3];
        this.department=values[4];
        this.selected=values[4];

    this.editForm=this.fb.group({
      firstname:[this.firstName,Validators.required],
      lastname:[this.lastName,Validators.required],
      dateofbirth:[this.dateOfBirth,Validators.required],
      selectDepartment:[this.department,Validators.required]
    });
  });
  }

  date(e){
    var convertDate=new Date(e.target.value).toISOString().substring(0,10);
    this.editForm.get('dateofbirth').setValue(convertDate,{
      onlyself:true
    })
  }
  
  get f(){return this.editForm.controls;}

  onSubmit(){
    this.submitted=true;

    if(this.editForm.invalid){
      return;
    }

    var employee={
      "id":this.id,
      "firstname":this.editForm.get('firstname').value,
      "lastname":this.editForm.get('lastname').value,
      "dateofbirth":this.editForm.get('dateofbirth').value,
      "department":this.editForm.get('selectDepartment').value
    }

    this.apiService.updateEmployee(this.id,employee).subscribe((res)=>{
      alert('Employee edited');

      this.router.navigate(['list-employee']);

    });

  }

  title='EmployeeManagement'
}
