import { bookmarkState } from '../../store/bookmark'
import { order as index } from '../../store/order'
import { playlist } from '../../store/play'
import styles from './styles.module.css'

export default function Control() {
  const { setPlaylist, rmPlaylist, currentPlaylist } = playlist(
    (state) => state
  )
  const { decr, incr, setZero } = index((state) => state)
  const { current } = bookmarkState((state) => state)

  const handleClick = () => setPlaylist(current)

  const handleRemove = () => {
    rmPlaylist()
    setZero()
  }

  const changeWindow = (index: number) => {
    const url = currentPlaylist[index].url
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id ?? 0, { url: url || '#' })
    })
  }

  const handleIncrease = () => {
    const index = incr(currentPlaylist.length - 1)
    changeWindow(index)
  }

  const handleDecrease = () => {
    const index = decr()
    changeWindow(index)
  }

  return (
    <div className={styles.container}>
      {currentPlaylist.length === 0 ? (
        <button onClick={handleClick} className={styles.controls}>
          Start Playlist
        </button>
      ) : (
        <>
          <button onClick={handleDecrease} className={styles.controls}>
            Previous
          </button>
          <button onClick={handleRemove} className={styles.controls}>
            Clear
          </button>
          <button onClick={handleIncrease} className={styles.controls}>
            Next
          </button>
        </>
      )}
    </div>
  )
}
