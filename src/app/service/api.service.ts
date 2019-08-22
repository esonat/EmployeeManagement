import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  baseUrl:string="http://localhost:5000/employees/";

  getEmployees(){;
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id:number){
    return this.http.get(this.baseUrl+id);
  }

  addEmployee(employee:Employee){
    return this.http.post(this.baseUrl,employee);
  }

  updateEmployee(employee:Employee){
    return this.http.put(this.baseUrl+employee.id,employee);
  }

  deleteEmployee(id:number){
    return this.http.delete(this.baseUrl+id);
  }
}
