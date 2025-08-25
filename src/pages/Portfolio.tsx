import { useEffect, useRef, useState } from "react";
import '../styles/portfolio.css';
import '../styles/portfolio-responsive.css';


type Props = { onLogout?: () => void };

export default function Portfolio({ onLogout }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [sticky, setSticky] = useState(false);

  // Dark mode: toggle class on <body> (uses your CSS variables)
  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    return () => document.body.classList.remove("dark-mode");
  }, [dark]);

  // Sticky header (use Y offset)
  useEffect(() => {
    const onScroll = () => {
      const top = navRef.current?.offsetTop ?? 0;
      setSticky(window.pageYOffset >= top);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="portfolio">
      <>
        {/* Floating Logout (optional) */}
        {onLogout && (
          <button className="logout-fab" onClick={onLogout} aria-label="Log out">
            Logout
          </button>
        )}

        <nav ref={navRef} className={sticky ? "sticky" : ""}>
          {/* light/dark mode container */}
          <div className="wrapper-color-switch">
            <input
              type="checkbox"
              id="input-color-switch"
              checked={dark}
              onChange={(e) => setDark(e.target.checked)}
            />
            <label htmlFor="input-color-switch" className="color-switch">
              <div className="color-switch-toggle"></div>
            </label>
          </div>

          <ul className={menuOpen ? "slide" : ""} onClick={() => setMenuOpen(false)}>
            <li><a href="#1">Hello</a></li>
            <li><a href="#2">Work Experiences</a></li>
            <li><a href="#3">Educations</a></li>
            <li><a href="#4">Contact</a></li>
          </ul>

          <div className="menu-toggle">
            <input
              type="checkbox"
              checked={menuOpen}
              onChange={(e) => setMenuOpen(e.target.checked)}
              aria-label="Toggle menu"
            />
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>

        <div className="intoprofil">
          <div className="container">
            <h2>Welcome to my site</h2>
            <img src="/img/logofullname.png" alt="Logo full name" />
            <a href="#1">About me?</a>
          </div>
        </div>

        <div id="1" className="profil">
          <div className="container">
            <div className="separate1">
              <h1>My Profile !</h1>
              <h3>My name is Givan Kusuma Libryano,</h3>
              <p>
                I graduated from Computer Engineering, Brawijaya University. I am a highly
                motivated, hardworking, responsible and organized person with good time
                management. I am able to work under pressures and willing to learn in the
                interest of gaining experience and knowledge. I capable to work as a team
                and easily adapt with new environment while possessing a good leadership
                and communication skill.
              </p>
            </div>

            <div className="separate2">
              <img src="/img/smash.png" alt="Smash" />
            </div>
          </div>
        </div>

        <div id="2" className="workexp">
          <div className="myexp">
            <h2>My Experiences</h2>
          </div>

          <div className="myexpwrap">
            <div className="internship">
              <h4>INTERNSHIP PROGRAM</h4>
              <p>IT Maintenance - IT Department</p>
              <p>PT Amman mineral Nusa Tenggara</p>
              <p>2018</p>
            </div>

            <div className="organization">
              <h4>ORGANIZATION</h4>
              <p>Unit Aktivitas Bulutangkis Universitas Brawijaya</p>
              <p>2017 Koordinator Dana Dan Usaha</p>
              <p>2016 Staff Kaderisasi</p>
              <p>2015 Staff Dana Dan Usaha</p>
            </div>

            <div className="committee">
              <h4>COMMITTEE</h4>
              <p>2019 STAFF</p>
              <p>Pekan Ilmiah, Olahraga, Seni dan Riset (PIONIR) IX</p>
              <p>2018 STAFF</p>
              <p>LIMA Badminton : McDonald's East Java Conference (Malang Subconference)</p>
              <p>2017 KOORDINATOR DIVISI PDD</p>
              <p>Invitasi Bulutangkis Mahasiswa 10</p>
              <p>2016 KOORDINATOR DIVISI PDD</p>
              <p>Brawijaya Badminton Challenge</p>
            </div>
          </div>
        </div>

        <div id="3" className="education">
          <div className="myedu">
            <h2>My Educations</h2>
          </div>

          <div className="container">
            <div className="primary">
              <h4>PRIMARY</h4>
              <p>SDN 02 Maluk</p>
              <p>2002 - 2008</p>
            </div>
            <div className="junior">
              <h4>JUNIOR HIGH</h4>
              <p>SMPN 1 Sumbawa Besar</p>
              <p>2008 - 2011</p>
            </div>
            <div className="senior">
              <h4>SENIOR HIGH</h4>
              <p>SMAN 1 Sumbawa Besar</p>
              <p>2011 - 2014</p>
            </div>
            <div className="graduate">
              <h4>GRADUATE</h4>
              <p>Computer Enginering</p>
              <p>University of Brawijaya</p>
              <p>2014 - 2021</p>
            </div>
          </div>
        </div>

        <div id="4" className="contactme">
          <div className="contactimg">
            <img src="/img/contactme.png" alt="Contact" />
          </div>

          <div className="contact">
            <h3 className="contact-title">Contact me</h3>

            <p>Name<span>*</span></p>
            <input aria-label="Name" />

            <p>Email<span>*</span></p>
            <input aria-label="Email" />

            <p>Message<span>*</span></p>
            <textarea aria-label="Message"></textarea>

            <p><span>*</span> Required fields must be filled</p>
            <input className="contact-submit" type="submit" value="Send" />
          </div>
        </div>

        <footer>
          <div className="footname">
            <h2>Givan Kusuma Libryano</h2>
            <h3>Copyright ©2021</h3>
          </div>
        </footer>
      </>
    </div>
  );
}
