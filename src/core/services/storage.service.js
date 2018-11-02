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

    removeItems(removeStudents) {
        let filteredStudents = [];
        let existingStudents = this.db.getItems(this.DB_NAME);
        // console.log(existingStudents);

        filteredStudents=  existingStudents.filter(rStd => {
            if(!this.ifExist(removeStudents, rStd)) return rStd  
            else {
                return null;
            }
        });
        console.log(existingStudents, removeStudents, filteredStudents);
        this.db.setStudentTable(this.DB_NAME, filteredStudents);
    }

    changeItem(student) {
        let items = this.db.getItems(this.DB_NAME);
        const filteredItems = items.map(std => {
            if (std.id !== student.id) return std
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

    ifExist = (arr, student) => {
        let exist;
        arr.forEach((std) => {
            if (student.id === std.id) exist = true;
        })
        return exist;
    }
}