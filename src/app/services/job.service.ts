import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jobopening } from '../models/jobopening';

@Injectable({
  providedIn: 'root'
})
export class JobService {
 baseUrl="http://localhost:7272/api"
 header = {

  "content-type": "application/json"

}
  constructor(private http : HttpClient ) { }

  getAll(query:any):Observable<Jobopening[]>{
    console.log("service calling")
    return this.http.get<Jobopening[]>(`${this.baseUrl}/jobs?${query}`)
  }
  getOne(jobId:string):Observable<any>{

    return this.http.get<any>(`${this.baseUrl}/jobs/${jobId}`);
  }
  getJobCount(search: string): Observable<Number> {
    return this.http.get<Number>(this.baseUrl + "/totalJobCount?search=" + search);
  }

  save(job:Jobopening){
    return this.http.post<Number>(this.baseUrl + "/jobs",job, { headers: this.header });
  }
  delete(jobId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "/jobs/" + jobId);
  }
}
