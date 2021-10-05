

// export function existsValidator (control : AbstractControl): {[key: string]: any} | null {
//     const exists = /test@test.test/.test(control.value);
//     return exists ? { 'existsName': {value: control.value}} : null;  
// }

import { FormControl } from "@angular/forms";
import { timer } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { EmailService } from "./email.service";


export const emailAsyncValidator = (emailService: EmailService, time: number = 500) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => emailService.checkEmail(input.value)),
        map(res => {
          return res.isEmailAvailable ? null : { emailExist: true }
        })
      );
    };
  };