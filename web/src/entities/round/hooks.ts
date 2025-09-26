import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "../../shared/api/axios";
import { useEffect, useRef, useState } from "react";

export type Round = {
  id: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  status: "pending" | "active" | "finished";
  scores: { 
    user: { username: string };
    points: number 
  }[];
  winner: string | null;
};

export function useRounds() {
  return useQuery<Round[]>({
    queryKey: ["rounds"],
    queryFn: () => apiFetch<Round[]>("/rounds"),
    refetchInterval: 1000 * 60,    
  });
}

export function useRound(id: string) {
  return useQuery<Round>({
    queryKey: ["rounds", id],
    queryFn: () => apiFetch<Round>(`/rounds/${id}`),
  });
}

export function useCreateRound() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiFetch<Round>("/rounds", { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds"] });
    },
  });
}

type WsRoundData = {
  status: "pending" | "active" | "finished";
  secondsLeft: number;
  myPoints: number;
  totalPoints: number;
};

export function useRoundWS(roundId: string) {
  const [data, setData] = useState<WsRoundData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roundId) return;

    const ws = new WebSocket(`ws://localhost:3000/ws/round/${roundId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS connected to round", roundId);
    };

    ws.onmessage = (e) => {
      const payload: WsRoundData = JSON.parse(e.data);
      setData(payload);
    };

    ws.onclose = () => {
      console.log("❌ WS closed for round", roundId);
    };

    return () => {
      ws.close();
    };
  }, [roundId]);

  const sendTap = () => {
    wsRef.current?.send(JSON.stringify({ type: "tap" }));
  };

  return { data, sendTap };
}








