import { service } from 'kikwit';

@service('adder')
export class Adder {

    add(a, b) {
    
        return a + b;
    }
}