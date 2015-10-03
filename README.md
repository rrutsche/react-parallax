# react-parallax

> A react component for simple parallax effect

## Install

```sh
npm install react-parallax --save-dev
```

## [Demo](http://rrutsche.github.io/#parallax)

## Usage

```
var Parallax = require('react-parallax');

var TheContainer = React.createClass({
  render: function () {
    return (
      <div>
      	<Parallax bgImage="assets/1.jpg" strength={300}>
			<h1>first parallax section</h1>
		</Parallax>
		<Parallax bgImage="assets/2.jpg">
			<br/>
			<h1>second parallax </h1>
			<br/>
		</Parallax>
      </div>
    )
  }
});
```

# Props

* bgImage: path to the background image that makes parallax effect visible - (type: String)
* bgColor: css value for a background color (visible only if bgImage is NOT set), eg.: #ddd, yellow, rgb(34,21,125) - (type: String)
* strength: parallax effect strength (in pixel), default 100. this will define the amount of pixels the background image is translated - (type: Number)
* blur: pixel value for background image blur, default: 0 - (type: Number)
* disabled: turns off parallax effect if set to true, default: false - (type: Boolean)

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

