const path = require('path')
const fs = require('fs')
const http = require('https')
const filePath = path.resolve(__dirname, 'links.txt')
const data = fs.readFileSync(filePath, 'utf-8')
const files = data.split('\n')
const dir = path.resolve(__dirname, 'downloads')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}


// ********************************** all musics download synchronously by promise approach ***********************


const downLoadFileHandler = file =>
  new Promise((resolve, reject) => {
    const fileUrl = decodeURI(file)

    const fileName = path.basename(fileUrl).replace(/\s/g, '')
  
    const filePath = path.resolve(dir, fileName)
  
    const fileStream = fs.createWriteStream(filePath)
    http.get(file, (response) => {
      response.pipe(fileStream)

      response.on('end', () => {
          fileStream.close()
        resolve(`${fileName} Completed`)
      })
      response.on('error', () => {
        reject(`${fileName} Not Completed`)
    })
    
    })
  }

  );

const downloadAllFilesSynchronously = async (files) => {
  for (file of files) {
    try{
      const downloadedFile = await downLoadFileHandler(file);
      console.log(downloadedFile);
    }catch(error){
      console.log(error)
    }
  
  }
};

downloadAllFilesSynchronously(files);





// ********************************** all musics download synchronously by recursive function approach ***********************


// function downloadFiles(array){
//   const musicURLs = array
//   if (musicURLs.length > 0){
//     const fileUrl = decodeURI(musicURLs[0])

//     const fileName = path.basename(fileUrl).replace(/\s/g, '')
  
//     const filePath = path.resolve(dir, fileName)
  
//     const fileStream = fs.createWriteStream(filePath)
//       http.get(musicURLs[0], response => {
//       response.pipe(fileStream)
  
//       response.on('end', () => {
//         musicURLs.shift()
//           fileStream.close()
//           console.log(`${fileName} Completed`)
//             downloadMusic(musicURLs)
           
//       })
//     })
//   }else{
//     console.log('all files downloaded')
//   }

// }
// downloadFiles(files)
