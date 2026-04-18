export default function Home() {
  return (
    <div className="container">
      <video autoPlay loop muted playsInline className="video">
        <source src="/smoke.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <h1>Starry Nights</h1>
        <p>Luxury Shopping Experience</p>
        <a href="/shop">Enter Store</a>
      </div>
    </div>
  )
}
