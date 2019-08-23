import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from "../model/employee";
import {EmployeeData} from "../model/employeeData";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  baseUrl:string="http://localhost:4000/api/employee/";

  getEmployees(){;
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id:number){
    return this.http.get(this.baseUrl+id);
  }

  addEmployee(employee:EmployeeData){
    return this.http.post(this.baseUrl,employee);
  }

  updateEmployee(id:number,employee:Employee){
    return this.http.put(this.baseUrl+id,employee);
  }

  deleteEmployee(id:number){
    return this.http.delete(this.baseUrl+id);
  }
}
