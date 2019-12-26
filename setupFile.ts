/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSDOM } from 'jsdom';

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
const globalAny = global as any;
globalAny.document = new JSDOM(documentHTML, { pretendToBeVisual: true });
globalAny.window = globalAny.document.parentWindow;

globalAny.window.resizeTo = (width: number, height: number) => {
    globalAny.window.innerWidth = width || globalAny.window.innerWidth;
    globalAny.window.innerHeight = height || globalAny.window.innerHeight;
    globalAny.window.dispatchEvent(new Event('resize'));
};
