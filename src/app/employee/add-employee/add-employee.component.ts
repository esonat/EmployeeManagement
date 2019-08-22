import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from "@angular/forms";

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
    {value:'accounting',viewValue:'Accounting'},
    {value:'management',viewValue:'Management'},
    {value:'sales',viewValue:'Sales'}
  ];

  constructor(public fb:FormBuilder) { }

  ngOnInit() {
    this.addForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      dateofbirth:['',[Validators.required]],
      selectDepartment:['accounting',Validators.required]
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

    alert(JSON.stringify(this.addForm.value,null,4));
  }

  title='EmployeeManagement'
}
