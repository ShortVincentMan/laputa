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

    update();

    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={`time-hud ${className}`}>
      {time}
    </div>
  );
}