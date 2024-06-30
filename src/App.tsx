import { useEffect } from 'react'
import './App.css'
import BookMarks from './components/body'
import { bookmarkState } from './store/bookmark'

function App() {
  const { getBookmarks } = bookmarkState(state => state)

  useEffect (() => {
    getBookmarks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BookMarks/>
    </>
  )
}

export default App
