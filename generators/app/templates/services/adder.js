import { service } from 'kikwit';

@service('adder') /* makes the Adder class 'injectable' using @inject('adder') */
export class Adder {

    add(a, b) {
    
        return a + b;
    }
}