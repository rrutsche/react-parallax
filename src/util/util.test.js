import { getPercentage, getWindowHeight } from './util';

describe('utils', () => {
    test('getPercentage', done => {
        expect(getPercentage(0, 200, 50)).toEqual(0.25);
        expect(getPercentage(0, 0, 0)).toEqual(0);
        expect(getPercentage(0, 100, 170)).toEqual(1.7);
        expect(getPercentage(0, 100, -100)).toEqual(-1);
        done();
    });

    test('getWindowHeight', done => {
        window.resizeTo(1000, 1000);
        expect(getWindowHeight(true)).toEqual(1000);
        window.resizeTo(1100, 768);
        expect(getWindowHeight(true)).toEqual(768);
        done();
    });
});
