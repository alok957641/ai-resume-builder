import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (
  element: HTMLElement,
  fileName: string = 'Resume'
): Promise<void> => {
  // A4 dimensions in px at 96dpi
  const A4_WIDTH_PX = 794;

  // Element ko A4 width pe set karo temporarily
  const originalWidth = element.style.width;
  element.style.width = `${A4_WIDTH_PX}px`;
  element.style.minHeight = 'auto';

  try {
    const canvas = await html2canvas(element, {
      scale: 3,                    // High quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
      onclone: (doc) => {
        // Fonts load hone ka wait karo
        const el = doc.getElementById('resume-preview');
        if (el) {
          el.style.width = `${A4_WIDTH_PX}px`;
          el.style.fontFamily = 'Arial, sans-serif';
        }
      },
    });

    // A4 size setup
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const imgWidth = A4_WIDTH_MM;
    const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;

    // Multiple pages support
    let heightLeft = imgHeight;
    let position = 0;
    let page = 1;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= A4_HEIGHT_MM;

    // Agar content zyada hai toh naya page add karo
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= A4_HEIGHT_MM;
      page++;
    }

    pdf.save(`${fileName}_Resume.pdf`);
  } finally {
    // Original width restore karo
    element.style.width = originalWidth;
  }
};