import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class EmailService {


  public checkEmail(email: string) {
  // simulate http.get()
  return of({ isEmailAvailable: email !== 'test@test.test'}).pipe(delay(2000));
  }
}
