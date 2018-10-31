

export class DataBase {

    constructor() {
        let store = window.localStorage || null;
        if (store) {
            this.store = store
        } else {
            throw new Error('Can not connect to DB: window.localstorage is : ', store)
        }
    }

    setStudentTable(dbName, students) {
        this.store.removeItem(dbName);
        this.store.setItem(dbName, JSON.stringify(students))
    }

    addItem(dbName, student) {
        const allDBItems = this.getItems(dbName)
        
        if(allDBItems) {
            allDBItems.push(student)
            this.store.setItem(dbName, JSON.stringify(allDBItems))
        } else {
            this.store.setItem(dbName, JSON.stringify(student))
        }
    }
    getItems(dbName) {
        return JSON.parse(this.store.getItem(dbName));
    }
}