import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

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

  editForm:FormGroup;
  submitted=false;
  id:number;
  private routeParameters:any;

  departments: Department[]=[
    {value:'accounting',viewValue:'Accounting'},
    {value:'management',viewValue:'Management'},
    {value:'sales',viewValue:'Sales'}
  ];

  constructor(public fb:FormBuilder,private route:ActivatedRoute) { }

  ngOnInit() {
    this.editForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      dateofbirth:['',[Validators.required]],
      selectDepartment:['accounting',Validators.required]
    })

    this.routeParameters = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });

   
   

   alert(this.id);
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

    alert(JSON.stringify(this.editForm.value,null,4));
  }

  title='EmployeeManagement'
}
