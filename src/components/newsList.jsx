import React from 'react'

import NewsItem from './newsItem'

const NewsList = ({news}) => {
  return (
    <div>
        {news && news.length === 0 && <h4>There is no News</h4>}
        {news && news.map(item => <NewsItem key={item.title} item={item} />)}
    </div>
  )
}

export default NewsList