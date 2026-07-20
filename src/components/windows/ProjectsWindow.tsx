"use client";

import WindowFrame from "../windows/WindowFrame";

type ProjectsWindowProps = {
  onClose: () => void;
};

export default function ProjectsWindow({
  onClose,
}: ProjectsWindowProps) {
  return (
    <WindowFrame
      title="Project Database"
      subtitle="Portfolio archive // authorized access"
      onClose={onClose}
      footer="Database online // 04 project categories detected"
    >
      <p>Projects content goes here.</p>
    </WindowFrame>
  );
}