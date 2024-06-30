import styles from './styles.module.css'

type BookMarkProps ={
  title: string
  index: number
  url: string | undefined
}

export default function Bookmark({title, index, url}:BookMarkProps){
  const handleCLick = () =>{
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        chrome.tabs.update(tabs[0].id ?? 0, { url: url || '#' })
      }
    )
  }
  return(
    <div key={`BookMark_Container_${index}`} onClick={handleCLick} className={styles.containerBookmark}>
      <img src="/bookmark.png" alt="bookmark" className={styles.img}/>
      <label htmlFor="">
        {title}
      </label>
    </div>
  )
} 