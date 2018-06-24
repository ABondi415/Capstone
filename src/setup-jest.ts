import 'sinon';
import 'jest-localstorage-mock';
import 'jest-preset-angular';

Object.defineProperty(document.body.style, 'transform', {
  value: () =>
    ({
      enumerable: true,
      configurable: true,
    }),
});