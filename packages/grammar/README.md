# @wordpress/grammar

This library provides a grammar defining what kinds of content can be represented inside a WordPress content.

## Installation

Install the module

```bash
npm install @wordpress/grammar --save
```

## Usage

```js
import { parse } from '@wordpress/grammar';

parse( '<!-- wp:core/more --><!--more--><!-- /wp:core/more -->' );
// [{"attrs": null, "blockName": "core/more", "innerBlocks": [], "innerHTML": "<!--more-->"}]
```

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
