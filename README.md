# react-parallax

---
Position calculation has changed in version 1.0.0 to get rid of some white space edge cases on large screens. I hope it does not break your current setup. In some cases you will have to adjust the `strength` value.
### Install

```sh
npm install react-parallax --save
```

### [Demo](http://rrutsche.github.io/#parallax)

## Default Usage

```
import { Parallax } from 'react-parallax';

const TheContainer = React.createClass({
  render: function () {
    return (
      <div>
	    <Parallax bgImage="assets/1.jpg" strength={400}>
		  <br/>
		  <h1> some content that is displayed above the bgImage </h1>
		</Parallax>
      </div>
    )
  }
});
```
## Background Component

For more flexibility and styling purposes you can add a ```<Background></Background>``` section to your Parallax Container. Child nodes inside this Background will be positioned like the bgImage behind the other children. Compared to the bgImage there is no automatic scaling.
```
import { Parallax, Background } from 'react-parallax';

const TheContainer = React.createClass({
  render: function () {
    return (
      <div>
        <Parallax strength={300}>
		  <Background>
		    <img src="http://www.fillmurray.com/400/300"/>
			<div style={{
			   width: 800, 
			   height: 300, 
			   backgroundColor: '#450093'
			  }}></div>
			<img src="http://www.fillmurray.com/500/300"/>
		  </Background>
		  <h1>something else</h1>
		</Parallax>
      </div>
    )
  }
});
```

# Props

* bgImage: path to the background image that makes parallax effect visible - (type: String)
* bgWidth: set bgImage width manually - (type: String), eg. '400px', 'auto'
* bgHeight: set bgImage height manually - (type: String), eg. '400px', 'auto'
* strength: parallax effect strength (in pixel), default 100. this will define the amount of pixels the background image is translated - (type: Number)
* blur: pixel value for background image blur, default: 0 - (type: Number)
* disabled: turns off parallax effect if set to true, default: false - (type: Boolean)
* className: set an additional className - (type: String) // as replacement for removed bgColor prop



# Children

The children are used to display any content inside the react-parallax component

## Development

Initial set up, run:
    
```sh
npm install
```

For watch on files, live reload, JSX transpiling and browserify, run:

```sh
npm run dev
```
Port on Windows is 80, 8080 on all other OS by default. Can be set with option -port=8080

# License

MIT
