import { create } from 'zustand'

type PlayListProps = {
  currentPlaylist: chrome.bookmarks.BookmarkTreeNode[]
  getPlaylist: () => void
  setPlaylist: (playlist: chrome.bookmarks.BookmarkTreeNode[]) => void
  rmPlaylist: () => void
}

export const playlist = create<PlayListProps>((set) => ({
  currentPlaylist: [],
  getPlaylist: () => {
    const playlist = localStorage.getItem('playlist')

    if (playlist) {
      set({ currentPlaylist: JSON.parse(playlist) })
    }
  },
  setPlaylist(playlist) {
    const folderless = playlist.filter((item) => item.url)
    localStorage.setItem('playlist', JSON.stringify(folderless))
    set({ currentPlaylist: folderless })
  },
  rmPlaylist: () => {
    localStorage.removeItem('playlist')
    set({ currentPlaylist: []})
  }
}))
