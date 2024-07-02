import { bookmarkState } from '../../../store/bookmark'
import styles from './styles.module.css'

type FolderProps = {
  title: string
  folder: chrome.bookmarks.BookmarkTreeNode[]
  index: number
}

export default function Folder({ title, folder, index }: FolderProps) {
  const { setCurrent } = bookmarkState((state) => state)
  const handleClick = () => setCurrent(folder)

  return (
    <div
      onClick={handleClick}
      key={`Folder_Container_${index}`}
      className={styles.container}
    >
      <img src="/folder.png" alt="" className={styles.img}/>
      <label htmlFor="" className={styles.label}>
        {title}
      </label>
    </div>
  )
}
