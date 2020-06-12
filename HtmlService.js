var slugify = require("slugify")

class HtmlService{
    getHtmlFromPageReports(reports){

        var html = `
        <html>
            <head>
                <title>Accessibility report</title>
                <style>
                        *{
                            margin: 0;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                        body{
                            width: 1200px;
                            margin: auto;

                        }

                        h1,h2,h3{
                            padding: 15px 0;
                            margin-top: 60px;
                        }

                        h1{
                            border-bottom: 3px solid lightgrey;
                        }

                        h2{
                            border-bottom: 1px solid lightgrey;
                        }

                        pre{
                            margin-top: 15px;
                            display: block;
                        }

                        code{
                            display: block;
                            background-color: #eeeeee;
                            padding: 3px;
                            font-family: monospace;
                            border: 1px solid darkgrey;
                        }
                </style>
            </head>
            <body>
        `

        html += `<h1>${reports.page.name}</h1>`
        
        for(var r = 0 ; r < reports.reports.length ; r++){
            html += `
            <h2>${reports.reports[r].config}</h2>
            <div><i>Issues: ${reports.reports[r].report.issues.length}</i></div>
            `

            for(var i = 0 ; i < reports.reports[r].report.issues.length ; i++){
                html += `<h3>${reports.reports[r].report.issues[i].message}</h3>`

                html += `<pre><code>${reports.reports[r].report.issues[i].selector}</code></pre>`
                html += `<pre><code>${reports.reports[r].report.issues[i].context.replace("<",  "&lt;")}</code></pre>`
            }
        }

        html += `</body>

        </html>`

        return html
    }

    getHomeHtmlFromReports(reports){
        var html =`
        <html>
            <head><title>Accessibility reports</title></head>
            <body>
                <h1>Pa11y generated accessibility reports</h1>
                <ul>
                    {{pageList}}
                </ul>
            </body>
        </html>
        `

        var pageList = ""
        for(var i = 0 ; i < reports.length ; i++){
            pageList += `<li><a href="${slugify(reports[i].page.name, {lower: true, strict:true})}.html">${reports[i].page.name}</a></li>`
        }

        html = html.replace("{{pageList}}", pageList)

        return html
    }
}

module.exports = HtmlService