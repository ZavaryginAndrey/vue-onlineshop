export function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size)
}

export function pageCount(array, page_size) {
    return  array.length / page_size + (array.length % page_size ? 1 : 0)
}