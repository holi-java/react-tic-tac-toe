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

    expect(array).toEqual([3, 3]);
});


test("spread object", () => {
    let foo = {bar: 'bar'};
    let target = {...foo};

    expect(target).not.toBe(foo);
    expect(target).toEqual(foo);

});

test("array assignment", () => {
    let array = [1, 2, 3];

    let b = array[1] = 5;

    expect(b).toBe(5);
});


test('array slice', function () {
    let array = [1, 2, 3];
    expect(array.slice(1, 2 + 1)).toEqual([2, 3]);
});