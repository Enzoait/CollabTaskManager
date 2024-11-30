abstract class TaskFactory {
  abstract createTask(id: string, name: string, description: string, status: boolean, nbrStatus : number, date: Date, timeLeft?: number): Task;
}

export interface Task {
  id : string;
  name : string;
  description: string;
  status : boolean;
  nbrStatus : number;
  date : Date;
  timeLeft?: number;
}

class RegularTask implements Task {
  id: string;
  name: string;
  description: string;
  status: boolean;
  nbrStatus : number;
  date: Date;

  constructor(id: string, name: string, description: string, status: boolean, nbrStatus : number, date: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.nbrStatus = nbrStatus;
    this.date = date;
  }
}

class TimedTask implements Task {
  id: string;
  name: string;
  description: string;
  status: boolean;
  nbrStatus : number;
  timeLeft: number;
  date: Date;

  constructor(id: string, name: string, description: string, status: boolean, nbrStatus : number, timeLeft: number, date: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.nbrStatus = nbrStatus;
    this.timeLeft = timeLeft;
    this.date = date;
  }
}

class TaskFactoryRegular extends TaskFactory {
  createTask(id: string, name: string, description: string, status: boolean, nbrStatus : number, date: Date): RegularTask {
    return new RegularTask(id, name, description, status, nbrStatus, date);
  }
}

class TaskFactoryTimed extends TaskFactory {
  createTask(id: string, name: string, description: string,  status: boolean, nbrStatus : number, date: Date, timeLeft: number): TimedTask {
    return new TimedTask(id, name, description, status, nbrStatus, timeLeft, date);
  }
}

const regularTask : TaskFactory = new TaskFactoryRegular();
const timedTask : TaskFactory = new TaskFactoryTimed();

export { regularTask, timedTask };
