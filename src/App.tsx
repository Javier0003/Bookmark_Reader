import { useEffect } from 'react'
import './App.css'
import { bookmarkState } from './store/bookmark'
import BookMarks from './components/body/body'
import Control from './components/controls/controls'
import { playlist } from './store/play'
import { order as index} from './store/order'

function App() {
  const { getBookmarks } = bookmarkState(state => state)
  const { getPlaylist, currentPlaylist } = playlist(state => state)
  const { getSaved } = index(state => state)

  useEffect (() => {
    getBookmarks()
    getPlaylist()
    getSaved()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='container'>
      <Control/>
      {currentPlaylist.length === 0 && <BookMarks/>}
    </div>
  )
}

export default App
