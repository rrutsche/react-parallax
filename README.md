# react-parallax

> A react component for simple parallax effect

## Install

```sh
npm install react-parallax --save-dev
```

## Usage

```js
var Parallax = require('react-parallax');

var TheContainer = React.createClass({
  render: function () {
    return (
      <div>
      	<Parallax bgImage="assets/1.jpg" strength={300}>
			<h1>first parallax section</h1>
			<h2>with some crazy text</h2>
			<br/>
			<h2>it's just there to fill the website</h2>
			<br/>
		</Parallax>
		<Parallax bgColor="white">
			<br/>
			<h1>second parallax is without bg image</h1>
			<br/>
		</Parallax>
		<Parallax bgImage="assets/2.jpg">
			<br/>
			<h1>its the third</h1>
			<br/>
			<h2>hello hello</h2>
			<br/>
		</Parallax>
      </div>
    )
  }
});
```

# Props

/**
 * path to the background image that makes parallax effect visible
 * @type {String}
 */
bgImage: React.PropTypes.string
/**
 * css value for a background color (visible only if bgImage is NOT set), eg.: #ddd, yellow, rgb(34,21,125)
 * @type {String}
 */
bgColor: React.PropTypes.string
/**
 * parallax effect strength (in pixel), default 100
 * this will define the amount of pixels the background image is translated
 * @type {Number}
 */
strength: React.PropTypes.number
/**
 * pixel value for background image blur, default: 0
 * @type {Number}
 */
blur: React.PropTypes.number

# Children

The children are used to display any content inside the react-parallax component

## Development

Initial set up, run:
    
```sh
npm install
```

For watch on files, live reload, JSX transpiling and browserify, run:

```sh
grunt
```
Port on Windows is 80, 8080 on all other OS by default. Can be set with option -port=8080

# License

MIT

