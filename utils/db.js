const {readFile, writeFile} = require('fs').promises; 
const {join, dirname}= require('path');
const {v4} = require('uuid');
// losowe id; i nazwe pliku z 'v4' zmieniamy na 'uuid'

class Db {
    constructor(dbFileName) {
        // this.dbFileName = './data/db.json'
        this.dbFileName = join(__dirname, '../data', dbFileName);
        this._load();
        console.log(typeof(this.dbFileName))
    }
    
    async _load(){
        this._data = JSON.parse(await readFile(this.dbFileName, 'utf8'));
    }
    
    _save(){
       writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8')     
    }
    
    create(obj){
        console.log('kurwa',typeof(this.dbFileName))
        const id = v4()
        // mozna tez ponizej id : v4() ale lepiej tak zeby moc zwrocic id i sobie z niego skorzystac
        this._data.push(
            // obj)
            {
            id ,
            ...obj,}); // wez wszystkie dane ktore chciał wstawic i dodaj jeszcze jedna info
        //rozporaszamy cała zawartość 'obj' i dodajemy kazdej pozycji id
        // writeFile(this.dbFilename, JSON.stringify(this._data), 'utf8') //- to nie działa a to niżej tak XDDD
        // writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8')
       this._save()
       return id
    }
    getall() {
        return this._data;
    }
    update(id, newObj) {
        this._data = this._data.map(oneObj => {
            if (oneObj.id === id){
                return {
                    ...oneObj,
                    ...newObj,
                }
            }
            else return oneObj
        })
        this. _save()
    }
    
    getOne(id){
        return this._data.find( oneObj => oneObj.id === id)
    }
    delete(id){
        this._data = this._data.filter(oneObj => oneObj.id !== id)
    }
}   

const db = new Db('db.json');

module.exports ={db}
// console.log(typeof(this.dbFileName))
// dbFileName2 = 'db.json'
// console.log(typeof(join(__dirname, '../data', dbFileName2)))