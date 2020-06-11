const pa11y = require('pa11y')

class ReportService{

    async getReports(baseUrl, pages, configurations){
        var reports = []
        for(var i = 0 ; i < pages.length ; i++){
            var page = pages[i]
            var pageUrl = `${baseUrl}${page.path}`
            
            var pageReports = {
                page: page,
                reports: []
            }

            for(var c = 0 ; c < Object.keys(configurations).length ; c++){
                var configurationName = Object.keys(configurations)[c]
                var configuration = configurations[configurationName]

                var report = await pa11y(pageUrl, configuration)

                pageReports.reports.push({
                    config: configurationName,
                    report: report
                })

            }
            reports.push(pageReports)
        }

        return reports
    }
}

module.exports = ReportService

