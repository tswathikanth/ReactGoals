import Realm from 'realm';

class Timeline extends Realm.Object {}
Timeline.schema = {
 name:'Timeline',
 properties:{
   message:{type:'string'},
   creationDate:{type:'date'},
 },
};

class Person extends Realm.Object {}
Person.schema = {
 name:'Person',
 primaryKey: 'id',
 properties:{
   id:'int',
   message:'string',
   creationDate:{type:'date'},
   selectDate:{type:'date'},
   conditionCheck:{type:'bool'},
   timeline:{type:'list',objectType:'Timeline'},
 },
};

export default new Realm({schema:[Timeline,Person]});