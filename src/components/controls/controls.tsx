import { bookmarkState } from '../../store/bookmark'
import { order as index } from '../../store/order'
import { playlist } from '../../store/play'
import styles from './styles.module.css'

export default function Control() {
  const { setPlaylist, rmPlaylist, currentPlaylist } = playlist(
    (state) => state
  )
  const { current } = bookmarkState((state) => state)
  const handleClick = () => setPlaylist(current)
  const { decr, incr, setZero } = index((state) => state)

  const handleRemove = () => {
    rmPlaylist()
    setZero()
  }

  const changeWindow = (index: number) => {
    const url = currentPlaylist[index].url
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        chrome.tabs.update(tabs[0].id ?? 0, { url: url || '#' })
      }
    )
  }

  const handleIncrease = () =>{
    const index = incr(currentPlaylist.length - 1)
    changeWindow(index)
  }

  const handleDecrease = () =>{
    const index = decr()
    changeWindow(index)
  }

  return (
    <div className={styles.container}>
      {currentPlaylist.length === 0 ? (
        <button onClick={handleClick}>playlist</button>
      ) : (
        <>
          <button onClick={handleDecrease}>prev</button>
          <button onClick={handleRemove}>clear</button>
          <button onClick={handleIncrease}>next</button>
        </>
      )}
    </div>
  )
}
