test('environment is ok', () => {
    expect(true).toBe(true);
});

test('generator supported', () => {
    class Foo {
        *[Symbol.iterator]() {
            yield * [1, 2, 3];
        }
    }

    let foo = new Foo();
    expect([...foo]).toEqual([1, 2, 3]);
});


test('async function supported', (done) => {
    function it(v) {
        return v;
    }

    async function itr() {
        return [await it(1), await it(2)];
    }

    itr().then((result) => {
        expect(result).toEqual([1, 2]);
        done();
    });
});


test('array fill support', () => {
    let array = [1, 2];
    array.fill(3);

    expect(array).toEqual([3,3]);

});