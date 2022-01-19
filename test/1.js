const options = (array) => {
  array = array.map((element) => {
    return element === 3
  })

  return array
}

options([1, 2, 3, 4, 5, 6])
