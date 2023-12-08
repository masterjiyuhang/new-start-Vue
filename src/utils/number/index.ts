import numeral from 'numeral'

export const formatNum = (amount: number) => numeral(amount).format('0,0');