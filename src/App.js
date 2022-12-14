import React, { Component, createRef } from 'react';

import News, { newsCategory } from './news';
import Header from './components/header';
import NewsList from './components/newsList';
import Pagination from './components/pagination';
import Loading from './components/loading';

const news = new News(newsCategory.technology)

class App extends Component {

  state = {
    data: {},
    isLoading: true
  }

  aboutResult = createRef();
  searchRef = createRef();
  itemRefList = []

  componentDidMount() {
    news.getNews()
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e)
        alert('Something Went Wrong!!')
        this.setState({ isLoading: false })
      });

    // using Ref
    this.searchRef.current.focus();
    console.log(this.itemRefList);
  }

  goToTop = () => {
    window.scroll(0, this.aboutResult.current.scrollTop)
  }

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true })
    }
    news.next()
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e)
        alert('Something Went Wrong!!')
        this.setState({ isLoading: false })
      })
  }

  prev = () => {
    if (this.state.data.isPrev) {
      this.setState({ isLoading: true })
    }
    news.prev()
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e)
        alert('Something Went Wrong!!')
        this.setState({ isLoading: false })
      })
  }

  handlePageChange = (value) => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value)
      }
    })
  }

  goToPage = () => {
    this.setState({isLoading: true})
    news.setCurrentPage(this.state.data.currentPage)
      .then(data => {
        this.setState({data, isLoading: false})
      })
      .catch(e => {
        console.log(e)
        alert('Something Went Wrong!!')
        this.setState({ isLoading: false })
      })
  }

  changeCategory = (category) => {
    this.setState({isLoading: true})
    news.changeCategory(category)
      .then(data => {
        this.setState({data, isLoading: false})
      })
      .catch(e => {
        console.log(e)
        alert('Something Went Wrong!!')
        this.setState({ isLoading: false })
      })
  }

  search = (searchTerm) => {
    this.setState({isLoading: true})
    news.search(searchTerm)
      .then(data => {
        this.setState({data, isLoading: false})
      })
      .catch(e => {
        console.log(e)
        alert('Something Went Wrong!!')
        this.setState({ isLoading: false })
      })
  }

  render() {
    const {
      article,
      isPrev,
      isNext,
      category,
      totalResults,
      currentPage,
      totalPage,
    } = this.state.data

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            <Header
              ref={this.searchRef}
              category={category}
              changeCategory={this.changeCategory}
              search={this.search}
            />
            <div ref={this.aboutResult} className='d-flex'>
              <p className='text-black-50'>
                About {totalResults} results found
              </p>
              <p className='text-black-50' style={{ marginLeft: 'auto' }}>
                {currentPage} page of {totalPage}
              </p>
            </div>
            {
              this.state.isLoading ? (
                <Loading />
              ) : (
                <div>
                  <NewsList ref={this.itemRefList} news={article} />
                  <Pagination
                    next={this.next}
                    prev={this.prev}
                    isPrev={isPrev}
                    isNext={isNext}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handlePageChange={this.handlePageChange}
                    goToPage={this.goToPage}
                  />
                  <button 
                    className='btn btn-secondary my-4' 
                    onClick={this.goToTop}
                  >
                    Go To Top
                  </button>
                </div>
              )
            }

          </div>
        </div>
      </div>
    )
  }
}

export default App;


// const fakeNews = [
//   {
//     title: 'Title',
//     content: 'Content',
//     url: 'https://linktonews.com',
//     urlToImage: 'https://linktoimage.com',
//     publishAt: 'puplish date and time',
//     source: {
//       name: 'CDN',
//     },
//   },
// ]