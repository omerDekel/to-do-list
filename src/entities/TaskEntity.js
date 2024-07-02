export class TaskEntity {
    constructor(id, title, description, isDone,finishDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isDone = isDone;
        this.finishDate = finishDate;
    };
};