import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Jobopening } from 'src/app/models/jobopening';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent {
  jobForm !:FormGroup
  constructor(private fromBuilder : FormBuilder,private jobService:JobService,private router:Router){
    this.jobForm = this.fromBuilder.group({
      tittle:["",  Validators.required],
      salary:["" , Validators.required],
      description:["",  Validators.required],
      experience:["", Validators.required],
      location: this.fromBuilder.group({
        cordinators:this.fromBuilder.array([
          ["", Validators.required],
          ["", Validators.required]
        ])
      }),

      skills:["",Validators.required],
      postDate: [new Date()]
    })
  }
  addNewJob() {
    const fromData=this.jobForm.value;
     if(fromData.skills)
     {
      fromData.skills=fromData.skills.split(",")
     }
console.log("I am here")
    this.jobService.save(fromData).subscribe({
      next:(job:any)=>{
        console.log(job);

        alert("job success!")
        this.router.navigate(["jobs/"+job.data._id])
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}

