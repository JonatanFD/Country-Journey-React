export interface HereAPIDATA {
    items: Item[]
  }
  
  export interface Item {
    title: string
    id: string
    language: string
    resultType: string
    address: Address
    position: Position
    access: Access[]
    distance: number
    categories: Category[]
    references: Reference[]
    contacts?: Contact[]
    openingHours?: OpeningHour[]
    payment?: Payment
  }
  
  export interface Address {
    label: string
    countryCode: string
    countryName: string
    stateCode: string
    state: string
    county: string
    city: string
    district: string
    street: string
    postalCode: string
    houseNumber?: string
  }
  
  export interface Position {
    lat: number
    lng: number
  }
  
  export interface Access {
    lat: number
    lng: number
  }
  
  export interface Category {
    id: string
    name: string
    primary?: boolean
  }
  
  export interface Reference {
    supplier: Supplier
    id: string
  }
  
  export interface Supplier {
    id: string
  }
  
  export interface Contact {
    phone: Phone[]
    www?: Www[]
    email?: Email[]
    mobile?: Mobile[]
  }
  
  export interface Phone {
    value: string
    categories?: Category2[]
  }
  
  export interface Category2 {
    id: string
  }
  
  export interface Www {
    value: string
    categories?: Category3[]
  }
  
  export interface Category3 {
    id: string
  }
  
  export interface Email {
    value: string
    categories: Category4[]
  }
  
  export interface Category4 {
    id: string
  }
  
  export interface Mobile {
    value: string
    categories: Category5[]
  }
  
  export interface Category5 {
    id: string
  }
  
  export interface OpeningHour {
    categories: Category6[]
    text: string[]
    isOpen: boolean
    structured: Structured[]
  }
  
  export interface Category6 {
    id: string
  }
  
  export interface Structured {
    start: string
    duration: string
    recurrence: string
  }
  
  export interface Payment {
    methods: Method[]
  }
  
  export interface Method {
    id: string
    accepted: boolean
  }
  