export default class DataSore {

    static dataStore = null;

    constructor() {
        this.store = [];
    }

    exists(id, newRecord) {
        let exists = false;
        const oldRecord = this.read(id);
        if (oldRecord) {
            const oldRecordValues = Object.values(oldRecord);
            const newRecordValues = Object.values(newRecord);
            if (oldRecordValues.length === newRecordValues.length) {
                oldRecordValues.forEach((item, index) => {
                    if (item === newRecordValues[index]) {
                        exists = true;
                    }
                });
            }
        }
        console.log(exists);
        return exists;
    }

    save(id, object) {
        if (!this.exists(id, object)) {
            this.store.push({
                'data': object
            });
        }
    }

    read(id) {
        let data = null;
        this.store.forEach((entry) => {
            if (id === entry.data.id)
                data = entry.data;
        });

        return data;
    }

    findByField(field, value) {
        //determine if the field exist in the store
        let found = false;
        if (this.store.length > 0){

            let keys = Object.keys(this.store[0]);
            keys.forEach((key) => {
                if (field === key) {
                    this.store.forEach(record => {
                        found = (record[field] === value);
                    });
                }
            });
        }
        return found;
    }

    static getInstance() {
        if (!this.dataStore) {
            this.dataStore = new DataSore();
        }
        return this.dataStore;
    }
}