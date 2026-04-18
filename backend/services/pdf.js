const PDFDocument = require("pdfkit")
const fs = require("fs")

exports.generateNote = (order) => {
  const doc = new PDFDocument()

  const path = `./notes/${order._id}.pdf`

  doc.pipe(fs.createWriteStream(path))

  doc.fontSize(20).text("Starry Nights Logistics")
  doc.text("Tracking: " + order.trackingCode)

  doc.end()

  return path
}
