import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;
  statusOptions = ['Stable', 'Critical', 'Finished'];
  forbiddenName = ['Test']

  ngOnInit(){
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenProjectNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.asyncForbidden),
      'status': new FormControl(null, Validators.required)

    })
  }

  onSubmit(){
    console.log(this.projectForm)
  }

  forbiddenProjectNames(control: FormControl): {[e: string]: boolean}{
    if(this.forbiddenName.indexOf(control.value) !== -1){
      return {'ForbiddenProjectName': true};
    } else {
      return null
    }
  }

  asyncForbidden(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
          setTimeout(() => {
            if (control.value === 'test@test.com'){
              resolve({'emailIsForbidden': true});
            } else {
              resolve(null);
            }
          }, 1500)
        });
        return promise;
  }


  // genders = ['male', 'female'];
  // signUpForm: FormGroup;
  // forbiddenUsername = ['Chris', 'Anna'];

  // ngOnInit(){
  //   this.signUpForm = new FormGroup({
  //     'userData': new FormGroup({
  //       'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
  //       'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmais),
  //     }),
  //     'gender': new FormControl('male'),
  //     'hobbies': new FormArray([])
  //   });
  //   // this.signUpForm.valueChanges.subscribe(
  //   //   (value) => {console.log(value)}
  //   // );
  //   this.signUpForm.statusChanges.subscribe(
  //     (value) => {console.log(value)}
  //   );

  //   this.signUpForm.setValue({
  //     'userData': {
  //       'username': 'Max',
  //       'email': 'Max@test.com'
  //     },
  //     'gender': 'male',
  //     'hobbies': []
  //   })

  //   this.signUpForm.patchValue({
  //     'userData': {
  //       'username': 'Anna',
  //     },
  //   })
  // }

  // onSubmit(){
  //   console.log(this.signUpForm);
  //   this.signUpForm.reset();
  // }

  // onAddHobby(){
  //   const control = new FormControl(null, Validators.required);
  //   (<FormArray>this.signUpForm.get('hobbies')).push(control);
  // }

  // getControls() {
  //   return (<FormArray>this.signUpForm.get('hobbies')).controls;
  // }

  // forbiddenNames(control: FormControl): {[s: string]: boolean} {
  //   if(this.forbiddenUsername.indexOf(control.value) !== -1){
  //     return {'nameIsForbidden': true};
  //   }
  //   return null;
  // }

  // forbiddenEmais(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@test.com'){
  //         resolve({'emailIsForbidden': true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1500)
  //   });
  //   return promise;
  // }
}
