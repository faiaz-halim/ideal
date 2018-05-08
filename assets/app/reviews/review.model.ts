export class Review {
  id:string;
  name:string;
  carMake:string;
  carModel:string;
  rating:number;
  myReview:string;
  comment:string;
  commentBy:string;
  status:string;

  constructor(id:string, name:string, carMake:string, carModel:string, rating: number,
              myReview:string, comment:string, commentBy:string, status:string){
     this.id = id;
     this.name = name;
     this.carMake = carMake;
     this.carModel = carModel;
     this.rating = rating;
     this.myReview = myReview;
     this.comment = comment;
     this.commentBy = commentBy;
     this.status = status;
  }
}
