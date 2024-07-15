import { create } from 'zustand'

type BookMarkProps = {
  current: chrome.bookmarks.BookmarkTreeNode[]
  old: chrome.bookmarks.BookmarkTreeNode[][]
  setCurrent: (v: chrome.bookmarks.BookmarkTreeNode[], optional?: boolean) => void
  getBookmarks: () => void
  setOld: () => void
}

export const bookmarkState = create<BookMarkProps>((set) => ({
  current: [],
  old: [],
  setCurrent: (tree, optional?) => {
    set((state) => {
      if (!optional) {
        state.setOld()
      }
      return { current: tree }
    })
  },
  getBookmarks: () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')

    if (bookmarks.length === 0) {
      chrome.bookmarks.getTree(function (
        bookmarks: chrome.bookmarks.BookmarkTreeNode[]
      ) {
        set({ current: bookmarks[0].children })
      })
    }

    set({ current: bookmarks })
  },
  setOld: () => {
    set((prev) => ({ old: [...prev.old, prev.current] }))
  },
}))
