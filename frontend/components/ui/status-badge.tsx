interface StatusBadgeProps {
  status: "online" | "offline";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  return (
    <div
      className={`absolute bottom-0 right-0 border-2 border-background rounded-full ${
        sizeMap[size]
      } ${status === "online" ? "bg-green-500" : "bg-gray-400"}`}
    />
  );
}
