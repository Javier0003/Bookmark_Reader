let list, order
document.addEventListener('DOMContentLoaded', function () {
  list = JSON.parse(localStorage.getItem('bookmarks'))
  order = localStorage.getItem('order')
  localStorage.removeItem('order')
  if(!order){
    order = -1
  }
  if(!list){
    chrome.bookmarks.getTree(function (bookmarks) {
      displayBookmarks(bookmarks[0].children)
    })
  }
})
const bookmarksList = document.getElementById('bookmarksList')
const btns = {
  forward: document
    .getElementById('forward')
    .addEventListener('click', function () {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {
          if(list){
            order++
            if(order >= list.length){
              order = list.length - 1
              return 
            }
            localStorage.removeItem('order')
            localStorage.setItem('order', order)
            chrome.tabs.update(tabs[0].id, { url: list[order] })
          }
        }
      )
    }),
  backward: document
    .getElementById('backward')
    .addEventListener('click', function () {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {
          if(list){
            order--
            if(order <= -1) {
              order = 0
              return
            }
            localStorage.removeItem('order')
            localStorage.setItem('order', order)
            chrome.tabs.update(tabs[0].id, { url: list[order] })
          }
        }
      )
    }),
  start: document
    .getElementById('start')
    .addEventListener('click', function () {
      localStorage.setItem('bookmarks', JSON.stringify(playlist))
      chrome.runtime.reload();
    }),
  stop: document
    .getElementById('stop')
    .addEventListener('click', function () {
      localStorage.clear()
      chrome.runtime.reload();
    }),
}
let playlist = []
function displayBookmarks(bookmarks) {
  bookmarks.forEach(function (bookmark) {
    const button = document.createElement('button')
    button.innerHTML = bookmark.title
    if (!bookmark.children) {
      playlist.push(bookmark.url)
      button.className = `link`
      button.addEventListener('click', function () {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: bookmark.url || '#' })
          }
        )
      })
    }
    if (bookmark.children) {
      button.className = `folder`
      button.addEventListener('click', function () {
        order = -1
        const listEl = document.querySelectorAll(`button`)
        listEl.forEach((element) => {
          element.remove()
        })
        const passedMarks = bookmark.children
        displayBookmarks(passedMarks)
      })
    }
    bookmarksList.appendChild(button)
  })
}