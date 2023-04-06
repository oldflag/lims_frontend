import * as XLSX from 'xlsx'

const EXTENSIONS = ['xlsx', 'xls', 'csv']

const importData = (file, headerrow, fn) => {

    
    // let header;
    let jsonData='';


    const getExention = (file) => {
        const parts = file.name.split('.')
        const extension = parts[parts.length - 1]
        return EXTENSIONS.includes(extension) // return boolean
    }

    const convertToJson = (headers, data) => {
        const rows = []
        data.forEach(row => {
            let rowData = {}
            row.forEach((element, index) => {
            rowData[headers[index]] = element
            })
            rows.push(rowData)

        });
        return rows
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      //parse data

        const bstr = event.target.result
        const workBook = XLSX.read(bstr, { type: "binary" })

        //get first sheet
        const workSheetName = workBook.SheetNames[0]
        const workSheet = workBook.Sheets[workSheetName]
        //convert to array
        const fileData = XLSX.utils.sheet_to_json(workSheet, { header: headerrow })

        let header = fileData[0]
        //   const heads = headers.map(head => ({ title: head, field: head }))
        //   setColDefs(heads)

        //   //removing header
        fileData.splice(0, 1)
        jsonData = convertToJson(header, fileData)
        
        fn(jsonData)
    }



    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
        // return jsonData
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    } else {
      alert("Please select Excel, CSV file")
    }
}

export default importData