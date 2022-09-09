export const PriorityLabel = (value: string | undefined) => {
  switch (value) {
    case "high":
      return "高";
    case "medium":
      return "中";
    case "low":
      return "低";
    default:
      return "";
  }
};
