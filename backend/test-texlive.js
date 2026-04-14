const axios = require('axios');
const FormData = require('form-data');

const code = `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}
\\section{Education}
    \\begin{tabularx}{\\textwidth}{X r}
      \\textbf{Southwestern University} & Georgetown, TX \\\\
      Bachelor of Arts in Computer Science, Minor in Business & Aug. 2018 -- May 2021 \\\\
    \\end{tabularx}
\\end{document}`;

async function test() {
    console.log("Starting test-texlive.js...");
    const form = new FormData();
    form.append('filecontents[]', code);
    form.append('filename[]', 'document.tex');
    form.append('engine', 'pdflatex');
    form.append('return', 'pdf');
    try {
        const response = await axios.post('https://texlive.net/cgi-bin/latexcgi', form, {
            headers: form.getHeaders(),
            responseType: 'arraybuffer'
        });
        const contentType = response.headers['content-type'];
        console.log("Content-Type:", contentType);
        if (contentType && (contentType.includes('text') || contentType.includes('html'))) {
            console.log("Error Log:", Buffer.from(response.data).toString('utf-8'));
        } else {
            console.log("Success, PDF size:", response.data.byteLength);
        }
    } catch (e) {
        console.error("AXIOS ERROR:", e.message);
    }
}
test();
