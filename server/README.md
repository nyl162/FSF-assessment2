## API usage

### endpoint: /searchBook

#### input:
|name|accept|usage|
|---|---|---|
|author|string|search DB for author name in concatinated *author_lastname* or *author_firstname*|
|title|string|search DB for title name in *title*|
|limit|number|pagination: to limit the result output (default:10)|
|offset|number|pagination: to offset the result output (default:0)|
|order|number|<ol><li>sort by author ascending(default)</li><li>sort by author descending</li><li>sort by title ascending</li><li>sort by title descending</li></ol>|



#### output:




## Open issues
1. DB: *author_lastname* contain unclean data with "/".