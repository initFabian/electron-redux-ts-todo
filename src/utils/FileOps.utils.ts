import * as fs from 'fs'

class FileOps {
    static ensureOutputDirectory(directory: string, file: string) {

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory)
        }
        return `${directory}/${file}`
    }

    static updateFile(filePath: string, data: any): Promise<string> {
        return new Promise((resolve, reject) => {

            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '\n')
            }

            console.log('overriding to file...')
            fs.writeFile(filePath, JSON.stringify(data), function (err) {
                if (err) return reject(err)

                console.log("The file was overwritten!");
                return resolve(filePath)
            })
        })

    }
}

export default FileOps
