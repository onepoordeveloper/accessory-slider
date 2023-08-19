'use strict'
interface product {
  name: string
  price: number
  image: string
}

const products: product[] = [
  {
    name: 'Clip x3',
    price: 11,
    image: '../assets/asset.png',
  },
  {
    name: 'Clip XL x3',
    price: 22,
    image: '../assets/asset.png',
  },
  {
    name: 'Spare charging cable',
    price: 33,
    image: '../assets/asset.png',
  },
  {
    name: 'Spare charging cablerg with extra long title',
    price: 44,
    image: '../assets/asset.png',
  },
  {
    name: 'this one is a placeholder',
    price: 55,
    image: '../assets/asset.png',
  },
]

const listingWrapper: HTMLDivElement | null =
  document.querySelector<HTMLDivElement>('.listing-wrapper')
const scrollBar = document.querySelector<HTMLDivElement>('.scroll-bar')
const statusBar = document.querySelector<HTMLParagraphElement>('.status')

const cart: product[] = []

const handleAddToCart = (event: Event, product: product): void => {
  const target = event.currentTarget as HTMLButtonElement
  // disable button, change text and show status
  target.setAttribute('disabled', 'disabled')
  const tempButtonText = target.innerText
  target.innerText = 'Added!'
  statusBar?.classList.remove('hidden')

  // reset after 2 seconds
  setTimeout(() => {
    target.innerText = tempButtonText
    target.removeAttribute('disabled')
    statusBar?.classList.add('hidden')
  }, 2000)

  cart.push(product)
  console.clear()
  console.log(cart)
}

const addProductsToDOM = (): void => {
  products.map((product) => {
    // initializing building blocks
    const item: HTMLDivElement = document.createElement('div')
    const contentWrapper: HTMLDivElement = document.createElement('div')
    const img: HTMLImageElement = document.createElement('img')
    const title: HTMLHeadingElement = document.createElement('h2')
    const price: HTMLSpanElement = document.createElement('span')
    const button: HTMLButtonElement = document.createElement('button')

    // adding classes to item
    item.classList.add(
      'rounded',
      'bg-gray-100',
      'p-4',
      'min-w-[14rem]',
      'flex',
      'flex-col',
      'justify-between'
    )

    // adding image src
    img.src = product.image

    // adding title and it's classes
    title.innerText = product.name
    title.classList.add('text-gray-800')

    // adding price and it's classes
    price.innerText = `€ ${product.price}`
    price.classList.add('text-gray-500', 'text-sm')

    // adding button, it's classes and event handler
    button.classList.add(
      'bg-blue-500',
      'rounded-full',
      'w-full',
      'py-2',
      'text-white',
      'mt-4',
      'disabled:opacity-75',
      'transition',
      'duration-300'
    )
    button.textContent = 'Add to cart'
    button.addEventListener('click', (event: Event) =>
      handleAddToCart(event, product)
    )

    // appending building blocks to DOM
    contentWrapper.append(img, title, price)
    item.append(contentWrapper)
    item.append(button)
    listingWrapper?.append(item)
  })
}

const scrollHandler = (event: Event): void => {
  const target = event.target as HTMLDivElement
  const maxScroll = target.scrollWidth - target.clientWidth
  const currentScroll = target.scrollLeft
  const scrollPercentage = (currentScroll / maxScroll) * 100

  // move scroll bar against the scroll percentage
  if (scrollBar) {
    scrollBar.style.left = `calc(${scrollPercentage}% - 16px)`
  }
}

const listenToScroll = (): void => {
  listingWrapper?.addEventListener('scroll', scrollHandler)
}

const main = (): void => {
  addProductsToDOM()
  listenToScroll()
}

main()
