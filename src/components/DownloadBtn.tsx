import { ArrowDownCircle } from "react-bootstrap-icons";
import * as XLSX from 'xlsx/xlsx.mjs';
interface DownloadBtnProps {
    data: string[]; 
    fileName: string;
   }




 export  const DownloadBtn = ({ data = [], fileName }: DownloadBtnProps) => {
    return (
      <button
      className="btn"
        onClick={() => {
          const datas = data?.length ? data : [];
          const worksheet = XLSX.utils.json_to_sheet(datas);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
          XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
        }}
      ><ArrowDownCircle/>
        Download
      </button>
    );
  };
  
  export default DownloadBtn;