# Accessibility testing for SDG sites using Pa11y

## How to use

### 1. Setup

To setup `sdg-accessibility testing`, clone this repository and install all dependencies:

```bash
git clone https://github.com/savvas-sdg/sdg-accessibilitytesting.git
cd sdg-accessibilitytesting
yarn
```

### 2. Configure

The next step is to tell the script which site and pages you'd like to test and what Pa11y configurations you'd like to have.

For this you'll have to edit 2 files: `pages.json` and `configurations.json`:

#### pages.json

`pages.json` is where you add your site's URL and the path of the pages you'd like to test. It should look like this:

```json
{
    "baseUrl": "http://localhost/sdg-indicators",
    "pages": [
        {
            "name": "Home",
            "path": "/"
        },
        {
            "name": "Reporting status",
            "path": "/reporting-status"
        },
        {
            "name": "Publications",
            "path": "/publications"
        },
        {
            "name": "FAQ",
            "path": "/faq"
        }
    ]
}
```

#### configurations.json

This is the file where you'll add any configurations. For example, change to a mobile screen or set to high contrast mode before testing:

```json
{
    "desktop": {},
    
    "highContrast": {
        "actions": [
            "click element .navbar ul.navbar-nav li.contrast-high a"
        ],
        "chromeLaunchConfig": {
            "args": ["--no-sandbox"]
        } 
    },
    
    "mobile": {
        "viewport": {
            "width": 320,
            "height": 480
        }
    }
}
```

### 3. Run tests

To run all the tests, run `npm start` or `yarn start` at the root directory of the project. 

### 4. See reports
