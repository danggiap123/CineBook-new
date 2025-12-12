export const moneyFormat = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 // Đảm bảo không có số thập phân
    }).format(Number(amount))
}