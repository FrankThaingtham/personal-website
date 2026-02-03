import PhotoShuffle from "@/components/PhotoShuffle";

export default function HomePage() {
  return (
    <>
      <h1 className="h1">Hi, I’m Frank.</h1>

      <p className="p">
        I’m learning and building things I genuinely find interesting. I love analytics, finance, technology, and software — but most of all, I love learning. I share what I’m building, what I’m learning, and what I’m thinking about along the way. If you want to connect, feel free to <a href="/contact">reach out</a>.
      </p>
      <PhotoShuffle />
      <section style={{ marginTop: 34 }}>
        <h2 className="h2">Start here</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: 18, marginTop: 0 }}>
          <li>
            <a href="/about">About</a> — my background + links
          </li>
          <li>
            <a href="/projects">Projects</a> — things I’ve built
          </li>
          <li>
            <a href="/research">Research</a> — valuations and notes (process-focused)
          </li>
          <li>
            <a href="/reading">Reading</a> — books + takeaways
          </li>
          <li>
            <a href="/blog">Blog</a> — longer writing
          </li>
        </ul>
      </section>
    </>
  );
}