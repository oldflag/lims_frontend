import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useValue } from '../../context/ContextProvider';

const months = 5;
const today = new Date();
const tempData = [];
for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  );
  tempData.push({
    date,
    name: moment(date).format('MMM YYYY'),
    batchs: 0,
    commercial: 0,
    grant: 0,
    inhouse: 0,
    // batchs: 0,
  });
}

export default function BatchTrendChart() {
  const {
    state: { batchs },
  } = useValue();
  const [data, setData] = useState([]);

//   useEffect(() => {
//     for (let i = 0; i < months; i++) {
//       tempData[i].users = 0;
//     }
//     users.forEach((user) => {
//       for (let i = 0; i < months; i++) {
//         if (moment(tempData[i].date).isSame(user?.createdAt, 'month'))
//           return tempData[i].users++;
//       }
//     });
//     setData([...tempData]);
//   }, [users]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].batchs = 0;
      tempData[i].grant = 0;
      tempData[i].commercial = 0;
      tempData[i].inhouse = 0;
    }
    batchs.forEach((batch) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(batch?.createdAt, 'month'))
        {
          if (batch.type?.toLowerCase() === 'commercial') {
            return tempData[i].commercial++;
          }
          else if (batch.type?.toLowerCase() === 'grant') {
            return tempData[i].grant++;
          } 
          else{
            return tempData[i].inhouse++;
          }
        }  
      }
    });
    setData([...tempData]);
  }, [batchs]);
  return (
    <div style={{ width: '100%', height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="commercial" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="grant" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="inhouse" stackId="1" stroke="#ffc658" fill="#ffc658" />
          {/* <Area
            type="monotone"
            dataKey="batchs"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}