import React, { useState, useRef, useEffect } from "react";
import SectionHeader from '@/components/SctionHeader/SectionHeader'
import { evaluate } from "mathjs";

export default function CalculatorPage() {
  const [expr, setExpr] = useState("");
  const inputRef = useRef(null);

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "(", ")",
    "+", "C", "←", "="
  ];

  function calculateExpression(expression) {
    try {
      const r = evaluate(expression || "0");
      return typeof r === "number" ? +r.toPrecision(12) : r;
    } catch {
      return expression;
    }
  }

  function press(key) {
    if (key === "C") {
      setExpr("");
      return;
    }
    if (key === "←") {
      setExpr(prev => prev.slice(0, -1));
      return;
    }
    if (key === "=") {
      setExpr(prev => String(calculateExpression(prev)));
      return;
    }

    setExpr(prev => prev + key);
    inputRef.current?.focus();
  }

  function onChange(e) {
    const value = e.target.value;
    setExpr(value);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setExpr(prev => String(calculateExpression(prev)));
    }
  }
useEffect(() => {
  inputRef.current?.focus();
}, []);
  return (
    <div className="max-w-2xl mx-auto p-4">
      <SectionHeader title="Calculator" />

      <div className=" gap-6">

        <div className=" bg-white/80 p-4 rounded-2xl shadow shadow-blue-600/30 ">
          <div className="space-y-4">

            {/* unified input (expression + result) */}
            <input
              ref={inputRef}
              className="w-full rounded-md p-3 text-2xl font-semibold outline-none border border-blue-600"
              value={expr}
              onChange={onChange}
              onKeyDown={onKeyDown}
              inputMode="decimal"
            />

            {/* buttons */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              {buttons.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => press(b)}
                  className={`px-3 py-4  rounded-lg text-lg font-medium shadow-sm border 
                    ${b === '=' ? 'col-span-4 bg-blue-600 text-white' : 'bg-slate-100'}
                  `}
                >
                  {b}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
