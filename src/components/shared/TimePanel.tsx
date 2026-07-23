"use client";

import { useEffect, useState } from "react";
import "./time-panel.css";

export default function TimeHud({
  className = "",
}: {
  className?: string;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );

      let timeoutId: number | undefined;

      const scheduleNextUpdate = () => {
        update();

        const now = new Date();
        const msUntilNextMinute =
          (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        timeoutId = window.setTimeout(scheduleNextUpdate, msUntilNextMinute);
      };

      scheduleNextUpdate();

      return () => {
        if (timeoutId !== undefined) {
          window.clearTimeout(timeoutId);
        }
      };
  }, []);

  return (
    <div className={`time-hud ${className}`}>
      {time}
    </div>
  );
}