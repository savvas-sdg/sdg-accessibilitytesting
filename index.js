const pa11y = require('pa11y');
const fs = require("fs")
const pages = require("./pages.json")
const configurations = require("./configurations.json")

async function getReport(){
    if(fs.existsSync(".output/report.md")) fs.unlinkSync(".output/report.md")

    var report = ""
    report = report.concat("# Accessibility report")
    report = report.concat("\n")

    for(var pageIndex = 0 ; pageIndex < pages.pages.length ; pageIndex++){
        var page = pages.pages[pageIndex]
        var result = await pa11y(`${pages.baseUrl}${page.path}`, configurations.mobile)
        report = report.concat(`## ${page.name}`)
        report = report.concat("\n")
        report = report.concat(`**${result.issues.length} issues**`)
        report = report.concat("\n")

        for(var issueIndex = 0 ; issueIndex < result.issues.length ; issueIndex++){
            var issue = result.issues[issueIndex]

            report = report.concat(`### ${issue.message}`);
            report = report.concat("\n")
            report = report.concat(`\`${issue.selector}\``);
            report = report.concat("\n")
            report = report.concat("```html");
            report = report.concat("\n")
            report = report.concat(issue.context)
            report = report.concat("\n")
            report = report.concat("```");
            report = report.concat("\n")
        }
    }
    fs.writeFileSync(".output/report.md", report)
}

getReport()