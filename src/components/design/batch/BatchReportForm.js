// import fs from "fs";
import { Document, Packer, Paragraph, TextRun, 
         Header, Footer, ImageRun, AlignmentType, 
         Table, TableCell, TableRow, WidthType } from "docx";

import { Close, Send } from '@mui/icons-material';
import { Autocomplete} from '@mui/material';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import { getSeqRuns } from '../../../actions/seqRun';
import { getSeqLibrarys } from '../../../actions/seqLibrary';
import { getAssays } from '../../../actions/assay';
import { getBatchs} from '../../../actions/batch';
import { getExperiments } from '../../../actions/experiment'
import { getProjects } from '../../../actions/project'
import { getSamples } from '../../../actions/sample'
import { getSpecimens } from '../../../actions/specimen'


const report_header1 = "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"
const report_header2 = "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"
const report_footer1 = "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"
const BatchReportForm = () => {
  const {
    state: { seqRuns, seqLibrarys, openBatchReport, assays, batchs, experiments, projects, samples, specimens },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (seqLibrarys.length === 0) getSeqLibrarys(dispatch);
    if (seqRuns.length === 0) getSeqRuns(dispatch);
    if (assays.length === 0) getAssays(dispatch);
    if (batchs.length === 0) getBatchs(dispatch);
    if (experiments.length === 0) getExperiments(dispatch);
    if (projects.length === 0) getProjects(dispatch);
    if (samples.length === 0) getSamples(dispatch);
    if (specimens.length === 0) getSpecimens(dispatch);
  },[]);

  const batchOptions = batchs.map(({ name, id }) => ({ label:name, id:id }));

  const [batchValue, setBatchValue] = useState(batchOptions[0]);

  const getUniqueValuesFromObjectArray = (objArray, colName) =>{
    let resultArray=[]
    objArray.forEach(aObj =>{
      if(!resultArray.includes(aObj[colName])){
        resultArray.push(aObj[colName]) 
      }
    })
    return resultArray
  }


  const handleClose = () => {
    dispatch({ type: 'CLOSE_BATCHREPORT' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let aBatch = batchs.filter((item) => {return item.name?.includes(batchValue.label)}) 
    let seqRunList = seqRuns.filter((item) => {return item.batch_name?.includes(batchValue.label)})
    let seqLibraryInRunList = seqLibrarys.filter((item) => { return seqRunList.find(s => s.name === item.seqRun_name)})
    // seqLibraryInRunList.sort((a,b) => (a.seqRun_name > b.seqRun_name) ? 1 : ((b.seqRun_name > a.seqRun_name) ? -1: 0))
    seqLibraryInRunList.sort((a,b)=>(a.seqRun_name.localeCompare(b.seqRun_name) || a.name.localeCompare(b.name)))

    // let seqLibraryInRunList = seqRunList.filter((item) => {return item.name === seqLibrarys.seqRun_name})
    let assaysInBatch = assays.filter((item) => {return item.batchId === batchValue.id})
    assaysInBatch.sort((a,b) => (a.batchId.localeCompare(b.batchId) || a.tubeNum - b.tubeNum))
    let experimentInBatch = experiments.filter((item)=> {return item.name === assaysInBatch[0].experiment_name})
    let projectInBatch = projects.filter((item)=> {return item.id === experimentInBatch[0].projectId})
    let uniqSamplesInBatch = getUniqueValuesFromObjectArray(assaysInBatch, 'sampleId')
    let samplesInBatch = samples.filter((item)=>{return uniqSamplesInBatch.includes(item.id)})
    let uniqSpecimensInBatch = getUniqueValuesFromObjectArray(samplesInBatch, 'specimenId')
    let specimensInBatch = specimens.filter((item)=>{return uniqSpecimensInBatch.includes(item.id)})
    
    let batchName = batchValue.label
    // // variables for the first page
    let reportTitle = "Batch Report"
    let projectName = projectInBatch[0].name
    let collaboratorName = projectInBatch[0].collaborator_name
    let dateStr = new Date().toLocaleDateString('en-US').toString()
    // // variables for the second page
    let projectDescription = projectInBatch[0].description
    let executiveSummary = " "
    // let seqMachine = aSeqRun[0].machine
    
    // console.log(seqRunList)
    // console.log(seqLibraryInRunList)


    const firstPageHeader = new Header({
                      children: [
                        new Paragraph({
                          children: [
                            new ImageRun({
                              data: Uint8Array.from(atob(report_header1), (c) =>
                                c.charCodeAt(0)
                              ),
                              transformation: {
                                width: 602,
                                height: 100,
                              },
                            }),
                          ],
                        }),

                      ],
                    })
    const pageHeader = new Header({
                        children: [
                          new Paragraph({
                            children: [
                              new ImageRun({
                                data: Uint8Array.from(atob(report_header2), (c) =>
                                  c.charCodeAt(0)
                                ),
                                transformation: {
                                  width: 600,
                                  height: 60,
                                },
                              }),
                            ],
                          }),
                        ],
                      })

    const firstPageFooter = new Footer({
                      children: [
                        new Paragraph({
                        text:"EPIGENOME TECHNOLOGIES INC.",
                        alignment: AlignmentType.RIGHT, 
                        }),
                        new Paragraph({
                        text:"WWW.EPIGENOME.US",
                        alignment: AlignmentType.RIGHT, 
                        })

                      ],
                    })
    const pageFooter = new Footer({
                        children: [
                          new Paragraph({
                            spacing: {
                                after: 100,
                            },
                            children: [
                              new ImageRun({
                                data: Uint8Array.from(atob(report_footer1), (c) =>
                                  c.charCodeAt(0)
                                ),
                                transformation: {
                                  width: 635,
                                  height: 15,
                                },
                              }),
                            ],
                          }),
                        ],
                      })

    const firstPageParagraphs = [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                      new TextRun({
                          text: reportTitle,
                          underline: {},
                          break: 5,
                          size: 40,
                          bold: true,

                      }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                      after: 6000,
                  },
                  alignment: AlignmentType.CENTER,
                  children: [
                      new TextRun({
                          text: "Batch Name: " + batchName,
                          // underline: {},
                          break: 1,
                          size: 35,
                      }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                      new TextRun({
                          text: "Project: "+ projectName,
                          break: 1,
                          size: 25,
                      }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                      new TextRun({
                          text: "Collaborator: "+ collaboratorName,
                          break: 1,
                          size: 25,
                      }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                      new TextRun({
                          text: "Date: " + dateStr,
                          break: 1,
                          size: 25,
                      }),
                  ],
                }),
              ]
    const secondPageParagraphs = [
      new Paragraph({
                  // spacing: {
                  //     after: 10000,
                  // },
                  alignment: AlignmentType.CENTER,
                  children: [
                      new TextRun({
                          text: batchName,
                          underline: {},
                          break: 1,
                          size: 40,
                      }),
                  ],
                }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
            new TextRun({
                text: "Project Description:",
                bold: true,
                break: 3,
                size: 25,
            }),
            new TextRun({
                text: "\t" + projectDescription,
                break: 2,
            }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
            new TextRun({
                text: "Executive Summary:",
                bold: true,
                break: 3,
                size: 25,
            }),
            new TextRun({
                text: "\t" + executiveSummary,
                break: 2,
            }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
              text: "Contents: ",
              bold: true,
              break: 3,
              size: 25,
          }),
          new TextRun({
              text: "\tSpecimen Information",
              break: 2,
          }),
          new TextRun({
              text: "\tSample Information",
              break: 2,
          }),
          new TextRun({
              text: "\tAssay Information",
              break: 2,
          }),
          new TextRun({
              text: "\tSequecing Libraries",
              break: 2,
          }),
          // new TextRun({
          //     text: "\tSequencing Information",
          //     break: 2,
          // }),
          // new TextRun({
          //     text: "\t\tSequencing Platform: "+ seqMachine,
          //     break: 2,
          // }),
          new TextRun({
              text: "\tSequencing Data Files",
              break: 2,
          }),
          // new TextRun({
          //     text: "\tLibrary & Assay & Seq Files",
          //     break: 2,
          // }),
          // new TextRun({
          //     text: "\tSupplementary Information",
          //     break: 2,
          // }),
        ],
      }),
    ]
    const specimenTableHeaders = [
      new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Specimen Name")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Tissue Type")],
          }),
            new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Species")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Received Date")],
          }),
        ],
      })
    ]
    const specimenTableRows = specimensInBatch.map(item => {
      return new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.name)],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.tissue)],
          }),
           new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.species)],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(moment(item.receipt_date).format("MM/DD/YYYY"))],
          }),
        ],
      })
    })

    const specimenPage = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{
          after: 500,
        },
        children: [
            new TextRun({
              text: "Specimen Information",
              underline: {},
              break: 2,
              size: 40,
              bold: true,
            }),
        ],
      }),
      new Table({ 
        rows: specimenTableHeaders.concat(specimenTableRows) 
      }),
    ]

    const sampleTableHeaders = [
      new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Sample Name")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Date Extracted")],
          }),
            new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Nuclei Count")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Specimen Name")],
          }),
        ],
      })
    ]
    
    const sampleTableRows = samplesInBatch.map(item => {
      return new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.name)],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(moment(item.extract_date || "N/A").format("MM/DD/YYYY"))],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.nuclei_count || "N/A")],
          }),
           new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.specimen_name || "N/A")],
          }),
          
        ],
      })
    })

    const samplePage = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{
          after: 500,
        },
        children: [
            new TextRun({
              text: "Sample Information",
              underline: {},
              break: 2,
              size: 40,
              bold: true,
            }),
        ],
      }),
      new Table({ 
        rows: sampleTableHeaders.concat(sampleTableRows) 
      }),
    ]

     const assayTableHeaders = [
      new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Assay #")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Sample Name")],
          }),
            new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("# of Nuclei")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Antibody")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("AB Conc.")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("AB Conc. Unit")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("AB Vol.")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("AB Vol. Unit")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Assay Date")],
          }),
        ],
      })
    ]

     const assayTableRows = assaysInBatch.map(item => {
      return new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.tubeNum.toString() || "N/A")],
          }),
          
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.sample_name || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.numOfNuclei || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.antibody_target || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.antibodyConcentration || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.antibodyConcUnit || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.antibodyVolume || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.antibodyVolUnit || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(moment(item.assayDate || "N/A").format("MM/DD/YYYY"))],
          }),
        ],
      })
    })

    const assayPage = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{
          after: 500,
        },
        children: [
            new TextRun({
              text: "Assay Information",
              underline: {},
              break: 2,
              size: 40,
              bold: true,
            }),
        ],
      }),
      new Table({ 
        rows: assayTableHeaders.concat(assayTableRows) 
      }),
    ]

    const libraryTableHeaders = [
      new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Seq Run Name")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Library Name")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Library Type")],
          }),
            new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("I7 Index(RC)")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("I5 Index(F)")],
          }),
        ],
      })
    ]

    const libraryTableRows = seqLibraryInRunList.map(item => {
      return new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.seqRun_name)],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.library_name || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.libType || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.i7Primer_rcSeq || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.i5Primer_fSeq || "N/A")],
          }),
        ],
      })
    })

    const libraryPage = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{
          after: 500,
        },
        children: [
            new TextRun({
              text: "Library Information",
              underline: {},
              break: 2,
              size: 40,
              bold: true,
            }),
        ],
      }),
      new Table({ 
        rows: libraryTableHeaders.concat(libraryTableRows) 
      }),
    ]

    const seqLibTableHeaders = [
      new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Seq Run Name")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Seq Library ID")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Library Name")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Library Type")],
          }),
            new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Fastq1")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Fastq2")],
          }),
        ],
      })
    ]

    const seqLibTableRows = seqLibraryInRunList.map(item => {
      return new TableRow({
        children:[
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.seqRun_name)],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.name)],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.library_name || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.libType || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.file1?.split("/").pop() || "N/A")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(item.file2?.split("/").pop() || "N/A")],
          }),
        ],
      })
    })

    const seqLibPage = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{
          after: 500,
        },
        children: [
            new TextRun({
              text: "Sequencing File Information",
              underline: {},
              break: 2,
              size: 40,
              bold: true,
            }),
        ],
      }),
      new Table({ 
        rows: seqLibTableHeaders.concat(seqLibTableRows) 
      }),
    ]

    // const associateTableHeaders = [
    //   new TableRow({
    //     children:[
    //       new TableCell({
    //         width: {
    //           size: 5505,
    //           type: WidthType.DXA,
    //         },
    //         children: [new Paragraph("Seq Library ID")],
    //       }),
    //       new TableCell({
    //         width: {
    //           size: 5505,
    //           type: WidthType.DXA,
    //         },
    //         children: [new Paragraph("Library Name")],
    //       }),
    //       new TableCell({
    //         width: {
    //           size: 5505,
    //           type: WidthType.DXA,
    //         },
    //         children: [new Paragraph("Library Type")],
    //       }),
    //       new TableCell({
    //         width: {
    //           size: 5505,
    //           type: WidthType.DXA,
    //         },
    //         children: [new Paragraph("Assay #")],
    //       }),
    //       new TableCell({
    //         width: {
    //           size: 5505,
    //           type: WidthType.DXA,
    //         },
    //         children: [new Paragraph("Assay Barcode")],
    //       }),
    //       new TableCell({
    //         width: {
    //           size: 5505,
    //           type: WidthType.DXA,
    //         },
    //         children: [new Paragraph("Fastq1")],
    //       }),
    //       new TableCell({
    //         width: {
    //           size: 5505,
    //           type: WidthType.DXA,
    //         },
    //         children: [new Paragraph("Fastq2")],
    //       }),
    //     ],
    //   })
    // ]

    // const associateTableRows = []
    
    // for (let i in seqLibraryInRunList){
    //   let x = seqLibraryInRunList[i];
    //   for( let j in assaysInBatch){
    //     let y = assaysInBatch[j];
    //     associateTableRows.push(
    //       new TableRow({
    //         children:[
    //           new TableCell({
    //             width: {
    //               size: 5505,
    //               type: WidthType.DXA,
    //             },
    //             children: [new Paragraph(x.name)],
    //           }),
    //           new TableCell({
    //             width: {
    //               size: 5505,
    //               type: WidthType.DXA,
    //             },
    //             children: [new Paragraph(x.library_name || "N/A")],
    //           }),
    //           new TableCell({
    //             width: {
    //               size: 5505,
    //               type: WidthType.DXA,
    //             },
    //             children: [new Paragraph(x.libType || "N/A")],
    //           }),
    //           new TableCell({
    //             width: {
    //               size: 5505,
    //               type: WidthType.DXA,
    //             },
    //             children: [new Paragraph(y.tubeNum.toString()  || "N/A")],
    //           }),
    //           new TableCell({
    //             width: {
    //               size: 5505,
    //               type: WidthType.DXA,
    //             },
    //             children: [new Paragraph(y.barcode || "N/A")],
    //           }),
    //           new TableCell({
    //             width: {
    //               size: 5505,
    //               type: WidthType.DXA,
    //             },
    //             children: [new Paragraph(x.file1?.split("/").pop() || "N/A")],
    //           }),
    //           new TableCell({
    //             width: {
    //               size: 5505,
    //               type: WidthType.DXA,
    //             },
    //             children: [new Paragraph(x.file2?.split("/").pop() || "N/A")],
    //           }),
    //         ],
    //       })
    //     )
    //   }
    // }

    //  const associatePage = [
    //   new Paragraph({
    //     alignment: AlignmentType.CENTER,
    //     spacing:{
    //       after: 500,
    //     },
    //     children: [
    //         new TextRun({
    //           text: "Library & Assay & Seq Files",
    //           underline: {},
    //           break: 2,
    //           size: 40,
    //           bold: true,
    //         }),
    //     ],
    //   }),
    //   new Table({ 
    //     rows: associateTableHeaders.concat(associateTableRows) 
    //   }),
    // ]
      


    const doc = new Document({
        creator: "Epigenome Technologies Inc.",
        title: "Report",
        sections: [
            {
              // headers: {
              //   default: firstPageHeader,
              // },
              // footers: {
              //   default: firstPageFooter,
              // },
              children: firstPageParagraphs,
            },
            {
              // headers: {
              //   default: pageHeader,
              // },
              // footers: {
              //   default: pageFooter,
              // },
              children: secondPageParagraphs,
            },
            {
              // headers: {
              //   default: pageHeader,
              // },
              // footers: {
              //   default: pageFooter,
              // },
              children: specimenPage,
            },
            {
              // headers: {
              //   default: pageHeader,
              // },
              // footers: {
              //   default: pageFooter,
              // },
              children: samplePage,
            },
            {
              // headers: {
              //   default: pageHeader,
              // },
              // footers: {
              //   default: pageFooter,
              // },
              children: assayPage,
            },
            {
              // headers: {
              //   default: pageHeader,
              // },
              // footers: {
              //   default: pageFooter,
              // },
              children: libraryPage,
            },
            {
              // headers: {
              //   default: pageHeader,
              // },
              // footers: {
              //   default: pageFooter,
              // },
              children: seqLibPage,
            },
            // {
            //   // headers: {
            //   //   default: pageHeader,
            //   // },
            //   // footers: {
            //   //   default: pageFooter,
            //   // },
            //   children: associatePage,
            // },
        ],
    });

    Packer.toBlob(doc).then((blob) => {
        // fs.writeFileSync("My Document.docx", buffer);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = batchValue.label + "_batch_report.docx";
        link.href = url;
        link.click();
    });
    

 
    dispatch({ type: 'CLOSE_BATCHREPORT' });
  };

  return (
    <Dialog open={openBatchReport} onClose={handleClose} PaperProps={{ sx: { width: "40%", height: "60%" } }}>
      <DialogTitle sx={{ textAlign: 'center', mt: 2.5, mb: 1 }}>
        Batch Report
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {/* <DialogContentText>
            Please fill a new sample's information in the fields below:
          </DialogContentText> */}

            <Autocomplete
              disablePortal
              id="seqRun_"
              options={batchOptions}
              value={batchValue}
              onChange={(e, newValue) => {
                setBatchValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Select a Batch Name" variant="standard" />}
              required
            />

           
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BatchReportForm;