export interface Category{
    categori_id: number,
    name: string
}

export interface Product{
    id: number,
    name: string,
    price: string,
    available: boolean,
    best_seller: boolean,
    categories: any,
    img: string,
    description: string
}
