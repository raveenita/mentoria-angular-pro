export type Product = {
    createdAt: string
    name: string
    price: string
    description: string
    image: string
    id: string
    quantity: number
  }
  
//type ProductWithoutId = Omit<Product, 'id'>

