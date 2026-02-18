export const STATUS = {
  IN_PROGRESS: "in-progress",
  ON_HOLD: "on-hold",
  COMPLETE: "complete",
};

export const statusStyles = {
  [STATUS.IN_PROGRESS]:
    "bg-blue-50 text-blue-700 border-blue-200",
  [STATUS.ON_HOLD]:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  [STATUS.COMPLETE]:
    "bg-green-50 text-green-700 border-green-200",
};