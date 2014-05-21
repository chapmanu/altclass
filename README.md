# altclass

**altclass** lets you assign responsive classnames by element breakpoints.

---

Create three classname combinations in a single attribute.

```html
<div data-altclass="widget, size-s 640 size-m 960 size-l">
```

When the element is less than 640px:

```html
<div class="widget size-s">
```

Or between 640px and 959px:

```html
<div class="widget size-m">
```

Or 960px and beyond:

```html
<div class="widget size-l">
```

## How it works

[altclass.js](altclass.js) places a completely hidden iframe with no layout inside an element to detect its changes. When the element’s width matches a new altclass breakpoint, its classnames are refreshed.

The iframe has no height, so elements with dynamic content that change their height will not trigger unnecessary measurements or calculations. Similarly, window resizes that do not change the width of the element will not trigger unnecessary measurements or calculations.

## Syntax

The `data-altclass` attribute is a collection of *breakpoints* separated by *commas*.

```html
<div data-altclass="[breakpoint list]">

<div data-altclass="[breakpoint list], [breakpoint list]">
```

Breakpoints are a collection of *classnames* separated by *widths*.

```html
<div data-altclass="[classname]">

<div data-altclass="[classname] [classname] [width]">

<div data-altclass="[width] [classname]">

<div data-altclass="[classname] [width] [classname] [classname] [width] [classname]">
```

A *classname* is activated when the element is as wide as the *width* before it and less wide than the *width* after it.

```html
<div data-altclass="[less than 320] 320 [at least 320 & up to 479] 480 [at least 480]">
```

Altclasses can be assigned and reassigned in JavaScript.

```js
document.querySelector('.widget').dataset = "widget, widget--s 640 widget--m 960 widget--l 1200 widget-xxl";
```

Have fun.

---

The fully-documented script is 2.64KB, or 618B minified + gzipped. The *IE8-compatible* legacy script is 3.27KB, or 765B minified + gzipped.
