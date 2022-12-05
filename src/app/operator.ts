



export class Exercise {
  
   ops: Operator[] = [];
   
   public calcAll() {

    let ops = [];
    let valid = true;
    do {

      valid = true;
     let state = new CalcState();
     ops = [];
      ops.push( new OPStart() );
      ops.push( Gen.create() );
      ops.push( Gen.create() );
      ops.push( Gen.create() );
      ops.push( Gen.create() );

      ops.forEach( e=>e.init());

     let valueHistory = ["0"]; 
     for ( let i =0; i< ops.length-1; i++) {
       console.log(""+i+":"+ops[i].getText());
       valid = valid && ops[i].calc(state)
       && (state.stringValue != valueHistory[i])
       && (state.stringValue.length < 4)
       && (valueHistory.indexOf(state.stringValue) == -1);
       console.log(""+i+":"+state.stringValue);
       valueHistory.push(state.stringValue);
       if (!valid)
        break;
     }

     for ( let i =0; i< ops.length-1; i++) {
      console.log(""+i+":"+ops[i].getText());
     }

    console.log( "String:"+state.stringValue )

  } while (!valid)
  return ops;
   }
}

export class Gen {
  public static create(): Operator {
    let x = Math.floor(Math.random()*6);
    let strname = Store2[x];
    let tesla: any = new DynamicClass(strname);
    //console.log(`Type of object \'tesla\':${tesla.constructor['name']}`);

    return tesla;
  }
}

export class Operator {
  
  operand1 =1+Math.floor(Math.random()*9);

  public init() { }

  public getText() :string {
    return "";
  }

  public calc(state: object):boolean {
    return false;
  }
}

export class OPStart extends Operator {
  operand1 =1+Math.floor(Math.random()*25);

  public getText() {
    return "Starte mit "+this.operand1;
  }
  public calc(state: CalcState):boolean {
    state.setNumber(this.operand1);
    return true;
  }
}

export class OPAdd extends Operator {

  public getText() {
    return "Addiere mit "+this.operand1;
  }

  public calc(state: CalcState):boolean {
    state.setNumber(state.numberValue + this.operand1);
    return true;
  }
}
export class OPMultiply extends Operator {
  operand1 =1+Math.floor(Math.random()*6);
  public getText() {
    return "Multipliziere mit "+this.operand1;
  }

  public calc(state: CalcState):boolean {
    state.setNumber(state.numberValue * this.operand1);
    return true;
  }
}

export class OPAddDigit extends Operator {

  left = (Math.random()*2) < 1;

  public getText() {
    if (!this.left) {
      return "Füge "+this.operand1+" rechts an"; 
    } else {
      return "Füge "+this.operand1+" links an"; 
    }
  }

  public calc(state: CalcState):boolean {
    if ( this.left)
      state.setString(""+this.operand1+state.stringValue);
    else
      state.setString(state.stringValue+ this.operand1);
    return true;
  }
}

export class OPRemoveDigit extends Operator {

  left = (Math.random()*2) < 1;

  public getText() {
    if (!this.left) {
      return "Entferne die Ziffer rechts."; 
    } else {
      return "Entferne die Ziffer links."; 
    }
  }

  public calc(state: CalcState):boolean {
    if ( state.stringValue.length < 2)
      return false;
    if (!this.left) {
      state.setString(state.stringValue.substring(0,state.stringValue.length-2));
    } else {
      state.setString(state.stringValue.substring(1)); 
    }
    return true;
  }
}

export class OPSwapDigits extends Operator {

  public getText() {
    return "Tausche erste und letzte Ziffer.";
  }

  public calc(state: CalcState):boolean {
    if ( state.stringValue.length < 2)
      return false;
    if (state.stringValue.endsWith("0"))
      return false;

    let s = state.stringValue;

    var arr = s.split('');
    var temp = arr[0];
    arr[0] = arr[arr.length-1];
    arr[arr.length-1] = temp;

    state.setString(arr.join(''));

    return true;
  }
}

export class OPSumOfDigits extends Operator {

  public getText() {
    return "Bilde die Quersumme";
  }

  public calc(state: CalcState):boolean {

    if ( state.stringValue.length < 2)
      return false;

    let value = state.numberValue;
    let sum = 0;
    while (value) {
      sum += value % 10;
      value = Math.floor(value / 10);
    }
    state.setNumber( sum );
    return true;
  }
}

export class CalcState {
  numberValue =0;
  stringValue ="0";

  setNumber( value :number) {
    this.numberValue = value;
    this.stringValue = ""+ value.toFixed(0) ;
  }
  setString( value :string) {
    this.stringValue = value;
    this.numberValue = parseInt(value);
  }

  toString() {
    return JSON.stringify(this);
  }
}
/*
const tpl =  makeTemplate('hello ${name}')
const name = 'world';
console.log(tpl({name}));
*/

/*
while (value) {
    sum += value % 10;
    value = Math.floor(value / 10);
}
*/

export class DynamicClass {
  constructor(className: string) {
      if (Store[className] === undefined || Store[className] === null) {
          throw new Error(`Class type of \'${className}\' is not in the store`);
      }
      return new Store[className]();
  }
}

export const Store: any = {
  OPAdd,
  OPMultiply,
  OPAddDigit,
  OPSumOfDigits,
  OPRemoveDigit,
  OPSwapDigits
}

export const Store2: any = [
  'OPAdd',
  'OPMultiply',
  'OPAddDigit',
  'OPSumOfDigits',
  'OPRemoveDigit',
  'OPSwapDigits'
]