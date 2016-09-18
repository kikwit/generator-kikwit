import { service, inject } from 'kikwit';

@service('adder') /* makes the Adder class 'injectable' into controllers and other services using @inject('adder') */
export class Adder {

    add(a, b) {
           
        return a + b;
    }
}
