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
  { id: "ev1", date: "3/28", title: "立て看イベント", description: "説明文", position: { top: "19.9%", left: "77.4%", width: "10.0%", height: "10.0%" } },
  { id: "ev2", date: "3/29", title: "役者体験会", description: "説明文", position: { top: "20.0%", left: "90.5%", width: "10.0%", height: "10.0%" } },
  { id: "ev3", date: "4/2~4/3", title: "紅萌祭", description: "説明文", shape: "capsule", position: { top: "35.6%", left: "58.1%", width: "31.5%", height: "11.4%" } },
  { id: "ev4", date: "4/4", title: "大規模上映会", description: "説明文", position: { top: "36.3%", left: "79.0%", width: "11.5%", height: "11.5%" } },
  { id: "ev5", date: "4/5", title: "衣装小道具イベント", description: "説明文", position: { top: "34.9%", left: "90.1%", width: "11.8%", height: "11.8%" } },
  { id: "ev6", date: "4/5", title: "役者体験会", description: "説明文", position: { top: "41.8%", left: "91.5%", width: "10.2%", height: "10.2%" } },
  { id: "ev7", date: "4/6", title: "宣伝美術イベント", description: "説明文", position: { top: "45.0%", left: "10.1%", width: "10.8%", height: "10.8%" } },
  { id: "ev8", date: "4/6", title: "舞台イベント", description: "説明文", position: { top: "51.1%", left: "9.7%", width: "11.4%", height: "11.4%" } },
  { id: "ev9", date: "4/7", title: "メイク実験見学", description: "説明文", position: { top: "47.0%", left: "22.8%", width: "10.6%", height: "10.6%" } },
  { id: "ev10", date: "4/8", title: "映像イベント", description: "説明文", position: { top: "47.0%", left: "34.7%", width: "10.6%", height: "10.6%" } },
  { id: "ev11", date: "4/9", title: "照明イベント", description: "説明文", position: { top: "47.0%", left: "46.0%", width: "10.6%", height: "10.6%" } },
  { id: "ev12", date: "4/11", title: "流しそうめんイベント", description: "説明文", position: { top: "48.4%", left: "77.4%", width: "12.8%", height: "12.8%" } },
  { id: "ev13", date: "4/12", title: "音響イベント", description: "説明文", position: { top: "48.4%", left: "90.3%", width: "10.8%", height: "10.8%" } },
  { id: "ev14", date: "4/13", title: "上映会", description: "説明文", position: { top: "65.5%", left: "9.7%", width: "10.8%", height: "10.8%" } },
  { id: "ev15", date: "4/14", title: "役者体験会", description: "説明文", position: { top: "65.5%", left: "23.0%", width: "10.8%", height: "10.8%" } },
  { id: "ev16", date: "4/16", title: "稽古場見学", description: "説明文", position: { top: "65.5%", left: "57.7%", width: "12.0%", height: "12.0%" } },
  { id: "ev17", date: "4/17", title: "上映会", description: "説明文", position: { top: "65.5%", left: "68.5%", width: "10.8%", height: "10.8%" } },
  { id: "ev18", date: "4/18", title: "役者体験会", description: "説明文", position: { top: "65.5%", left: "81.0%", width: "10.8%", height: "10.8%" } },
  { id: "ev19", date: "4/19", title: "1daylabソフト体験会", description: "説明文", position: { top: "65.5%", left: "91.5%", width: "11.4%", height: "11.4%" } },
  { id: "ev20", date: "4/21", title: "上映会", description: "説明文", position: { top: "78.1%", left: "22.8%", width: "10.8%", height: "10.8%" } },
  { id: "ev21", date: "4/23", title: "役者体験会", description: "説明文", position: { top: "79.4%", left: "57.7%", width: "10.8%", height: "10.8%" } },
  { id: "ev22", date: "4/25,26", title: "新歓公演", description: "説明文", shape: "capsule", position: { top: "75.7%", left: "79.4%", width: "25.8%", height: "6.4%" } },
  { id: "ev23", date: "4/25,26", title: "感想戦ラジオ", description: "説明文", shape: "capsule", position: { top: "80.8%", left: "79.0%", width: "28.8%", height: "8.8%" } },
  { id: "ev24", date: "4/27", title: "入団説明会", description: "説明文", position: { top: "90.2%", left: "9.5%", width: "11.6%", height: "11.6%" } },
  { id: "ev25", date: "4/28", title: "役者体験会", description: "説明文", position: { top: "91.1%", left: "35.1%", width: "10.8%", height: "10.8%" } },
  { id: "ev26", date: "4/30", title: "入団説明会", description: "説明文", position: { top: "90.9%", left: "46.6%", width: "11.6%", height: "11.6%" } },
  { id: "ev27", date: "5/9", title: "役者体験会", description: "説明文", position: { top: "95.7%", left: "78.6%", width: "10.8%", height: "10.8%" } },
  { id: "ev28", date: "5/10", title: "入団説明会", description: "説明文", position: { top: "94.8%", left: "90.7%", width: "16.0%", height: "16.0%" } },
];
