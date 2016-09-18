import test from 'tape';
 
test('timing test', (t) => {
    t.plan(2);
    
    t.equal(typeof Date.now, 'function');

    const expected = 'SomeVal';
    
    setTimeout(() => {
        t.equal('SomeVal', expected);
    }, 250);
});
