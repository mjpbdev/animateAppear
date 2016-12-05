# AnimateAppear

It's a Plugin that animate elements when scrolled them into view, using animations from [Animate.css](https://github.com/daneden/animate.css) and the appear function from [jQuery Appear](https://github.com/bas2k/jquery.appear/) plugin.

[Demo page](https://mjpbdev.github.io/animateAppear/) 

## Getting started

1\. Include the **js** and **css** files of **AnimateAppear** plugin in to your project, you will also need to include [jQuery](http://jquery.com/)
```html
<link rel="stylesheet" type="text/css" href="animateAppear/css/animate_appear.min.css">
<script src="animateAppear/js/animate_appear.min.js"></script>
```
Or with Bower, simply do the following:
```html
$ bower install animateAppear --save
```
2\. Add to the element to be animate the property **data-animation-name** and the name of the animation
```html
<img data-animation-name="[animation name]" src="image.jpg" />
```

3\. Initialize **AnimateAppear**
```javascript
<script> 
  $(function(){ 
    $('[data-animation-name]').animateAppear(); 
  }); 
</script>
```
You are ready!

## Options

### **Delay**

It can be changed the time when the element appear on the view with **data-animation-delay**. By default it's 1 second.

Per element
```html
<img data-animation-name="fadeIn" data-animation-delay="2" src="image.jpg" />
```
In the initialization for all the elements
```javascript
<script> 
  $(function(){ 
    $('[data-animation-name]').animateAppear({delay:2}); 
  }); 
</script>
```

### **Accuracy**

The appear function from [jQuery Appear](https://github.com/bas2k/jquery.appear/) plugin receive two parameter **accX** and **accY** they can be set in the call to **animateAppear**
```javascript
<script> 
  $(function(){ 
    $('[data-animation-name]').animateAppear({accX:0, accY:-150}); }); 
  }); 
</script>
```
**animateAppear** has by default **accX:0** and **accY:-100**. It means that the element has to be 100px into the view to appear.

* * *
##**License**

The MIT License (MIT)  

Copyright (c) 2016 mjpbDev  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.