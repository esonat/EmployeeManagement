import {MatPaginator,MatSort,MatTableDataSource} from '@angular/material';
import { Component ,ViewChild,OnInit } from '@angular/core';
import {Sort} from '@angular/material';
import {Employee} from '../../model/employee';
import {ApiService} from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  
  constructor(private router:Router,private apiService:ApiService) { }

  dataSource=new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['firstname','lastname','dateofbirth','department','edit','delete'];

  @ViewChild(MatSort,{static:true}) sort: MatSort;


  ngOnInit() {
    this.dataSource.sort=this.sort;
    
    this.apiService.getEmployees().subscribe((res)=>{
      this.dataSource.data=res;
    });
   }

  public onSortData(sort:Sort){
    let data=this.dataSource.data.slice();
    if(sort.active && sort.direction!==''){
      data=data.sort((a:Employee,b:Employee)=>{
          const isAsc=sort.direction==='asc';
          switch(sort.active){
            case 'firstname': return this.compare(a.firstname,b.firstname,isAsc);
            case 'lastname':return this.compare(a.lastname,b.lastname,isAsc);
            case 'dateofbirth':return this.compare(a.dateofbirth,b.dateofbirth,isAsc);
            case 'department':return this.compare(a.department,b.department,isAsc);
            default: return 0;
          }
      });    
    }
    this.dataSource.data=data; 
   }

   private compare(a,b,isAsc){
    return (a.toLowerCase() < b.toLowerCase()  ? -1 : 1) * (isAsc ? 1:-1);
   }

   deleteEmployee(id:number){
     this.apiService.deleteEmployee(id).subscribe((res)=>{
       
       this.apiService.getEmployees().subscribe((res)=>{
        this.dataSource.data=res;
      });
     });
   }

}
