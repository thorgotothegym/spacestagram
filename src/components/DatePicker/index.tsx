import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

interface IRangeDate {
  clickHandler: (dateStrings: Array<string>) => void;
}

export const RangeDate = ({ clickHandler }: IRangeDate): JSX.Element => {
  const [dateCallBack, setDateCallBack] = useState<Array<string>>([""]);
  const dateFormat = "YYYY-MM-DD";
  const today = moment().format(dateFormat);

  return (
    <>
      <RangePicker
        defaultValue={[moment("2019-09-03", dateFormat), moment(today)]}
        disabled={[false, true]}
        onChange={(dates: any, dateStrings: Array<string>) => {
          setDateCallBack(dateStrings);
          clickHandler(dateStrings);
        }}
        format={dateFormat}
      />
    </>
  );
};
