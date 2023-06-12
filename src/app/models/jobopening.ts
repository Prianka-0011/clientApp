export class Jobopening {
  "_id" !: string;
  "tittle" !:string;
  "salary" !:number;
  "descriotion" !:string;
  "experience" !:number;
  "skills" !:[string];
  "postDate" !:Date;
  "location" !:Location
}
class Location{
  "longitude" ! : number;
  "latitude" !: number
}
