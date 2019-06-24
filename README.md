# Simple text editor

## Initial setup
Run `yarn install` in order to setup application

## Development server
Run `yarn start` for a dev server.

## Build
Run `yarn build`.

## Notes
+ Used context instead of redux for storing and sharing the data. The only reason I found is that the application was pretty small so I thought is was good to make use of context.
+ I didn't have too much time so I concentrate in the functionality and left the styles aside.
+ There are some bugs around, like making double click in a word and clicking outside the box after, doesn't clean the selection in the context.
+ This project is hosted in: [netlify](lmaddio-text-editor.netlify.com)
