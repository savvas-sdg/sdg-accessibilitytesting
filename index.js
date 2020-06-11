const ReportService = require("./ReportService")
const configurations = require("./configurations.json")
const pages = require("./pages.json")
const fs = require("fs")

var reportService = new ReportService()

console.log("Generating report...");

if (!fs.existsSync(".output")) {
    fs.mkdirSync(".output")
}
else {
    if (fs.existsSync(".output/report.json")){
        fs.unlinkSync(".output/report.json")
    }
}

reportService.getReports(pages.baseUrl, pages.pages, configurations)
    .then((r) => {
        console.log("Report completed! Results at .output/report.json");
        
        fs.writeFileSync(".output/report.json", JSON.stringify(r))
    })