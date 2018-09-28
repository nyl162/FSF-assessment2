## API usage

### endpoint 1: _/searchBook_
method: POST

#### input:
|name|accept|usage|
|---|---|---|
|author|string|search DB for author name in concatinated *author_lastname* or *author_firstname*|
|title|string|search DB for title name in *title*|
|limit|number|pagination: to limit the result output (default:10)|
|offset|number|pagination: to offset the result output to next page(default:0)|
|order|number|<ul><li>0 - sort by author ascending</li><li>1 - sort by author descending</li><li>2 - sort by title ascending (default)</li><li>3 - sort by title descending</li></ul>|

#### output (JSON):
|key|type|description|
|---|---|---|
|id|number|unique ID of the data|
|author|string|author name in concatinated *author_firstname* and *author_lastname* |
|title|string| book title|
|cover_thumbnail|string(URI)| images files located at _/images_ endpoint **to be append to URL on front end**|

### endpoint 2: _/images_

### endpoint 3: _/searchBookID_
method: POST

#### input:
|name|accept|usage|
|---|---|---|
|id|number|search DB for unique *id* |
* assume database peform control to provide unique id

#### output (JSON):
|key|type|description|
|---|---|---|
|id|number|unique ID of the data|
|author_firstname|string|author first name|
|author_lastname|string|author last name|
|title|string| book title|
|cover_thumbnail|string(URI)| images files located at _/images_ endpoint **to be append to URL on front end**|

Serve uploaded images

## Open issues
1. DB: *author_lastname* contain unclean data with "/".
2. DB: *author_firstname* might be empty.