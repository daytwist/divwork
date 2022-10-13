import Grid2 from "@mui/material/Unstable_Grid2";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { DeadlineTypography } from "./DeadlineTypography";
import { IsDoneTypography } from "./IsDoneTypography";
import { PriorityStack } from "./PriorityStack";
import { TaskContentTypography } from "./TaskContentTypography";
import { Task, ChildTask, ParentTask } from "../../../types/taskTypes";

type Props = {
  task: Task | ParentTask | ChildTask | undefined;
};

export const TaskCardContent = (props: Props) => {
  const { task } = props;

  return (
    <Grid2 container rowSpacing={2} pt={0} px={0} sx={{ pb: { xs: 0, sm: 2 } }}>
      {task?.description && (
        <Grid2 xs={12}>
          <TaskContentTypography subtitle="詳細" body={task?.description} />
        </Grid2>
      )}
      <Grid2 xs={12} sm={6}>
        <PriorityStack value={task?.priority} />
      </Grid2>
      <Grid2 xs={12} sm={6}>
        <DeadlineTypography deadline={task?.deadline} />
      </Grid2>
      <Grid2 xs={12} sm={6}>
        <IsDoneTypography isDone={task?.is_done} />
      </Grid2>
      <Grid2 xs={12} sm={6}>
        <TaskContentTypography
          subtitle="進捗率"
          body={`${task?.rate_of_progress}%`}
        />
      </Grid2>
      {task?.is_done && (
        <Grid2 xs={12} sm={6}>
          <TaskContentTypography
            subtitle="完了日"
            body={DatetimeFormat(task?.updated_at)}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
