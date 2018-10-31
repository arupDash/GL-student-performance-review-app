import { DataBase } from '../database/db';
import StudentDesc from '../models/student-desc';
import uuid4 from 'uuid4';

export class StorageService {

    constructor() {
        this.DB_NAME = 'students';
        this.db = new DataBase();
    }

    initializeDB() {
        const initialData = [
            { id: uuid4(), name: 'Arup', score: 30 },
            { id: uuid4(), name: 'Dash', score: 30 },
            { id: uuid4(), name: 'Kumar', score: 30 }
        ]
        this.db.setStudentTable(this.DB_NAME, initialData)
    }

    addItem(student) {
        if (typeof (student) === "object" && student.name && student.score) {
            student.id = uuid4();
            this.db.addItem(this.DB_NAME, student)
        } else {
            throw new Error('DB err : student does not have one of id, name, score -->> student ', student)
        }
    }

    removeItem(id) {
        let items = this.db.getItems(this.DB_NAME);
        const filteredItems = items.filter(std => {
            if(std.id !== id) return std
            return null;
        })
        this.db.setStudentTable(this.DB_NAME, filteredItems);
    }

    changeItem(student) {
        let items = this.db.getItems(this.DB_NAME);
        const filteredItems = items.map(std => {
            if(std.id !== student.id) return std
            return student;
        })
        this.db.setStudentTable(this.DB_NAME, filteredItems);
    }
    // removeAllItems() {
    //     this.db.clear();
    // }

    getAllStudents() {
        const students = this.db.getItems(this.DB_NAME);
        if (students) {
            return students.map(student => {
                return new StudentDesc(student.id, student.name, student.score)
            })
        } else {
            // return null;
        }
    }
}