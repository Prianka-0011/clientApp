import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Observable } from 'rxjs';
import { Jobopening } from '../../models/jobopening';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-opening',
  templateUrl: './job-opening.component.html',
  styleUrls: ['./job-opening.component.css']
})
export class JobOpeningComponent implements OnInit{
  pageValue:number=0
  jobs: Jobopening[] = new Array<Jobopening>();
  totalJob: number = 0;
  currentPage: number = 0;

  search: string = "";
  offset: number = 0;
  count: number = 10;

  query: string = "";


  constructor(private service: JobService,private router:Router) {

  }
  ngOnInit(): void {

    this.getAllJob();
    this.getJobCount();
  }

  getAllJob() {
    console.log("comming from delete")
    let query = "";
    if (this.search && this.search.trim().length > 0) {
      query += this.search;
    }
    if (this.offset) {
      query += "&offset=" + this.offset;
    }
    if (this.count) {
      query += "&count=" + this.count;
    }
    console.log("I am in job component")
    this.service.getAll(query).subscribe({

      next:(jobs:any)=>{
        this.jobs=jobs.data;
        console.log("JOBS", jobs)
      },error:(error:any)=>{

      }
    })
  }
  getJobCount() {
    this.service.getJobCount(this.query).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.totalJob = response.data;
        }
      },
      error: (error) => {
        console.log("Error from jobs", error);
      }
    })
  }
  disableBackward(): boolean {
    return this.offset === 0;
  }

  disableForward(): boolean {
    return (this.offset + this.count) >= this.totalJob;
  }
  prev() {
    this.offset -= this.count;
    this.getAllJob();
  }

  next() {
    this.offset += this.count;
    this.getAllJob();
  }
  detailView(jobId:any)
  {
    this.router.navigate([`jobs/${jobId}`])
  }
  DeleteRecord(jobId:any) {
    console.log("delete"+jobId)
    this.service.delete(jobId).subscribe({
      next:(job)=>{

          this.getAllJob();
          this.getJobCount();

      },
      error:()=>{

      }
    })
  }
  addNewJob()
  {
    const id='00000000-0000-0000-0000-000000000000'
    this.router.navigate(["addJob/"+id]);
  }
  pageSize(){
console.log(this.pageValue);
  }
}
