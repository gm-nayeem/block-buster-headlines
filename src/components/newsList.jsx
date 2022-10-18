import React from 'react'

import NewsItem from './newsItem'

const NewsList = React.forwardRef(({news}, ref) => {
  return (
    <div>
        {news && news.length === 0 && <h4>There is no News</h4>}
        {news && news.map(item => <NewsItem ref={ref} key={item.title} item={item} />)}
    </div>
  )
});

export default NewsList