


import React from 'react'
import { useState } from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "../Home/Navbar"
import { useLocation } from 'react-router-dom';




function Prviewinvoice() {


  // const [invoiceData, setInvoiceData] = useState({
  //   invoiceNumber: "slafkalsf",
  //   date: "12/5/20225",
  //   customer: {
  //     name: "fsdfsdf",
  //     address: "fsdfsdf",
  //     mob: "sdfsdfsdf"
  //   },
  //   items: [
  //     { description: "sfsdfsd", quantity: 0, price: 0 },
  //     { description: "sfsdfs", quantity: 0, price: 0 },
  //     { description: "sdfsdfsd", quantity: 0, price: 0 },
  //   ],
  //   total: 0,
  // });

  // const data = [
  //   { item: "Ac service", price: 600, qty: 1, total: 600 },
  //   { item: "W/m service", price: 400, qty: 1, total: 400 },
  //   { item: "Ac Installation", price: 100, qty: 1, total: 1200 },
  //   { item: "Ac waterservice", price: 1200, qty: 1, total: 1200 },
  //   { item: "Ac waterleak", price: 600, qty: 1, total: 600 },
  // ];

  // const downloadPdf = async () => {
  //   const invoice = document.getElementById("invoice-pdf");

  //   // Temporarily make the PDF section visible
  //   invoice.style.position = "static";
  //   invoice.style.left = "0";
  //   invoice.style.opacity = "1";

  //   try {
  //     const canvas = await html2canvas(invoice);
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();

  //     const imgWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   } finally {
  //     // Re-hide the PDF section
  //     //   invoice.style.position = "absolute";
  //     //   invoice.style.left = "-9999px";
  //     //   invoice.style.opacity = "0";
  //   }
  // };

  const downloadPdf = async () => {
    const invoice = document.getElementById("invoice-pdf");
  
    // Temporarily make the PDF section visible
    invoice.style.position = "static";
    invoice.style.left = "0";
    invoice.style.opacity = "1";
  
    try {
      const canvas = await html2canvas(invoice, {
        scale: 2, // Reduce scale to keep quality but limit size (try 1.5 or 2)
        useCORS: true, // Ensures proper rendering of external images
        allowTaint: false,
      });
  
      const imgData = canvas.toDataURL("image/jpeg", 0.5); // JPEG instead of PNG & reduced quality to 50%
  
      const pdf = new jsPDF({
        orientation: "p", // Portrait mode
        unit: "mm",
        format: "a4", // Standard A4 size
        compress: true, // Enable compression
      });
  
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  
      pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Re-hide the PDF section
      invoice.style.position = "absolute";
      invoice.style.left = "-9999px";
      invoice.style.opacity = "0";
    }
  };
  
  const location = useLocation();
  console.log("props",location.state)

  const { invoiceData,
    discount,
    tottalAmount,
    subtotal}=location.state



  return (
    <div>
      <Navbar />

      <div className='  shadow-[0px_4px_10px_rgba(0,0,0,0.25)]'
        style={{

          width: "230mm",
          minHeight: "300mm",
          // padding: "20mm",
          backgroundColor: "white",
          color: "#000",
          fontFamily: "Arial, sans-serif",
          margin: "20px auto", // Center align
          display: "block",


        }} >



        <div
          id="invoice-pdf"
          className=''
          style={{

            width: "230mm",
            minHeight: "300mm",
            // padding: "20mm",
            backgroundColor: "white",
            color: "#000",
            fontFamily: "Arial, sans-serif",
            margin: "20px auto", // Center align
            display: "block",

          }}
        >


          <div className='w-full h-[150px] flex  ' >

            <div className='w-[50%] h-[100%] flex justify-start  pl-[30px]  pt-[40px]' >

              <img className='h-[80px]' src="./title.jpg" alt="title image" />
            </div>

            <div className='w-[50%] h-[100%] flex justify-end font-semibold pt-[40px] text-[17px] pr-[30px] text-[#1f709f] '  >

              <h1> Pattambi - Cherpulassery-Rd <br />
                near SNGS college <br />
                Mob:6282309320<br/>
               <span className='ml-[40px]' >9072032278</span>

              </h1>

            </div>

          </div>
          <div className='w-full  h-[3px] bg-[#1f709f]' ></div>

          <div className='w-full h-[150px]  flex justify-end items-center ' >

            <div className='mr-[150px] ' >

              <h1> Invoice No: <span className='font-semibold' >{invoiceData?.invoiceNumber}</span> </h1>
              <h1> Invoice Date: <span className='font-semibold' >{invoiceData?.date}</span> </h1>

            </div>

          </div>



          <div className='w-full h-[150px]    ' >

            <div className='ml-[40px]  ' >

              <h1> Customer Name: <span className='font-semibold' >{invoiceData?.customer?.name}</span></h1>
              <h1> Address: <span className='font-semibold' >{invoiceData?.customer?.address}</span> </h1>
              <h1> Mobile No: <span className='font-semibold' >{invoiceData?.customer?.mob}</span> </h1>

            </div>

          </div>




          <div className="w-full p-[40px]  ">
            <table className="w-full border-collapse  ">
              <thead>
                <tr className="bg-[#1f709f] text-white">
                  <th className="border-r border-[#1f709f] px-4 py-2 text-left">PARTICULARS</th>
                  <th className="border-r border-[#1f709f] px-4 py-2">PRICE</th>
                  <th className="border-r border-[#1f709f] px-4 py-2">QTY</th>
                  <th className=" px-4 py-2">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((row, index) => (
                  <tr key={index} className="">
                    <td className=" border-r border-[#1f709f]  px-4 py-4">{row?.description}</td>
                    <td className="border-r border-[#1f709f] px-4 py-4 text-center">{row?.price >0 ? row?.price:"" }</td>
                    <td className=" border-r border-[#1f709f] px-4 py-2 text-center">{row?.quantity>0 ? row.quantity : ""}</td>
                    <td className=" px-4 py-2 text-center">
                      
                    {row?.quantity * row?.price > 0 ? (row.quantity * row.price).toFixed(2) : ""}

                      </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#1f709f] text-white">
                  <td colSpan={3} className="border border-[#1f709f] px-4 py-2 text-right font-bold">
                    TOTAL
                  </td>
                  
                  <td className="border border-[#1f709f] px-4 py-2 text-center font-bold">{subtotal}</td>
                </tr>
                

                {
                  discount >0 ? <tr className="bg-[#1f709f] text-white">
                  <td colSpan={3} className="border border-[#1f709f] px-4 py-2 text-right font-bold">
                    DISCOUNT
                  </td>
                  
                  <td className="border border-[#1f709f] px-4 py-2 text-center font-bold">{discount}</td>
                </tr>
                :null
                }
                

                <tr className="bg-[#1f709f] text-white">
                  <td colSpan={3} className="border border-[#1f709f] px-4 py-2 text-right font-bold">
                   PAY AMOUNT
                  </td>
                  
                  <td className="border border-[#1f709f] px-4 py-2 text-center font-bold">{tottalAmount}</td>
                </tr>
                


               
              </tfoot>
            </table>
          </div>





        




        {/* <div className='w-full h-[150px]  flex justify-end   ' > */}

          <img  className='w-[200px] h-[230px] pb-[50px] absolute bottom-[-350px] right-[473px] ' src="./seal.png" alt="seal" />

        {/* </div> */}







        </div>








      </div>
















      <button onClick={downloadPdf}>Download Invoice as PDF</button>

    </div>


  )
}

export default Prviewinvoice