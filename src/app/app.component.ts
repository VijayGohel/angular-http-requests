import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post("https://angular-http-1fd8a-default-rtdb.firebaseio.com/post.json",postData)
      .subscribe(responseData=>
        console.log(responseData));
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  private fetchPosts()
  {
    this.http
    .get("https://angular-http-1fd8a-default-rtdb.firebaseio.com/post.json")
    .pipe(
      map(resopnseData=>{
        const postArray=[];
        for(const key in resopnseData)
        {
          if(resopnseData.hasOwnProperty(key)){
            postArray.push({...postArray[key],id:key})
          }
        }
      }

      )
    )
    .subscribe(respose=>
      console.log(respose));
  }

  onClearPosts() {
    // Send Http request
  }
}
