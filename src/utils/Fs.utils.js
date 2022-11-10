import fs from 'fs'
import path from 'path'

const read = dir => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(), 'src', 'model', dir), (err, data) => {
      if (err) reject(err)

      if (!data) {
        return reject(new Error('Data is not found'))
      }

      resolve(JSON.parse(data))

    })
  })
}




const write = (dir, data) => {
  return new Promise((resolve, reject) => {

    if (!fs.existsSync(path.join(process.cwd(), 'src', 'model', dir))) {
      return reject('Path does not exists')
    }

    fs.writeFile(path.join(process.cwd(), 'src', 'model', dir), JSON.stringify(data, null, 2), err => {
      if (err) reject(err)

      resolve(data.at(-1))
    })

  })
}

export {
  read,
  write
}