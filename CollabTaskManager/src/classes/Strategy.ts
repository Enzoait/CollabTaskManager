import { Task } from "./TaskFactory"

interface Strategy {
    sortTasks(tasks: Task[]): Task[]
}

export class AlphabeticalStrategy implements Strategy {
    sortTasks(tasks: Task[]): Task[] {
        return tasks.sort((task1, task2) => task1.name.localeCompare(task2.name));
    }
}

export class ChronologicalStrategy implements Strategy {
    sortTasks(tasks: Task[]): Task[] {
        return tasks.sort((task1, task2) => task1.date.getTime() - task2.date.getTime());
    }
}

export class TimeLeftStrategy implements Strategy {
    sortTasks(tasks: Task[]): Task[] {
        return tasks.sort((task1, task2) => task1.timeLeft! - task2.timeLeft!);
    }
}

export class DoneStrategy implements Strategy {
    sortTasks(tasks: Task[]): Task[] {
        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].status === true) {
                tasks[i].nbrStatus = 1;
            }
            else {
                tasks[i].nbrStatus = 0;
            }
        }
        return tasks.sort((task1, task2) => task1.nbrStatus - task2.nbrStatus);
    }
}

class Context {
    private strategy: Strategy | null = null;
  
    setStrategy(strategy: Strategy) {
      this.strategy = strategy;
    }
  
    executeStrategy(tasks: Task[]): Task[] {
        if (this.strategy === null) {
            throw new Error('Strategy is not set');
        }
        return this.strategy.sortTasks(tasks);
    }
}

const context = new Context();

export { context };