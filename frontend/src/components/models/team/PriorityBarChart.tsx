import { useCallback, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { User } from "../../../types/userTypes";

type Props = {
  user: User;
  maxCount: number;
};

export const PriorityBarChart = (props: Props) => {
  const { user, maxCount } = props;
  const [animate, setAnimate] = useState(true);

  const onAnimationStart = useCallback(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 2000);
  }, []);

  const data = [
    {
      name: user.name,
      高: user.unfinished_tasks_priority_count[2],
      中: user.unfinished_tasks_priority_count[1],
      低: user.unfinished_tasks_priority_count[0],
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={70}>
      <BarChart barSize={16} layout="vertical" data={data}>
        <XAxis type="number" hide domain={[0, maxCount]} />
        <YAxis dataKey="name" type="category" hide />
        <Tooltip wrapperStyle={{ zIndex: 10, fontFamily: "roboto" }} />
        <Bar
          dataKey="高"
          stackId="a"
          fill="#ff5252"
          isAnimationActive={animate}
          onAnimationStart={onAnimationStart}
        >
          <LabelList
            dataKey="高"
            position="top"
            style={{ fontFamily: "roboto" }}
          />
        </Bar>
        <Bar
          dataKey="中"
          stackId="a"
          fill="#ffc107"
          isAnimationActive={animate}
          onAnimationStart={onAnimationStart}
        >
          <LabelList
            dataKey="中"
            position="top"
            style={{ fontFamily: "roboto" }}
          />
        </Bar>
        <Bar
          dataKey="低"
          stackId="a"
          fill="#00c853"
          isAnimationActive={animate}
          onAnimationStart={onAnimationStart}
        >
          <LabelList
            dataKey="低"
            position="top"
            style={{ fontFamily: "roboto" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
