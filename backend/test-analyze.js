require('dotenv').config();
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
    try {
        const dummyPdf = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>\nendobj\n4 0 obj\n<< /Length 53 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000289 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n393\n%%EOF');
        
        console.log('1. pdfParse');
        const pdfData = await pdfParse(dummyPdf);
        console.log('Got text len:', pdfData.text.length);

        console.log('2. setup AI');
        const key = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : 'MISSING';
        if (key === 'MISSING') throw new Error('NO API KEY');
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        console.log('3. call AI');
        const result = await model.generateContent('Return exactly { "hello": "world" }');
        let aiResponse = result.response.text();
        console.log('Success AI Response:', aiResponse);
    } catch (e) {
        console.error('FAILED:', e.stack);
    }
}
run();
