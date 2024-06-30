export function setOrder(i: number){
  localStorage.removeItem('order')
  localStorage.setItem('order', `${i}`)
}