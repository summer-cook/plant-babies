//TODO make this usable in NewPlant

export const randstr = (prefix) => {
    return Math.random().toString(36).replace('0.',prefix || '');
}

export const today = () => {
  return new Date().toJSON().slice(0, 10)
}

// tells you whether or not the plant needs to get watered
export const getWateringText = (plant) => {
  if (plant.lastTimeWatered = today())
  return 'Hydrated & happy 🌞'
}

export const timeSince = function(date) {
  if (typeof date !== 'object') {
    date = new Date(date)
  }

  let seconds = Math.floor((new Date() - date) / 1000)
  let intervalType

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    intervalType = 'year'
  } else {
    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      intervalType = 'month'
    } else {
      interval = Math.floor(seconds / 86400)
      if (interval >= 1) {
        intervalType = 'day'
      } else {
        interval = Math.floor(seconds / 3600)
        if (interval >= 1) {
          intervalType = 'hour'
        } else {
          interval = Math.floor(seconds / 60)
          if (interval >= 1) {
            intervalType = 'minute'
          } else {
            interval = seconds
            intervalType = 'second'
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's'
  }

  return interval + ' ' + intervalType
}

// functions must be an array of form items
export const resetForm = (functionsArray) => {
  functionsArray.forEach(func => {
    func(null)
  })
}