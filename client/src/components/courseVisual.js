import {
  IconAtom,
  IconBook,
  IconBraces,
  IconBrain,
  IconChart,
  IconCloud,
  IconCode,
  IconDatabase,
  IconLayers,
  IconPalette,
  IconServer,
  IconShield,
  IconSmartphone,
  IconTerminal,
} from "./Icons";

const TOPICS = [
  { match: /react|next\.?js|frontend|front-end/i, label: "React", Icon: IconAtom, tone: "cyan" },
  { match: /javascript|\bjs\b|typescript|\bts\b/i, label: "JavaScript", Icon: IconBraces, tone: "amber" },
  { match: /html|css|tailwind|sass|design|ui|ux/i, label: "Web Design", Icon: IconPalette, tone: "pink" },
  { match: /mern|full ?stack|node|express|api|backend|back-end/i, label: "Full Stack", Icon: IconServer, tone: "green" },
  { match: /mongo|\bsql\b|database|prisma/i, label: "Database", Icon: IconDatabase, tone: "green" },
  { match: /data structure|algorithm|\bdsa\b|leetcode|interview/i, label: "DSA", Icon: IconLayers, tone: "violet" },
  { match: /machine learning|\bml\b|\bai\b|deep learning|neural/i, label: "AI / ML", Icon: IconBrain, tone: "pink" },
  { match: /data (science|analy)|analytics|power ?bi|excel|pandas/i, label: "Data", Icon: IconChart, tone: "cyan" },
  { match: /android|ios|flutter|react native|mobile|app dev/i, label: "Mobile", Icon: IconSmartphone, tone: "violet" },
  { match: /devops|docker|kubernetes|aws|azure|cloud|deploy/i, label: "Cloud", Icon: IconCloud, tone: "blue" },
  { match: /security|cyber|hacking|penetration/i, label: "Security", Icon: IconShield, tone: "amber" },
  { match: /python|java\b|c\+\+|golang|rust|programming|coding/i, label: "Programming", Icon: IconCode, tone: "blue" },
  { match: /linux|bash|shell|git\b/i, label: "Tooling", Icon: IconTerminal, tone: "green" },
];

const FALLBACK = { label: "Course", Icon: IconBook, tone: "violet" };

export default function getCourseVisual(course) {
  const haystack = `${course?.title || ""} ${course?.description || ""}`;
  return TOPICS.find((topic) => topic.match.test(haystack)) || FALLBACK;
}
