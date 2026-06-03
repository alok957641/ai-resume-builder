import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportToPDF = async (element: HTMLElement, filename: string) => {
  try {
    if (!element) {
      throw new Error("Element not found");
    }
    
    // Save original styles
    const originalWidth = element.style.width;
    const originalOverflow = element.style.overflow;
    
    // Set temporary styles for better capture
    element.style.width = '800px';
    element.style.overflow = 'visible';
    
    // High quality capture
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 3,
      backgroundColor: '#ffffff',
      cacheBust: true,
      skipFonts: false,
      preferredFontFormat: 'woff2',
    });
    
    // Restore original styles
    element.style.width = originalWidth;
    element.style.overflow = originalOverflow;
    
    // Create PDF with better dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: false,
    });
    
    const imgWidth = 210;
    const img = new Image();
    img.src = dataUrl;
    
    await new Promise((resolve) => {
      img.onload = () => {
        const imgHeight = (img.height * imgWidth) / img.width;
        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
        pdf.save(`${filename}.pdf`);
        resolve(true);
      };
    });
    
    return true;
    
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
};