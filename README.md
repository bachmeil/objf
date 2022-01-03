# objf

This is the OBJF approach, an extension of the OBTF (one big text file)
approach to capturing your personal data. The goal is to support *querying*
of your information, in addition to the *capturing* that is done so well
with OBTF, while retaining the simplicity of the OBTF system.

## Overview

To better understand the project, clone this repo and open the file "demo.html"
in a browser.

## Usage

Clone the repo or download the files to a directory on your computer. Enter
information in markdown format, with YAML for metadata you want available
for queries.

There is no documentation. There may never be documentation. There isn't
much to document, either, since there's not much code and what's there
isn't difficult to follow.

Edit the "blank.html" file to hold your data. Load it in the browser.
That's basically all there is.

## Limitations

I put this together as a weekend project. I don't currently use it as my
main productivity system. I probably won't ever do that.

Don't let that stop you from using it. There's no possibility that it'll
become unmaintained, because there's nothing to maintain. Think of it more as 
a template for you to build on than as an app. Everything here should work with no changes ten years
from now. The actual work is done by PouchDB, markdown-it, and katex.

## The Name

OBJF stands for "one big JSON file". It's not completely accurate. You're
entering information in YAML+markdown rather than JSON. It's converted from
YAML+markdown to JSON when loaded into the browser.
