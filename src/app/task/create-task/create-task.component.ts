import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  createTaskForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  submitted = false;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const subscription = this.authService.getUser().subscribe();
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get createTaskFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.createTaskForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.createTaskForm.invalid) {
      return;
    }

    const subscription = this.taskService.createTask(this.createTaskForm.value).subscribe(() => {
      this.router.navigate(['tasks']);
    });
    this.subscriptions.push(subscription);
  }
}
