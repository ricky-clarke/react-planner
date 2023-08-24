import Navigation from "@/app/_components/navigation/navigation.component"

export default function Page() {
  return (
    <main>
      <div className="container m-auto">
        <Navigation />
        <h1>Projects</h1>
        <br />
        <p><b>To display:</b></p>
          <ul>
            <li>List of projects</li>
          </ul>
      </div>
    </main>
  )
}