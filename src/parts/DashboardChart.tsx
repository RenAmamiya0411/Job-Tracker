"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  data: { label: string; value: number; color: string }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-elevated border border-navy-border rounded-xl px-3 py-2 text-xs">
        <p className="text-text-primary font-medium">{label}</p>
        <p className="text-text-secondary">{payload[0].value} applications</p>
      </div>
    );
  }
  return null;
};

export default function DashboardChart({ data }: Props) {
  return (
    <div className="bg-navy-surface border border-navy-border rounded-xl p-5 mt-6">
      <h2 className="text-sm font-medium text-text-primary mb-4">Application breakdown</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={32}>
          <XAxis dataKey="label" tick={{ fill: "#7a8a9e", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#7a8a9e", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1e2d40" }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
