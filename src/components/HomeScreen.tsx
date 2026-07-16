function HomeScreen() {
  return (
    <main className="home">
      <section className="homePanel">
        <h1 className="homeLogo">Vincent Le</h1>

        <nav className="homeMenu">
          <a className="active" href="/projects">Projects</a>
          <a href="/about">About</a>
          <a href="/resume">Resume</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="homeUser">
          <span>1.0</span>
          <strong>Portfolio OS</strong>
        </div>
      </section>

      <div className="homeRewards">My Projects</div>

      <div className="scratches" />
      <div className="grunge" />
      <div className="scanlines" />
      <div className="grain" />
    </main>
  );
}