import {NavBar} from "src/components/app/index.js";
import {AppRoutes} from "src/routers/router.js";
import {BodyContents, WebLoading} from "shared/components/base";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {geoJsonPointsToArray} from "src/utils/utils-map.js";
import Worker from "src/utils/excelOilLossesWorker?worker";
import {toast} from "react-hot-toast";
import {computeDataSummary, fillGeojsonDataWithSummary} from "src/utils/excelOilLosses.js";
import TabRate from "./view/TabRate.jsx";
import TabTrend from "./view/TabTrend.jsx";
import TabSummary from "./view/TabSummary.jsx";
import {date_to_string} from "src/utils/MyUtils.js";

const OilLosses = ({}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [xlsxRowStart, setXlsxRowStart] = useState(1);
  const [xlsxRowEnd, setXlsxRowEnd] = useState(100000);
  const [xlsxColStart, setXlsxColStart] = useState(0);
  const [xlsxColEnd, setXlsxColEnd] = useState(6);
  const [selectedDay, setSelectedDay] = useState(new Date(2024, 10, 24));
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const geojsonFile = "/data/geojson_point_oses.geojson";
  const excelFile = "/data/DailyPlatform2024OilLosses.xlsx";
  const initData = async () => {
    // read excels file
    const fetchExcelFile = async () => {
      try {
        const response = await fetch(excelFile);
        const blob = await response.blob();
        onScanFile(blob);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    }

    fetchExcelFile().then(r => {
    });
  }

  const onScanFile = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // Initialize the worker
      const worker = new Worker();

      worker.postMessage({fileContent, xlsxRowStart, xlsxRowEnd, xlsxColStart, xlsxColEnd});

      // Handle messages from the worker
      worker.onmessage = async function (event) {
        const {status, data, error} = event.data;

        if (status) {
          const dataSummary = computeDataSummary(data.groups, 1, selectedDay);

          const geojson_ = await fetch(geojsonFile); // read geojson file
          let geoPoints = geoJsonPointsToArray(await geojson_.json());

          // add the summary data to geo points
          let selected = fillGeojsonDataWithSummary(geoPoints, dataSummary);

          setData(data); // Set the processed data
          setFilteredData(selected);
          setSelectedItem(Object.keys(data.groups)[0]);
        } else {
          toast.error(error);
          setData(null);
          setFilteredData(null);
          setSelectedItem(null);
        }

        worker.terminate(); // Clean up the worker
      };
    }
    reader.readAsBinaryString(file);
  }

  useEffect(() => {
    setLoading(true);
    initData().then(r => {
    });
    setLoading(false);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const onClickDetails = (name) => {
    setSelectedItem(name);
    setActiveTab(2);
  }

  return (
    <div className={"h-screen flex flex-col"}>
      <NavBar title={<div className={"text-lg"}><span className={"mr-2"}>{AppRoutes.oilLosses.name}</span><span
        className={"text-primary font-bold"}>{date_to_string(selectedDay, "dd/MM/yyyy")}</span></div>}/>
      {loading ? <WebLoading/> :
        <BodyContents>
          <div className={"flex flex-col flex-grow h-full w-full gap-2"}>
            <div className="tabs tabs-boxed bg-base-100">
              <a className={`tab tab-bordered ${activeTab === 0 ? 'tab-active font-bold' : ''}`} onClick={() => handleTabClick(0)}>
                Production
              </a>
              <a className={`tab tab-bordered ${activeTab === 1 ? 'tab-active font-bold' : ''}`} onClick={() => handleTabClick(1)}>
                Trend
              </a>
              <a className={`tab tab-bordered ${activeTab === 2 ? 'tab-active font-bold' : ''}`} onClick={() => handleTabClick(2)}>
                Details
              </a>
            </div>

            {(data && filteredData) &&
              <div className="bordered pt-1 flex-1">
                <div className={`flex flex-grow w-full h-full ${activeTab === 0 ? '' : 'hidden'}`}>
                  <TabRate values={filteredData} onClickDetails={onClickDetails}/>
                </div>
                <div className={`flex flex-grow w-full h-full ${activeTab === 1 ? '' : 'hidden'}`}>
                  <TabTrend values={filteredData} onClickDetails={onClickDetails}/>
                </div>
                <div className={`flex flex-grow w-full h-full ${activeTab === 2 ? '' : 'hidden'}`}>
                  <TabSummary values={data.groups} filterList={data.summary.keys} selectedItem={selectedItem}/>
                </div>
              </div>
            }
          </div>
        </BodyContents>
      }
    </div>
  )
}

export default OilLosses