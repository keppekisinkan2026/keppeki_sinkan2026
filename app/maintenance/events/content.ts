import type { ReactNode } from "react";

export type WelcomeEvent = {
  id: string;
  date: string;
  title: string;
  description: ReactNode;
  shape?: "circle" | "capsule";
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
};

export const EVENT_CALENDAR_IMAGE = {
  src: "/images/calendar.JPG",
  width: 1034,
  height: 1582,
} as const;

export const welcomeEventFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

export const welcomeEvents: WelcomeEvent[] = [
  { id: "ev1", date: "3/28", title: "立て看イベント", description: "説明文", position: { top: "24.5%", left: "76.4%", width: "12.0%", height: "12.0%" } },
  { id: "ev2", date: "3/29", title: "役者体験会", description: "説明文", position: { top: "23.3%", left: "89%", width: "12.0%", height: "12.0%" } },
  { id: "ev3", date: "4/2~4/3", title: "紅萌祭", description: "説明文", shape: "capsule", position: { top: "35.6%", left: "56%", width: "26%", height: "8%" } },
  { id: "ev4", date: "4/4", title: "大規模上映会", description: "説明文", position: { top: "35.5%", left: "75%", width: "12.0%", height: "12.0%" } },
  { id: "ev5", date: "4/5", title: "衣装小道具イベント", description: "説明文", position: { top: "33.5%", left: "87%", width: "12.0%", height: "12.0%" } },
  { id: "ev6", date: "4/5", title: "役者体験会", description: "説明文", position: { top: "38%", left: "89.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev7", date: "4/6", title: "宣伝美術イベント", description: "説明文", position: { top: "44%", left: "14%", width: "12.0%", height: "12.0%" } },
  { id: "ev8", date: "4/6", title: "舞台イベント", description: "説明文", position: { top: "48%", left: "12%", width: "12.0%", height: "12.0%" } },
  { id: "ev9", date: "4/7", title: "メイク実験見学", description: "説明文", position: { top: "46.6%", left: "25%", width: "12.0%", height: "12.0%" } },
  { id: "ev10", date: "4/8", title: "映像イベント", description: "説明文", position: { top: "46.4%", left: "37.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev11", date: "4/9", title: "照明イベント", description: "説明文", position: { top: "47.0%", left: "51.0%", width: "12.0%", height: "12.0%" } },
  { id: "ev12", date: "4/11", title: "流しそうめんイベント", description: "説明文", position: { top: "46.7%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev13", date: "4/12", title: "音響イベント", description: "説明文", position: { top: "47%", left: "88%", width: "12.0%", height: "12.0%" } },
  { id: "ev14", date: "4/13", title: "上映会", description: "説明文", position: { top: "58.5%", left: "13%", width: "12.0%", height: "12.0%" } },
  { id: "ev15", date: "4/14", title: "役者体験会", description: "説明文", position: { top: "58%", left: "25%", width: "12.0%", height: "12.0%" } },
  { id: "ev16", date: "4/16", title: "稽古場見学", description: "説明文", position: { top: "58.8%", left: "50.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev17", date: "4/17", title: "上映会", description: "説明文", position: { top: "59%", left: "63%", width: "12.0%", height: "12.0%" } },
  { id: "ev18", date: "4/18", title: "役者体験会", description: "説明文", position: { top: "58.5%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev19", date: "4/19", title: "1daylabソフト体験会", description: "説明文", position: { top: "57.5%", left: "88%", width: "12.0%", height: "12.0%" } },
  { id: "ev20", date: "4/21", title: "上映会", description: "説明文", position: { top: "70%", left: "25.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev21", date: "4/23", title: "役者体験会", description: "説明文", position: { top: "69.5%", left: "50%", width: "12.0%", height: "12.0%" } },
  { id: "ev22", date: "4/25,26", title: "新歓公演", description: "説明文", shape: "capsule", position: { top: "67.5%", left: "79.9%", width: "24%", height: "4%" } },
  { id: "ev23", date: "4/25,26", title: "感想戦ラジオ", description: "説明文", shape: "capsule", position: { top: "71%", left: "81.0%", width: "24%", height: "5%" } },
  { id: "ev24", date: "4/27", title: "入団説明会", description: "説明文", position: { top: "81%", left: "13%", width: "12.0%", height: "12.0%" } },
  { id: "ev25", date: "4/28", title: "役者体験会", description: "説明文", position: { top: "81%", left: "38%", width: "12.0%", height: "12.0%" } },
  { id: "ev26", date: "4/30", title: "入団説明会", description: "説明文", position: { top: "81%", left: "51%", width: "12.0%", height: "12.0%" } },
  { id: "ev27", date: "5/9", title: "役者体験会", description: "説明文", position: { top: "92%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev28", date: "5/10", title: "入団説明会", description: "説明文", position: { top: "91%", left: "89.5%", width: "12.0%", height: "12.0%" } },
];
