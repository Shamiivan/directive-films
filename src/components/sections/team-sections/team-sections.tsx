import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/shared/section-header/section-header";
import Reveal from "@/components/shared/reveal/reveal";
import styles from "./team-sections.module.css";

type Member = {
  name: string;
  role: string;
  image: string;
};

const teamBase = [
  { name: "Damon", image: "/team/ceo_no_bg.png" },
  { name: "Karine", image: "/team/coo.jpeg" },
  { name: "Gabriel", image: "/team/cmo_no_bg.png" },
  { name: "Odelin", image: "/team/odelin_chef_monteur.webp" },
];

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <Reveal className={styles.card} y={28} delay={index * 0.08}>
      <div className={styles.imageWrap}>
        <img
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
    </Reveal>
  );
}

export default function TeamSections({
  showHeader = true,
}: { showHeader?: boolean } = {}) {
  const { t } = useTranslation("about");
  const localizedMembers = t("teamSection.members", {
    returnObjects: true,
  }) as { role: string }[];

  const team: Member[] = teamBase.map((member, i) => ({
    ...member,
    role: localizedMembers[i]?.role ?? "",
  }));

  return (
    <section className={styles.section} id="team">
      {showHeader && (
        <div className={styles.intro}>
          <SectionHeader
            eyebrow={t("teamSection.eyebrow")}
            title={t("teamSection.title")}
            intro={t("teamSection.intro")}
            tone="dark"
          />
        </div>
      )}

      <div className={styles.grid}>
        {team.map((member, index) => (
          <MemberCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
