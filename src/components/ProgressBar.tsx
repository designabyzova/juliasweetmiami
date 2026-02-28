"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const controls = useAnimation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        width: "100%",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      });
      await controls.start({
        opacity: 0,
        transition: { duration: 0.3, delay: 0.2 },
      });
      setVisible(false);
    };
    animate();
  }, [controls]);

  if (!visible) return null;

  return (
    <motion.div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Загрузка страницы"
      initial={{ width: "0%", opacity: 1 }}
      animate={controls}
      className="progress-bar"
    />
  );
}
