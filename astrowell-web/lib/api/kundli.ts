import { mockFetch } from "@/lib/mocks";
import {
  kundliReportMock,
  matchResultMock,
  type KundliReport,
  type MatchResult,
} from "@/lib/mocks/kundli.mock";
import { birthProfilesMock } from "@/lib/mocks/user.mock";
import type { BirthProfile } from "@/lib/mocks/user.mock";

/** Fetch the kundli report for a birth profile */
export async function getKundliReport(birthProfileId: string): Promise<KundliReport | null> {
  // In mock mode, always return the sample report
  if (birthProfileId === kundliReportMock.birthProfileId) {
    return mockFetch(kundliReportMock, 800); // extra latency to simulate calculation
  }
  return mockFetch(null, 800);
}

/** Fetch the match result for two birth profiles */
export async function getMatchResult(
  profileAId: string,
  profileBId: string
): Promise<MatchResult | null> {
  const match =
    (matchResultMock.birthProfileAId === profileAId &&
      matchResultMock.birthProfileBId === profileBId) ||
    (matchResultMock.birthProfileAId === profileBId &&
      matchResultMock.birthProfileBId === profileAId)
      ? matchResultMock
      : null;
  return mockFetch(match, 1200); // longer latency to simulate API processing
}

/** Fetch all saved birth profiles for current user */
export async function getBirthProfiles(): Promise<BirthProfile[]> {
  return mockFetch(birthProfilesMock);
}
