import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jobopening } from 'src/app/models/jobopening';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  search:string="";
  jobs !: Jobopening[]
  totalJob: number = 0;
  currentPage: number = 0;
  offset: number = 0;
  count: number = 10;

  query: string = "";

  constructor(private service: JobService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let search = this._activatedRoute.snapshot.queryParams["search"];
    if (search) {
      this.search = search;
    }
  }

  searchJob(searchForm: NgForm) {
    if (searchForm.value.search) {
      this.getJobs();
      this.getJobCount();
    }
  }

  getJobs() {
    let query = "";
    if (this.search && this.search.trim().length > 0) {
      query += "search=" + this.search;
    }
    if (this.offset) {
      query += "&offset=" + this.offset;
    }
    if (this.count) {
      query += "&count=" + this.count;
    }
    this.service.getAll(query).subscribe({
      next: (jobs: any) => {
        if (jobs.status === 200) {
          this.jobs = jobs.data;
        } else {
          this.jobs = [];
        }
      },
      error: (error) => {
        console.log("Error from jobs", error);
      }
    });
  }

  getJobCount() {
    this.service.getJobCount(this.search).subscribe({
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
    console.log(this.offset + ', ' + this.count);
    this.getJobs();
  }

  next() {
    this.offset += this.count;
    console.log(this.offset + ', ' + this.count);
    this.getJobs();
  }

}

