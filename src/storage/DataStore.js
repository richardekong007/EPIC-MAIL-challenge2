
export default class DataSore {
    constructor() {
        this.store = [{}];
    }

    save(id, object) {

        this.store.push({
            'id': id,
            'record': object
        });
    }

    read(id) {
        let record = {};
        this.store.forEach((entry)=>{
            if (id === entry.id)
                record = entry;
        });

        return record;
    }
}