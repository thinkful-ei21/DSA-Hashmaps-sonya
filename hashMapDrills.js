'use strict';

// class HashMap {
//   constructor(initialCapacity=8) {
//     this.length = 0;
//     this._capacity = initialCapacity;
//     this._slots = [];
//     this._deleted = 0;
//   }
  
//   static _hashString(string) {
//     let hash = 5381;
//     for (let i=0; i<string.length; i++) {
//       hash = (hash << 5) + hash + string.charCodeAt(i);
//       hash = hash & hash;
//     }
//     return hash >>> 0;
//   }

//   get(key) {
//     // find the index
//     const index = this._findSlot(key);
//     // if slot is empty, throw error
//     if (this._slots[index] === undefined) {
//       throw new Error('key error');
//     }
//     // return the value at that slot
//     return this._slots[index].value;
//   }

//   set(key, value) {
//     // figure out load ratio
//     const loadRatio = (this.length +this._deleted + 1) / this._capacity;
//     // if loadRatio bigger than MAX_LOAD_RATIO resize the hashmap
//     if (loadRatio > HashMap.MAX_LOAD_RATIO) {
//       this._resize(this._capacity * HashMap.SIZE_RATIO);
//     }
//     // use findSlot function to hash key and find matching slot
//     const index = this._findSlot(key);
//     // console.log(value, index);
//     // set the slot's value to key:value
//     this._slots[index] = {
//       key, 
//       value,
//       deleted: false
//     };
//     if (!this._slots[index]) { 
//       this.length++; 
//     }
//   }


//   _findSlot(key) {
//     const hash = HashMap._hashString(key);
//     const start = hash % this._capacity;

//     for (let i=start; i<start + this._capacity; i++) {
//       const index = i % this._capacity;
//       const slot = this._slots[index];
//       if (slot === undefined || (slot.key === key && !slot.deleted)) {
//         return index;
//       }
//     }
//   }

//   _resize(size) {
//     const oldSlots = this._slots;
//     this._capacity = size;
//     // Reset the length - it will get rebuilt as you add the items back
//     this.length = 0;
//     this._deleted = 0;
//     this._slots = [];

//     for (const slot of oldSlots) {
//       if (slot !== undefined && !slot.deleted) {
//         this.set(slot.key, slot.value);
//       }
//     }
//   }
  
//   remove(key) {
//     // find the index
//     const index = this._findSlot(key);
//     // find the slot
//     const slot = this._slots[index];
//     // if slot is empty, throw error
//     if (slot === undefined) {
//       throw new Error('key error');
//     }
//     // set the delete property to true
//     slot.deleted = true;
//     // decrese the.length
//     this.length--;
//     // increase the.deleted
//     this._deleted++;
//   }
// }
    
// HashMap.SIZE_RATIO = 3;
// HashMap.MAX_LOAD_RATIO = 0.9;

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key Error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    // console.log(value, index);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };

    // if (!this._slots[index]) {
    this.length++;
  //  } 
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key Error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const lor = new HashMap();

lor.set('Hobbit', 'Bilbo');
lor.set('Hobbit', 'Frodo');
lor.set('Wizard', 'Gandolg');
lor.set('Human', 'Aragon');
lor.set('Elf', 'Legolas');
lor.set('Maiar', 'The Necromancer');
lor.set('Maiar', 'Sauron');
lor.set('RingBearer', 'Gollum');
lor.set('LadyOfLight', 'Galadriel');
lor.set('HalfElven', 'Arwen');
lor.set('Ent', 'Treebeard');

//console.log(lor);

function permutationPal(str) {
  // create a hash map
  const PP = new HashMap();
  // set each letter of the str to a location in the map
  // if the letter already exists in the map increase its value
  for (const char of str) {
    let num;
    try {
      num = PP.get(char);
    }
    catch (err) {
      num = 0;
    }
    PP.set(char, num + 1);
  }
  // if string is empty throw error
  if (PP.length === 0) {
    throw new Error('empty hash map');
  }
  // loop through the hash map and count odd values
  let oddCounter = 0;
  for (const char of str) {
    if (PP.get(char) % 2 !== 0) {
      oddCounter++;
    }
    if (oddCounter > 1 ) {
      return false;
    } 
  } 
  return true;
}
//   console.log(permutationPal('adamm'));

function anagramGrouping(arr) {
  // input ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
  // output [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
  let HM = new HashMap();
  let keys = [];
  // take first item in array and sort alphabetically, search hash map for key 
  // and if it does not exist, set it to an empty array and push item to that array
  for (let item of arr) {
    let key = item.split('').sort().join('');
    try {
      let prevArr = HM.get(key);
      HM.set(key, [...prevArr, item]);
    } catch (err) {
      HM.set(key, [item]);
      keys.push(key);
    } 
  }
  let finalArr = [];
  //console.log(keys);
  for (let key of keys) {
    finalArr.push(HM.get(key));
  }
  return finalArr;
}


console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));