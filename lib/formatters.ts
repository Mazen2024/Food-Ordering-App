export const formattCurrency = (price : number)=> {
    const CURRENCY_FORMATTER = new Intl.NumberFormat('en-us', {
        currency : 'USD', 
        style : 'currency',
    })
    return CURRENCY_FORMATTER.format(price);
}