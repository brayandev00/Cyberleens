import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { Scan } from './scanService';

const getSecurityRecommendations = (scan: Scan): string[] => {
  const recommendations: string[] = [];
  if (scan.results.sqlinjection?.vulnerable) {
    recommendations.push('CRITICAL: SQL Injection Detected');
    recommendations.push('• Use parameterized queries/prepared statements');
  }
  if (scan.results.xss?.vulnerable) {
    recommendations.push('CRITICAL: XSS Vulnerability Detected');
    recommendations.push('• Encode all user input before rendering');
  }
  return recommendations;
};

export const generatePdfReport = (scan: Scan, returnContent: boolean = false): string | void => {
  const doc = new jsPDF();
  doc.setFontSize(24);
  doc.text('CyberLeens Security Report', 14, 20);
  doc.setFontSize(12);
  doc.text(`Target: ${scan.target}`, 14, 30);
  doc.text(`Status: ${scan.status}`, 14, 40);
  
  if (returnContent) return doc.output('datauristring');
  doc.save(`report-${scan.target}-${Date.now()}.pdf`);
};

export const generateDocxReport = async (scan: Scan, returnContent: boolean = false): Promise<string | void> => {
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ text: 'CyberLeens Report', heading: HeadingLevel.TITLE }),
        new Paragraph({ text: `Target: ${scan.target}` }),
      ],
    }],
  });
  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  if (!returnContent) saveAs(blob, `report-${scan.target}.docx`);
};

export const generateMarkdownReport = (scan: Scan, returnContent: boolean = false): string | void => {
  let markdown = `# CyberLeens Report\n\nTarget: ${scan.target}\nStatus: ${scan.status}\n`;
  if (returnContent) return markdown;
  const blob = new Blob([markdown], { type: 'text/markdown' });
  saveAs(blob, `report-${scan.target}.md`);
};

export const generateCsvReport = (scan: Scan, returnContent: boolean = false): string | void => {
  let csv = `Target,Status\n${scan.target},${scan.status}\n`;
  if (returnContent) return csv;
  const blob = new Blob([csv], { type: 'text/csv' });
  saveAs(blob, `report-${scan.target}.csv`);
};
