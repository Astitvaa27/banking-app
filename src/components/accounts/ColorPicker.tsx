"use client";

const colors = [
  {
    name: "Ocean Blue",
    value: "from-blue-600 to-violet-700",
  },
  {
    name: "Emerald",
    value: "from-emerald-600 to-green-700",
  },
  {
    name: "Sunset",
    value: "from-orange-500 to-red-600",
  },
  {
    name: "Royal Purple",
    value: "from-fuchsia-600 to-purple-700",
  },
  {
    name: "Midnight",
    value: "from-slate-800 to-slate-950",
  },
  {
    name: "Rose",
    value: "from-pink-500 to-rose-600",
  },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">
        Card Theme
      </p>

      <div className="grid grid-cols-3 gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className={`h-16 rounded-2xl bg-gradient-to-br ${
              color.value
            } transition-all duration-300 hover:scale-105 ${
              value === color.value
                ? "ring-4 ring-primary"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}