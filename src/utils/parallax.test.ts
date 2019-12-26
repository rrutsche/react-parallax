import { getPercentage } from './parallax';

describe('Utils.parallax', () => {
    test('getPercentage', done => {
        expect(getPercentage(0, 200, 50)).toEqual(0.25);
        expect(getPercentage(0, 0, 0)).toEqual(0);
        expect(getPercentage(0, 100, 170)).toEqual(1.7);
        expect(getPercentage(0, 100, -100)).toEqual(-1);
        done();
    });
});
