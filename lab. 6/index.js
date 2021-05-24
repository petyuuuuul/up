// ad item
const adItem = {
    id: '',
    description: '',
    createdAt: new Date(),
    link: '',
    vendor: '',
    photoLink: '',
    hashTags: [],
    discount: '',
    validUntil: new Date(),
    rating: 0,
    reviews: []
}
const createAdItem = (object) => {
    const item = Object.assign({}, adItem, object);
    item.createdAt = new Date();
    item.validUntil = new Date();
    item.reviews = new Array();
    item.hashTags = new Array();
    return item;
}

// ad list
const adList = {
    _list: [],
    _idx: 0,

    getAds(skip = 0, top = 10, filterConfig = {}) {
        return this._list.slice(skip, skip + top).filter(el => {
            for(let key in filterConfig) {
                if(!adItem.hasOwnProperty(key)) return true;
                if(el[key] != filterConfig[key]) return false;
            }
            return true;
        }).sort((el1, el2) => el1.createdAt > el2.createdAt);
    },
    getAd(id) {
        return this._list.find(el => el.id==id)
    },
    addAd(object) {
        if(this.validateAdd(object))  {
            this._list.push(
                createAdItem( Object.assign({}, object, {id: '' + this._idx++}) )
            );
            return true;
        }
        return false;
    },
    editAdd(id, editConfig) {
        for(let key in editConfig) {
            if(!adItem.hasOwnProperty(key)) return false;
            if(key == 'vendor' || key == 'id' || key == 'createdAt') return false;
        }

        this._list.map(el => {
            if(el.id != id)
                return el;
            else
                return Object.assign(el, editConfig);
        });
        return true;
    },
    removeAd(id) {
        const idx = this._list.findIndex(el => el.id==id);
        if(idx == -1) return false;
        this._list.splice(idx, 1);
        return true;
        
    },
    validateAdd({id = '', description = '', createdAt = new Date(), link = '', vendor = '', photoLink = '', hashTags = [], discount = '', validUntil = new Date(), rating = 0, reviews = []}) {
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
const createAdList = () => {
    const list = Object.assign({}, adList);
    list._list = new Array()
    return list;
}


const item = createAdItem({
    description: 'Скидка на стулья - до 15%',
    createdAt: new Date('2021-03-15T23:00:00'),
    link: 'https://coolchairs.com',
    vendor: 'Chair Service',
    photoLink: 'https://images.app.goo.gl/dgAFyP2cEduzkJUP9',
    validUntil: new Date('2021-06-01T23:00:00'),
    discount: '15%',
    hashTags: ['furniture', 'chairs']
})

// CREATE LIST
let list = createAdList();

// ADD
console.log('\x1b[36m%s\x1b[0m',"Проверка на правильный ID и добавление Ad в AdList")
list.addAd(item)
list.addAd(item)
list.addAd(item)
list.addAd(item)

// EDIT
console.log('\x1b[36m%s\x1b[0m',"Проверка работы методов GETAD и EDIT, который меняет discount с 15% на 20% у Ad с ID == '0'");
console.log('\x1b[36m%s\x1b[0m',"ДО:")
console.log(list.getAd('0'))
console.log(list.editAdd('0', {discount: '20%'}))
console.log('\x1b[36m%s\x1b[0m',"ПОСЛЕ:")
console.log(list.getAd('0'))

// REMOVE
console.log('\x1b[36m%s\x1b[0m',"Проверка работы метода REMOVE по ID == '1'")
console.log('\x1b[36m%s\x1b[0m',"ДО:")
console.log(list._list)
console.log(list.removeAd('1'))
console.log('\x1b[36m%s\x1b[0m',"ПОСЛЕ:")
console.log(list._list)

// GETADS
console.log('\x1b[36m%s\x1b[0m',"Проверяем работу метода GETADS, который возвращет с i по j Ads по фильтру если он присутствует")
console.log('\x1b[36m%s\x1b[0m',"1) с 1 по 3 Ads у которых discount == '15%'")
console.log(list.getAds(1,3, {discount: '15%'}))

console.log('\x1b[36m%s\x1b[0m',"2) с 0 по 2 Ads с отсуствующим фильтром")
console.log(list.getAds(0,2, {pl: '15%'}))