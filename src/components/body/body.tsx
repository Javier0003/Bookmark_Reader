import { bookmarkState } from '../../store/bookmark'
import Bookmark from './components/bookmark'
import Folder from './components/folder'
import styles from './styles.module.css'

export default function BookMarks() {
  const { current, old, setCurrent } = bookmarkState((state) => state)

  const handleReturn = () => {
    const prev = old.pop()
    if (prev) {
      setCurrent(prev, true)
    }
    old.pop()
  }

  return (
    <div className={styles.container}>
      <div className={styles.returnContainer}>
        <button className={styles.returnButton} onClick={handleReturn}>
          Return
        </button>
      </div>
      {current &&
        current.map(({ title, children, url }, index) => {
          if (children)
            return (
              <Folder
                title={title}
                folder={children}
                key={`folder_${index}`}
                index={index}
              />
            )
          return (
            <Bookmark
              title={title}
              key={`Bookmark_${index}`}
              index={index}
              url={url}
            />
          )
        })}
    </div>
  )
}
