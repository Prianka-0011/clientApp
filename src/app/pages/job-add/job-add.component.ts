import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jobopening } from 'src/app/models/jobopening';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent {
  jobForm !:FormGroup
  constructor(private fromBuilder : FormBuilder,private jobService:JobService){
    this.jobForm = this.fromBuilder.group({
      tittle:["",  Validators.required],
      salary:["" , Validators.required],
      description:["",  Validators.required],
      experience:["", Validators.required],
      location: this.fromBuilder.group({
        longitude: ["", Validators.required],
        latitude: ["", Validators.required],
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
      next:(job)=>{
        console.log(job);
        alert("job success!")
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}

