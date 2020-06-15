const ReportService = require("./ReportService")
const configurations = require("./configurations.json")
const pages = require("./pages.json")
const fs = require("fs")
const HtmlService = require("./HtmlService")
var slugify = require("slugify")

var reportService = new ReportService()
var htmlService = new HtmlService()

console.log("Generating report...");

if(!fs.existsSync(".output")){
    fs.mkdirSync(".output")
}

fs.readdirSync(".output")
    .forEach((file) => {
        fs.unlinkSync(`.output/${file}`)
    })

reportService.getReports(pages.baseUrl, pages.pages, configurations)
    .then((r) => {
        r.forEach((report) => {
            var page = htmlService.getHtmlFromPageReports(report)
            fs.writeFileSync(`.output/${slugify(report.page.name, {lower: true, strict:true})}.html`, page)
        })

        var homePage = htmlService.getHomeHtmlFromReports(r)
        fs.writeFileSync(`.output/index.html`, homePage)
    })