import styles from './section-logo-marquee.module.css';

const logos = [
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de37b47e42ee44f6678_Group_19_(1).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de3139e97f91c565ac7_Group_20_(4).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de3e35b72041072ec16_Group_24_(2).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de3d1a41148219cd98a_Group_21_(1).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de330a4967840213e61_Group_25_(1).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de3c41f70729ea66f9b_Group_22_(1).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de3cf18528b9f4e34e9_Group_23_(2).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de30d602f7eb878bb5a_Group_18_(1).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de3d098d38650edec97_Group_16_(1).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de3c41f70729ea6715e_Group_17_(1).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de354a7a3922514e5e8_Group_12_(2).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de3372a554adb3a6fb5_Group_14_(2).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de399c2e4a86b4649d2_Group_13_(1).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de4d098d38650edecaf_Group_11_(4).png',
  'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68557de84b7963e6f781e3bc_Group_15.png',
];

function LogoRow() {
  return (
    <div className={styles.row} aria-hidden="true">
      {logos.map((src) => (
        <div className={styles.logoItem} key={src}>
          <img src={src} alt="" className={styles.logo} />
        </div>
      ))}
    </div>
  );
}

export default function LogoMarqueeSection() {
  return (
    <section className={styles.section} aria-label="Client logos">
      <div className={styles.track}>
        <LogoRow />
        <LogoRow />
      </div>
    </section>
  );
}
