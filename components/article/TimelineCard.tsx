import { CalendarDays } from "lucide-react";

type TimelineEvent = {
  date: string;
  event: string;
};

type Props = {
  timeline: TimelineEvent[];
};

const TimelineCard = ({ timeline }: Props) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        <CalendarDays className="text-blue-600" size={20} />

        <h2 className="text-lg font-bold text-gray-900">
          Timeline
        </h2>
      </div>

      <div className="space-y-5">
        {timeline.map((item) => (
          <div
            key={item.date}
            className="border-l-2 border-blue-500 pl-4"
          >
            <p className="font-semibold text-blue-700">
              {item.date}
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              {item.event}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineCard;