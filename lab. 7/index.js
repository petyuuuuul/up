class adItem {
    constructor({id, description, createdAt = new Date(), link, vendor, photoLink = '', hashTags, discount, validUntil = new Date(), rating = 0, reviews = []}) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.link = link;
        this.vendor = vendor;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.discount = discount;
        this.validUntil = validUntil;
        this.rating = rating; 
        this.reviews = reviews;
    }

    static _fields = ['id', 'description', 'createdAt', 'link', 'vendor', 'photoLink', 'hashTags', 'discount', 'validUntil', 'rating', 'reviews'];
}

class adCollection {
    constructor() {
        this._idx = 0;
        this._list = [];
    }
    

    getPage(skip = 0, top = 10, filterConfig = {}) {
        return this._list.slice(skip, skip + top).filter(el => {
            for(let key in filterConfig) {
                if(adItem._fields.indexOf(key.toString()) == -1) return true;
                if(el[key] != filterConfig[key]) return false;
            }
            return true;
        }).sort((el1, el2) => el1.createdAt > el2.createdAt);
    }

    get(id) {
        return this._list.find(el => el.id==id)
    }
    add(obj) {
        if(adCollection.validate(obj))  {
            this._list.push(
                new adItem( Object.assign({}, obj, {id: '' + this._idx++}) )
            );
            return true;
        }
        return false;
    }
    addAll(objs) {
        let unvalidate = [];
        for(let obj of objs) {
            if(!adCollection.validate(obj))
                unvalidate.push(obj);
            else
                this.add(obj);
        }
        return unvalidate;
    }
    remove(id) {
        const idx = this._list.findIndex(el => el.id==id);
        if(idx == -1) return false;
        this._list.splice(idx, 1);
        return true;
    }
    edit(id, editConfig) {
        for(let key in editConfig) {
            if(adItem._fields.indexOf(key.toString()) == -1) return false;
            if(key == 'vendor' || key == 'id' || key == 'createdAt') return false;
        }

        this._list.map(el => {
            if(el.id != id)
                return el;
            else
                return new adItem(Object.assign(el, editConfig));
        });
        return true;
    }
    clear() {
        this._list = [];
        this._idx = 0;
    }

    static validate({id = '', description = '', createdAt = new Date(), link = '', vendor = '', photoLink = '', hashTags = [], discount = '', validUntil = new Date(), rating = 0, reviews = []}) {
        if(vendor.length == 0) return false;
        if(!Array.isArray(hashTags)) return false;
        if(!Number.isFinite(rating)) return false;
        if((typeof id) != 'string') return false;
        if((typeof description) != 'string') return false;
        if(!(createdAt instanceof Date)) return false;
        if((typeof link) != 'string') return false;
        if((typeof vendor) != 'string') return false;
        if((typeof photoLink) != 'string') return false;
        if((typeof discount) != 'string') return false;
        if(!(validUntil instanceof Date)) return false;
        if(!(reviews instanceof Array)) return false;
        return true;
    }
}

const obj = {
    description: 'Скидка на стулья - до 15%',
    createdAt: new Date('2021-03-15T23:00:00'),
    link: 'https://coolchairs.com',
    vendor: 'Chair Service',
    photoLink: 'https://images.app.goo.gl/dgAFyP2cEduzkJUP9',
    validUntil: new Date('2021-06-01T23:00:00'),
    discount: '15%',
    hashTags: ['furniture', 'chairs']
};

// 
console.log('\x1b[36m%s\x1b[0m',"Создание adItem по объекту")
const item = new adItem(obj);
console.log(item)

console.log('\x1b[36m%s\x1b[0m',"Создадим adItem, который является не валидным")
const item_invalid = new adItem( Object.assign({}, obj, {vendor: ''}) )
console.log(item_invalid)

const collection = new adCollection();

// 
console.log('\x1b[36m%s\x1b[0m',"Проверка на правильный ID и добавление adItem в adList")
collection.add(item);
collection.add(item);
collection.add(item);
console.log(collection)

//
console.log('\x1b[36m%s\x1b[0m',"Добавим в коллекции не валидный adItem")
collection.add(item_invalid)
console.log(collection)
console.log('\x1b[36m%s\x1b[0m',"Не валидный adItem не добавился в collection")

//
console.log('\x1b[36m%s\x1b[0m',"Проверка метода GET и EDIT: поменяем у adItem с ID == '1' discount с 15% на 20%")
console.log('\x1b[36m%s\x1b[0m',"ДО:")
console.log(collection.get('1'))
collection.edit('1', {discount: '20%'})
console.log('\x1b[36m%s\x1b[0m',"ПОСЛЕ:")
console.log(collection.get('1'))

//
console.log('\x1b[36m%s\x1b[0m', "Проверка метода REMOVE: удалим adItem с ID == '1'")
console.log('\x1b[36m%s\x1b[0m', "ДО:")
console.log(collection)
collection.remove('1');
console.log('\x1b[36m%s\x1b[0m', "ПОСЛЕ:")
console.log(collection)

//
console.log('\x1b[36m%s\x1b[0m',"Проверка метода addAll и clear, для начала очистим collection")
collection.clear()
console.log('\x1b[36m%s\x1b[0m',"Добавим методом addAll")
const items = [item, item, item_invalid]
collection.addAll(items)
console.log(collection)
console.log('\x1b[36m%s\x1b[0m',"Один из adItem был не валидным и он опять же добавился в collection")

//
console.log('\x1b[36m%s\x1b[0m', "Проверим последний метод GETPAGE, он такой же как и в ЛАБ 6")
console.log('\x1b[36m%s\x1b[0m',"1) с 0 по 3 Ads у которых discount == '15%'")
collection.edit('1', {discount: '20%'})
console.log(collection.getPage(0,3, {discount: '20%'}))

console.log('\x1b[36m%s\x1b[0m',"2) с 0 по 1 Ads с отсуствующим фильтром")
console.log(collection.getPage(0,2, {pl: '15%'}))