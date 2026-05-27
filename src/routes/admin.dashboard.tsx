import { Link } from "react-router";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import { isConvexConfigured } from "@/cms/convex";
import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Dashboard · Admin · DirectiveFilms" }];
}

function fmtCount(n: number | undefined) {
  return n === undefined ? "—" : String(n);
}

function fmtRelative(ts: number | undefined) {
  if (!ts) return "";
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function AdminDashboard() {
  const pages = useQuery(isConvexConfigured ? api.cms.listPagesDraft : null as any, {});
  const projects = useQuery(isConvexConfigured ? api.cms.listProjectsDraft : null as any, {});
  const team = useQuery(isConvexConfigured ? api.cms.listTeamMembersDraft : null as any, {});
  const testimonials = useQuery(isConvexConfigured ? api.cms.listTestimonialsDraft : null as any, {});
  const positions = useQuery(isConvexConfigured ? api.cms.listOpenPositionsDraft : null as any, {});

  const bootstrap = useMutation(api.cms.seedCurrentSiteContent);

  const cmsInitialized = Array.isArray(pages) && pages.length > 0;
  const loading = pages === undefined;

  const stats = [
    {
      label: "Pages",
      value: pages?.length,
      sub: cmsInitialized ? "5 pages configured" : "Run bootstrap to seed",
      to: "/admin/pages",
    },
    {
      label: "Projects",
      value: projects?.length,
      sub: projects?.length ? `${projects.length} in the studio` : "Add your first project",
      to: "/admin/projects",
    },
    {
      label: "Team",
      value: team?.length,
      sub: team?.length ? `${team.length} members` : "Add team members",
      to: "/admin/team",
    },
    {
      label: "Testimonials",
      value: testimonials?.length,
      sub: testimonials?.length ? `${testimonials.length} quotes` : "Collect social proof",
      to: "/admin/testimonials",
    },
    {
      label: "Open Positions",
      value: positions?.length,
      sub: positions?.length ? `${positions.length} open` : "None open",
      to: "/admin/positions",
    },
  ];

  const allDocs = [
    ...(pages ?? []).map((d: any) => ({ kind: "page", label: d.slug, ts: d.updatedAt })),
    ...(projects ?? []).map((d: any) => ({ kind: "project", label: d.slug, ts: d.updatedAt })),
    ...(team ?? []).map((d: any) => ({ kind: "team member", label: d.slug, ts: d.updatedAt })),
    ...(testimonials ?? []).map((d: any) => ({ kind: "testimonial", label: d.slug, ts: d.updatedAt })),
  ]
    .filter((e) => e.ts)
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 6);

  async function handleBootstrap() {
    await bootstrap({});
  }

  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>Overview</div>
        <h1 className={styles.pageTitle}>Welcome back, Shami</h1>
        <p className={styles.pageSubtitle}>
          Everything your site shows the world, in one place.
        </p>
      </header>

      {isConvexConfigured && !loading && !cmsInitialized && (
        <div className={styles.banner}>
          <span className={styles.label}>Init</span>
          <span style={{ flex: 1 }}>
            CMS has no pages yet. Run bootstrap once to seed Home, About, Services, Contact, Careers, logos, and site settings from the current frontend content.
          </span>
          <button type="button" className={`${styles.actionBtn} ${styles.primary}`} onClick={handleBootstrap}>
            Initialize CMS
          </button>
        </div>
      )}

      <div className={styles.statGrid}>
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to} className={styles.statCard}>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue}>{fmtCount(stat.value)}</div>
            <div className={styles.statSub}>{stat.sub}</div>
          </Link>
        ))}
      </div>

      <div className={styles.sectionLabel}>Recent activity</div>
      {allDocs.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyTitle}>No activity yet</div>
          <div className={styles.emptyText}>
            Changes you publish will appear here so you can trace what shipped and when.
          </div>
        </div>
      ) : (
        <div className={styles.activityList}>
          {allDocs.map((entry, i) => (
            <div key={i} className={styles.activityRow}>
              <span className={styles.activityDot} aria-hidden="true" />
              <span className={styles.activityText}>
                <strong>{entry.label}</strong>{" "}
                <span className="muted">— {entry.kind} updated</span>
              </span>
              <span className={styles.activityTime}>{fmtRelative(entry.ts)}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.sectionLabel} style={{ marginTop: 40 }}>Quick actions</div>
      <div className={styles.actionRow}>
        <Link to="/admin/projects" className={`${styles.actionBtn} ${styles.primary}`}>+ New project</Link>
        <Link to="/admin/team" className={styles.actionBtn}>+ Add team member</Link>
        <Link to="/admin/testimonials" className={styles.actionBtn}>+ Add testimonial</Link>
        <Link to="/admin/positions" className={styles.actionBtn}>+ Open a position</Link>
      </div>
    </div>
  );
}
