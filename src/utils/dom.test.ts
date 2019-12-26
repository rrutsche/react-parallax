import { getWindowHeight } from './dom';

describe('Utils.dom', () => {
    test('getWindowHeight', done => {
        window.resizeTo(1000, 1000);
        expect(getWindowHeight(true)).toEqual(1000);
        window.resizeTo(1100, 768);
        expect(getWindowHeight(true)).toEqual(768);
        done();
    });
});
