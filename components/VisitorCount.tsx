"use client";

import { useEffect, useRef, useState } from "react";
import { onValue, ref, runTransaction } from "firebase/database";
import { database } from "@/lib/firebase";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  // Prevent React Strict Mode from counting the same mount twice.
  const hasIncremented = useRef(false);

  useEffect(() => {
    const visitorRef = ref(database, "totalVisitors");


    const unsubscribe = onValue(
      visitorRef,
      (snapshot) => {
        const value = snapshot.val();

        if (typeof value === "number") {
          setCount(value);
        }
      },
      (error) => {
        console.error(
          "Firebase visitor listener failed:",
          error
        );
      }
    );


    if (!hasIncremented.current) {
      hasIncremented.current = true;

      runTransaction(visitorRef, (currentValue) => {
        return (currentValue || 0) + 1;
      })
        .then((result) => {
          console.log(
            "Visitor count incremented:",
            result.snapshot.val()
          );
        })
        .catch((error) => {
          console.error(
            "Firebase visitor increment failed:",
            error
          );

          // Allow retry if the transaction actually failed.
          hasIncremented.current = false;
        });
    }


    return () => {
      unsubscribe();
    };
  }, []);

return (
  <span className="visitor-count">
    Visitor Count: {count === null ? "—" : count.toLocaleString()}
  </span>
);}