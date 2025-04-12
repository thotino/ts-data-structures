const { Stack } = require('.');
describe('[unit] Stack', () => {
    test('Should be empty at initialization', () => {
        const stack = new Stack();
        expect(stack.isEmpty()).toBeTruthy();
    });
    test('Should add an element at the top', () => {
        const stack = new Stack();
        stack.push('pears');
        expect(stack.isEmpty()).toBeFalsy();
        expect(stack.peek()).toEqual('pears');
    });
    test('Should remove all the elements', () => {
        const stack = new Stack();
        stack.push('pears');
        stack.push('apples');
        stack.push('oranges');
        stack.pop();
        stack.pop();
        stack.pop();
        expect(stack.isEmpty()).toBeTruthy();
    });
});
export {};
