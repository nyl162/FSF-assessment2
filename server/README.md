## API usage

### endpoint: _/searchBook_

#### input:
|name|accept|usage|
|---|---|---|
|author|string|search DB for author name in concatinated *author_lastname* or *author_firstname*|
|title|string|search DB for title name in *title*|
|limit|number|pagination: to limit the result output (default:10)|
|offset|number|pagination: to offset the result output (default:0)|
|order|number|<ul><li>0 - sort by author ascending(default)</li><li>1 - sort by author descending</li><li>2 - sort by title ascending</li><li>3 - sort by title descending</li></ul>|



#### output:




## Open issues
1. DB: *author_lastname* contain unclean data with "/".