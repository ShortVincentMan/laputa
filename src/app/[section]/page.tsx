import {
  notFound,
  redirect,
} from "next/navigation";

const sectionDestinations: Record<string, string> = {
  projects: "projects",
  cyberware: "cyberware",
  experience: "experience",
  about: "about",
  contact: "contact",
  credits: "credits",
  music: "music",
  journal: "journal",
  gallery: "gallery",
};

type SectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export default async function SectionPage({
  params,
}: SectionPageProps) {
  const { section } = await params;
  const destination = sectionDestinations[section];

  if (!destination) {
    notFound();
  }

  redirect(`/home#${destination}`);
}
