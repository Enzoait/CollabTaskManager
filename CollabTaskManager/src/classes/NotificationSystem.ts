interface Observer {
    update(state: string): void;
}

class Subject {
    private observers: Observer [] = []; 
    private state: string = "";
    attach(observer: Observer): void {
        this.observers.push(observer);
    }
    detach(observer: Observer): void {
        this.observers = this.observers.filter(o=> o !== observer);
    }
    notify(): void {
        for (const observer of this.observers) {
            observer.update(this.state);
        }

    }
    setState(state: string): void {
        this.state = state;
        this.notify();
    }
}

class ConcreteObserver implements Observer {
    update(state: string): void {
        alert(`${state}`);
    }
}

const subject = new Subject();
const taskCreationObserver = new ConcreteObserver(); 
const taskDoneObserver = new ConcreteObserver();

function notifyTaskCreated(name : string) : void {
    subject.attach(taskCreationObserver);
    subject.detach(taskDoneObserver);
    subject.setState(`Task ${name} created.`);
    subject.detach(taskCreationObserver);
}

function notifyTaskDone(name : string) : void {
    subject.attach(taskDoneObserver);
    subject.detach(taskCreationObserver);
    subject.setState(`Task ${name} done !`);
    subject.detach(taskDoneObserver);
}

export {notifyTaskCreated, notifyTaskDone}