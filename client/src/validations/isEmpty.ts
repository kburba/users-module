const isEmpty = (value?: null | string | string[] | any): boolean =>
  value === undefined ||
  value === null ||
  value === '' ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)
export default isEmpty
