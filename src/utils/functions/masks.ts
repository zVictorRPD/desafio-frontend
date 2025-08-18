export const removeMask = (value: string) => {
    return value.replace(/\D/g, '')
}

export function moneyMask(value: number) {
    return (value / 100).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    })
}