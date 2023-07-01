interface Props {
  message: string;
  opacity: number;
}

export default function Toast({ message, opacity }: Props) {
  return (
    <div
      className="fixed top-5 shadow-sm bg-default-base border border-opacity-25 py-2 px-6 rounded-md global-transition"
      style={{ opacity: `${opacity}%` }}
    >
      {message}
    </div>
  );
}
