document.addEventListener('DOMContentLoaded', function () {
  chrome.bookmarks.getTree(function (bookmarks) {
    displayBookmarks(bookmarks[0].children)
  })
})
const bookmarksList = document.getElementById('bookmarksList')

function displayBookmarks(bookmarks) {
  bookmarks.forEach(function (bookmark) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = bookmark.url || '#'
    a.textContent = bookmark.title
    a.id = `${bookmark.id}_a`
    li.class = `list`
    li.addEventListener('click', function () {
      const listEl = document.querySelectorAll(`li`)
      if(bookmark.children){
        listEl.forEach((element) => {
          element.remove()
        })
      }
      const passedMarks = bookmark.children
      displayBookmarks(passedMarks)
    })
    li.appendChild(a)
    bookmarksList.appendChild(li)
  })
}