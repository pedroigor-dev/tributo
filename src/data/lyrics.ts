export type Side = "left" | "right";

export interface LyricLine {
  time: number; 
  text: string;
  side: Side;
}

const RAW: { time: number; text: string }[] = [
  { time: 9.67,   text: "Oh, why you look so sad?" },
  { time: 15.37,  text: "Tears are in your eyes" },
  { time: 19.04,  text: "Come on and come to me now" },
  { time: 23.40,  text: "Don't be ashamed to cry" },
  { time: 30.03,  text: "Let me see you through" },
  { time: 33.10,  text: "'Cause I've seen the dark side too" },
  { time: 37.73,  text: "When the night falls on you" },
  { time: 41.23,  text: "You don't know what to do" },
  { time: 44.44,  text: "Nothing you confess" },
  { time: 47.34,  text: "Could make me love you less" },
  { time: 51.01,  text: "I'll stand by you" },
  { time: 54.96,  text: "I'll stand by you" },
  { time: 58.38,  text: "Won't let nobody hurt you" },
  { time: 61.56,  text: "I'll stand by you" },
  { time: 66.79,  text: "So, if you're mad, get mad" },
  { time: 72.77,  text: "Don't hold it all inside" },
  { time: 75.85,  text: "Come on and talk to me now" },
  { time: 80.58,  text: "Hey, what you got to hide?" },
  { time: 87.14,  text: "I get angry too" },
  { time: 90.52,  text: "Well, I'm a lot like you" },
  { time: 94.92,  text: "When you're standing at the crossroads" },
  { time: 97.88,  text: "And don't know which path to choose" },
  { time: 101.67, text: "Let me come along" },
  { time: 104.94, text: "'Cause even if you're wrong" },
  { time: 108.16, text: "I'll stand by you" },
  { time: 111.65, text: "I'll stand by you" },
  { time: 115.44, text: "Won't let nobody hurt you" },
  { time: 118.80, text: "I'll stand by you" },
  { time: 122.56, text: "Take me in into your darkest hour" },
  { time: 126.11, text: "And I'll never desert you" },
  { time: 129.77, text: "I'll stand by you" },
  { time: 133.38, text: "" },
  { time: 147.13, text: "And when, when the night falls on you, baby" },
  { time: 152.98, text: "You feeling all alone" },
  { time: 156.71, text: "You won't be on your own" },
  { time: 159.94, text: "I'll stand by you" },
  { time: 164.32, text: "I'll stand by you" },
  { time: 167.41, text: "Won't let nobody hurt you" },
  { time: 171.46, text: "I'll stand by you" },
  { time: 174.96, text: "Take me in into your darkest hour" },
  { time: 178.85, text: "And I'll never desert you" },
  { time: 182.11, text: "I'll stand by you" },
  { time: 185.67, text: "I'll stand by you" },
  { time: 189.52, text: "Won't let nobody hurt you" },
  { time: 192.69, text: "I'll stand by you" },
  { time: 196.23, text: "" }, 
  { time: 200.23, text: "And I'll never desert you" },
  { time: 203.52, text: "I'll stand by you" },
  { time: 206.97, text: "I'll stand by you" },
  { time: 210.59, text: "Won't let nobody hurt you" },
  { time: 214.40, text: "I'll stand by you" },
  { time: 216.36, text: "" }, 
];

let sideIdx = 0;
export const LYRICS: LyricLine[] = RAW.map((line) => {
  if (!line.text) return { ...line, side: "left" };
  const side: Side = sideIdx % 2 === 0 ? "left" : "right";
  sideIdx++;
  return { ...line, side };
});
