//TODO make this usable in NewPlant

export const randstr = (prefix) => {
    return Math.random().toString(36).replace('0.',prefix || '');
}

export const today = () => {
  return new Date().toJSON().slice(0, 10)
}