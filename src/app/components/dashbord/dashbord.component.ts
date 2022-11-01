import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  
  editTaskValue: string = '';
  constructor(private svc: CrudService) {

  }

  ngOnInit(): void {
    this.addTaskValue = '';
  
  this.editTaskValue= '';
    this.taskObj = new Task(); 
    this.taskArr = [];
    this.getAllTasks()
  }
  getAllTasks() {
    this.svc.getAllTask().subscribe(
      (data) => {
        this.taskArr = data;
      }, (err) => {
        alert('get all data err');
      }
    )
  }
  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.svc.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = ''
      }, (err) => {
        alert('err add new task')
      }
    )
  }
  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.svc.editTask(this.taskObj).subscribe((res) => {
      this.ngOnInit()
    }, (err) => {
      alert('err edit form')
    }

    )
  }

  deleteTask(task: Task) {
    this.svc.deleteTask(task).subscribe(
      (data) => {
        this.ngOnInit()
      }, (err) => {
alert('failed to delete')
      }
    )
  }

  call(ediTsk : Task){
  this.taskObj = ediTsk;
  this.editTaskValue = ediTsk.task_name;
  }
}
