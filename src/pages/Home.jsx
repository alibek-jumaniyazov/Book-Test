  import React, { useContext, useRef, useState } from 'react'
  import logo from '../images/logo.png'
  import avatar from '../images/user-image.png'
  import axios from 'axios'
  import CardBook from '../components/HomeComponents/CardBook';
  import CreateBook from '../components/HomeComponents/CreateBook';
  import SearchBooks from '../components/HomeComponents/SearchBooks';
  import { UserContext } from '../context/UserContext';
  import { deleteBook } from '../context/api';
  import { useNavigate } from 'react-router-dom';

  export default function Home() {




    const [search, setSearch] = useState({
      class: 'bookSearch',
      stroke: '#FEFEFE',

    })
    const [spinner, setSpinner] = useState({
      svg: '',
      load: 'none'
    });

    const {
      books,
      setBooks,
      loading,
      setLoading
    } = useContext(UserContext)
    console.log(books);

    const [inputValue, setValue] = useState('')
    // const [SearchResult, setSearchResults] = useState(books)

    // const results =  
    //   books.filter((user) =>
    //     user.book.toLowerCase().includes(inputValue)
    //   )
       
    // setSearchResults(results);

    function SerachChange(e) {
      setSearch({
        class: 'bookSearchWhite',
        stroke: '#151515',

      })
      setValue(e)
    }

    function inputNull() {
      setValue('')
      if (serachRef.current.value == '') {
        setSearch({
          class: 'bookSearch',
          stroke: '#FEFEFE',

        })
      }
      if (serachRef.current.value !== '') {
        setSearch({
          class: 'bookSearchWhite',
          stroke: '#151515',
        })
      }
    }
    const serachRef = useRef(null)

    
    const deletBook = async (id) => {

      if (spinner.load == 'none') {
        setSpinner({
          svg: 'none',
          load: 'spinner'
        })
      }
      try {
        const request = await deleteBook(id)
        console.log(request);
        setBooks((books) => books.filter((book) => book.book.id !== id));
        setSpinner({
          svg: '',
          load: 'none'
        })
      }
      catch (err) {
        console.log(err);
      }
    }

    return (
      <div className='Home'>
        <div className="homeHeader">
          <div className="bookSerachAndLogo">
            <img src={logo} alt="" />
            <SearchBooks search={search} inputValue={inputValue} inputNull={inputNull} SerachChange={SerachChange} serachRef={serachRef} />
          </div>
          <div className="userMessangeAndAvatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" stroke="#151515" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              <rect x="15.5" y="0.5" width="5" height="5" rx="2.5" fill="#FF4D4F" />
              <rect x="15.5" y="0.5" width="5" height="5" rx="2.5" stroke="#FEFEFE" />
            </svg>
            <img src={avatar} alt="" />
          </div>
        </div>
        <div className="homeInfoAndCreayeBook">
          <div className="homeInfo">
            {loading ? (
              <p className='NOTBooks'>Books loading...</p>
            ) : (
              <span>
                You’ve got <span className="editColor">{books ? books.length : '0'} books</span>
              </span>
            )}
            <p>Your task today</p>
          </div>
          <div className="CreateBooks">
            <input type="text" placeholder='Enter your name' />
            <CreateBook />
          </div>
        </div>
        <div className="BooksContainer">
          {books ? (
            books.map((item) => (
              <CardBook item={item.book} deletBook={deletBook} key={item.book.id} spinner={spinner} />
            ))
          ) : (
            <p className='NOTBooks'>No books available</p>
          )}
        </div>
      </div>
    )
  }
