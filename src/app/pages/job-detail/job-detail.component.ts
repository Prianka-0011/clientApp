import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Jobopening } from '../../models/jobopening';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  jobOpen!:Jobopening;
  constructor(private jobService: JobService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

ngOnInit(): void {
const jobId = this._activatedRoute.snapshot.params["jobId"];
if (jobId) {
  this.jobService.getOne(jobId).subscribe({next:(job)=>{
    if(job)
    {
      this.jobOpen=job.data;
    }
  },
  error:()=>{

  }
})
}
}
}
