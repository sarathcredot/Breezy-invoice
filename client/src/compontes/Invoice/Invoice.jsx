

import React from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



function Invoice({invoiceData}) {


    const downloadPdf = async () => {
        const invoice = document.getElementById("invoice-pdf");
    
        // Temporarily make the PDF section visible for capturing
        invoice.style.position = "absolute";
        invoice.style.left = "-9999px";
        invoice.style.opacity = "1";
    
        const canvas = await html2canvas(invoice);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
    
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
    
        // Re-hide the PDF section
        invoice.style.position = "static";
        invoice.style.left = "0";
        invoice.style.opacity = "0";
      };
    


    return (
        <div>

            <div
                id="invoice-pdf"
                style={{
                    width: "210mm",
                    minHeight: "297mm",
                    padding: "20mm",
                    backgroundColor: "#fff",
                    color: "#000",
                    fontFamily: "Arial, sans-serif",
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                }}
            >
                <h1 style={{ textAlign: "center" }}>Invoice</h1>
                <p>
                    <strong>Invoice Number:</strong> {invoiceData.invoiceNumber}
                </p>
                <p>
                    <strong>Date:</strong> {invoiceData.date}
                </p>
                <h3>Customer Details:</h3>
                <p>
                    <strong>Name:</strong> {invoiceData.customer.name}
                </p>
                <p>
                    <strong>Address:</strong> {invoiceData.customer.address}
                </p>
                <h3>Items:</h3>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Description
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Quantity
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {item.description}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {item.quantity}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    ${item.price.toFixed(2)}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    ${(item.quantity * item.price).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Summary:</h3>
                <p>
                    <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
                </p>
                <p>
                    <strong>Tax (%):</strong> {invoiceData.tax}%
                </p>
                <h2>
                    <strong>Total:</strong> ${total.toFixed(2)}
                </h2>
            </div>



        </div>
    )
}

export default Invoice