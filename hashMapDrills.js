'use strict';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._capacity = initialCapacity;
    this._slots = [];
    this.deleted = 0;
  }
  
  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    // find the index
    const index = this._findSlot(key);
    // if slot is empty, throw error
    if (this._slots[index] === undefined) {
      throw new Error('key error');
    }
    // return the value at that slot
    return this._slots[index].value;
  }

  set(key, value) {
    // figure out load ratio
    const loadRatio = (this.length +this._deleted + 1) / this._capacity;
    // if loadRatio bigger than MAX_LOAD_RATIO resize the hashmap
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this.resize(this._capacity * HashMap.SIZE_RATIO);
    }
    // use findSlot function to hash key and find matching slot
    const index = this._findSlot(key);
    // set the slot's value to key:value
    this._slots[index] = {
      key, 
      value,
      deleted: false
    };
    this.length++;
  }

  _findSlot(key) {
    // hash key and get value
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    // loop through map starting at 'start' to find an empty slot
    for (let i=start; i<start+this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      // if the slot is empty, return it, otherwise loop to the next slot until an empty one is found
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    } 
  } 
  
  resize(size) {
    // recreate hash map from scratch with larger capacity
    // copy old slots
    const oldSlots = this._slots;
    // set new capacity
    this._capacity = size;
    // reset the length and slots
    this.length = 0;
    this._slots = [];
    this._deleted = 0;

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }
  
  remove(key) {
    // find the index
    const index = this._findSlot(key);
    // find the slot
    const slot = this._slots[index];
    // if slot is empty, throw error
    if (slot === undefined) {
      throw new Error('key error');
    }
    // set the delete property to true
    slot.deleted = true;
    // decrese the.length
    this.length--;
    // increase the.deleted
    this.deleted++;
  }
}
    
HashMap.SIZE_RATIO = 3;
HashMap.MAX_LOAD_RATIO = .9;

const lor = new HashMap();

lor.set('Hobbit', 'Bilbo');
lor.set('Tauhida', 'Frodo');

console.log(lor);

// {Hobbit:"Bilbo"}, {Hobbit:"Frodo"}, {Wizard:"Gandolf"}, 
// {Human:"Aragon"}, {Elf: "Legolas"}, {Maiar:"The Necromancer"}, 
// {Maiar: "Sauron"}, {RingBearer: "Gollum"}, {LadyOfLight: "Galadriel"}, 
// {HalfElven: "Arwen"}, {Ent: "Treebeard"}