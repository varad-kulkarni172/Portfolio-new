"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function GitHubActivity() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="github-wrap">
      <div className="github-calendar">
        {mounted ? (
          <GitHubCalendar
            username="varad-kulkarni172"
            colorScheme="dark"
            blockSize={11}
            blockMargin={11}
            fontSize={12}
          />
        ) : (
          <div style={{ minHeight: 180 }} />
        )}
      </div>
    </div>
  );
}