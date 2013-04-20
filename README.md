##Complement

Sampling an area of an image and dynamically generate a rob color that provides the best contrast to the sampled area.

## Use case
Overlaying text or icon font over an image.

##Installation

To get all the components used to test this with Bower

    npm install -g bower
    bower install

Optionally you can create a local server to test (Mac)

    npm install -g http-server
    http-server .
    open http://localhost:8080/index.html
    
##Issues

Cross origin exceptions if you try to run this from a file:// protocol.

Occasionally the color grid will load all white in Chrome. Clicking Refresh usually solves this. 