"use client";

export default function QuantityPicker({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="qtyRow">
      <button className="qtyBtn" type="button" onClick={dec} aria-label="Decrease">
        −
      </button>
      <div className="qtyValue">{value}</div>
      <button className="qtyBtn" type="button" onClick={inc} aria-label="Increase">
        +
      </button>
    </div>
  );
}