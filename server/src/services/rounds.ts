import { PrismaClient, type Round, type Score, type User } from "@prisma/client";

const prisma = new PrismaClient();

const ROUND_DURATION = Number(process.env.ROUND_DURATION || 60); // секунд
const COOLDOWN_DURATION = Number(process.env.COOLDOWN_DURATION || 30); // секунд

export async function createRound(): Promise<Round> {
  const now = new Date();
  const startAt = new Date(now.getTime() + COOLDOWN_DURATION * 1000);
  const endAt = new Date(startAt.getTime() + ROUND_DURATION * 1000);

  return prisma.round.create({
    data: { startAt, endAt },
  });
}

export type RoundWithScores = Round & {
    scores: (Score & { user: User })[];
    status: "pending" | "active" | "finished";
    winner: string | null;
  };


function enrichRound(round: Round & { scores: (Score & { user: User })[] }): RoundWithScores {
    const now = new Date();
  
    let status: "pending" | "active" | "finished";
    if (now < round.startAt) status = "pending";
    else if (now > round.endAt) status = "finished";
    else status = "active";
  
    let winner: string | null = null;
    if (status === "finished" && round.scores.length > 0) {
      winner = round.scores[0]?.user.username ?? null;
    }
  
    return { ...round, status, winner };
  }
  

export async function listRounds(): Promise<RoundWithScores[]> {
    const rounds = await prisma.round.findMany({
      include: {
        scores: {
          include: { user: true },
          orderBy: { points: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  
    return rounds.map(enrichRound);
  }


export async function getRound(id: string): Promise<RoundWithScores | null> {
  const round = await prisma.round.findUnique({
    where: { id },
    include: {
      scores: {
        include: { user: true },
        orderBy: { points: "desc" },
      },
    },
  });

  return round ? enrichRound(round) : null;
}


export async function tapRound(roundId: string, userId: string, role: string) {

  const round = await prisma.round.findUnique({ where: { id: roundId } });
  if (!round) throw new Error("Раунд не найден");

  const now = new Date();
  if (now < round.startAt || now > round.endAt) {
    return null; 
  }

  if (role === "admin") {
    return null;
  }

  // найти или создать запись Score
  let score = await prisma.score.findUnique({
    where: { roundId_userId: { roundId, userId } },
  });

  if (!score) {
    score = await prisma.score.create({
      data: { roundId, userId, taps: 0, points: 0 },
    });
  }

  if (role === "nikita") {
    return prisma.score.update({
      where: { roundId_userId: { roundId, userId } },
      data: { taps: { increment: 1 }, points: 0 },
    });
  }

  const newTaps = score.taps + 1;
  let pointsToAdd = 1;
  if (newTaps % 11 === 0) pointsToAdd = 10;

  return prisma.score.update({
    where: { roundId_userId: { roundId, userId } },
    data: {
      taps: { increment: 1 },
      points: { increment: pointsToAdd },
    },
  });
}
  
export function getRoundCountdown(round: RoundWithScores) {
  const now = new Date();

  if (now < round.startAt) {
    return {
      status: "pending" as const,
      secondsLeft: Math.floor((round.startAt.getTime() - now.getTime()) / 1000),
    };
  } else if (now >= round.startAt && now <= round.endAt) {
    return {
      status: "active" as const,
      secondsLeft: Math.floor((round.endAt.getTime() - now.getTime()) / 1000),
    };
  } else {
    return { status: "finished" as const, secondsLeft: 0 };
  }
}
