# react-parallax [![NPM version][npm-image]][npm-url]


### Install

```sh
npm install react-parallax --save
```

### [Demo on codesandbox](https://codesandbox.io/embed/r0yEkozrw?view=preview)

## Usage

```
import React from 'react';
import { Parallax, Background } from 'react-parallax';

const MyComponent = () => (
  <div>
    <Parallax
      blur={10}
      bgImage={require('path/to/image.jpg')}
      bgImageAlt="the cat"
      strength={200}
    >
      Put some text content here
      or even an empty div with fixed dimensions
      to have a height for the parallax.
      <div style={{ height: '200px' }} />
    </Parallax>
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={require('path/to/another/image.jpg')}
      bgImageAlt="the dog"
      strength={200}
    >
      Blur transition from min to max
      <div style={{ height: '200px' }} />
    </Parallax>
    <Parallax strength={300}>
      <div>Use the background component for custom elements</div>
      <Background className="custom-bg">
        <img src="http://www.fillmurray.com/500/320" alt="fill murray" />
      </Background>
    </Parallax>
  </div>
);
export default MyComponent;
```
## Background Component

For more flexibility and styling purposes you can add a ```<Background></Background>``` section to your Parallax Container. Child nodes inside this Background will be positioned like the bgImage behind the other children. Compared to the bgImage there is no automatic scaling (see above).

# Props

* bgImage: path to the background image that makes parallax effect visible - (type: String)
* bgImageAlt: alt text for bgImage - (type: String)
* bgImageSizes: img `sizes` attribute
* bgImageSrcSet: img `srcset` attribute
* bgStyle: additional style object for the bg image/children - (type: Object)
[Valid style attributes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)
* bgClassName: custom classname for image - (type: String)
* bgWidth: set bgImage width manually - (type: String), eg. '400px', 'auto'
* bgHeight: set bgImage height manually - (type: String), eg. '400px', 'auto'
* strength: parallax effect strength (in pixel), default 100. this will define the amount of pixels the background image is translated - (type: Number)
* blur:
    1) pixel value for background image blur, default: 0 - (type: Number)
    2) or object in format `{min:0, max:5}` for dynamic blur depending on scroll position
* disabled: turns off parallax effect if set to true, default: false - (type: Boolean)
* className: set an additional className - (type: String)
* parent: set optional parent for nested scrolling, default: document - (type: Node)
* log: for development, turns console.log on/off - (type: Boolean)

# Children
Are used to display any content inside the react-parallax component

## Development
Initial set up, run:

```sh
npm install / yarn
```

Development, live reload, JSX transpiling, run:

```sh
npm run dev
```
Port 3000 on all OS by default. Can be set with option -port=8080

# License

MIT


[npm-image]: https://img.shields.io/npm/v/react-parallax.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-parallax
