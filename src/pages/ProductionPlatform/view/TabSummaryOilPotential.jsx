import {memo, useEffect, useState} from "react";
import TableViewPotential from "./TableViewPotential.jsx";

import {COLORS_LIST} from "shared/config/config.js";
import {ChartLinesView, FilterView} from "src/components/app/index.js";
import {useTranslation} from "react-i18next";

const TabSummaryOilPotential = memo(({values, filterList, selectedItem, labelKey=""}) => {
  const {t} = useTranslation();
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    setSelectedData(values[selectedItem]);
  }, [selectedItem]);


  const filterOnChange = (v) => {
    setSelectedData(values[v]);
  }

  return (
    <div className={"flex flex-col flex-grow w-full h-full gap-3"}>
      {filterList && <FilterView values={filterList} onChange={filterOnChange}/>}
      <div className={"text-center text-2xl font-bold text-primary"}>{selectedData?.name}</div>

      {selectedData &&
        <div className={"flex flex-col gap-3"}>
          <ChartLinesView values={selectedData?.rows ?? []}
                          height={"450px"}
                          title={labelKey}
                          xLabel={"Date"} yLabel={labelKey} keyX="1"
                          color1={COLORS_LIST[0]} keyY1={"2"} label1={labelKey} cubicInterpolationMode1={""}
                          color2={COLORS_LIST[1]} keyY2={"10"} label2={t("label.sma7")} cubicInterpolationMode2={""}
                          color3={COLORS_LIST[2]} keyY3={"11"} label3={t("label.sma30")} cubicInterpolationMode3={""}/>
          <TableViewPotential values={selectedData?.rows} title={selectedData?.name} labelKey={labelKey}/>
        </div>
      }
    </div>
  );
})
export default TabSummaryOilPotential