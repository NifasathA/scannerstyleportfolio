"use client";

import type { WindowState } from "./InspectionWindow";
import { InspectionWindow } from "./InspectionWindow";

type Props = {
  windows: WindowState[];
  focusedId: string | null;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
};

export function WindowManager({ windows, focusedId, close, focus, minimize, move }: Props) {
  return <div className="window-layer">{windows.map(win => <InspectionWindow key={win.record.id} window={win} focused={win.record.id === focusedId} onClose={() => close(win.record.id)} onFocus={() => focus(win.record.id)} onMinimize={() => minimize(win.record.id)} onMove={(x, y) => move(win.record.id, x, y)}/>)}</div>;
}
